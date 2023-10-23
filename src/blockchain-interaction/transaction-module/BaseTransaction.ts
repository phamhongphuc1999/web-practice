import { TransactionFactory } from '@ethereumjs/tx';
import { keccak256 } from '@ethersproject/keccak256';
import { EthQuery } from '@peter-present/eth-query';
import { stripHexPrefix } from '../utils';
import { OverviewTransaction, TransactionSignReturn } from './type';

export default class BaseTransaction {
  private transaction: OverviewTransaction;
  private ethQuery: EthQuery;

  constructor(provider: string | EthQuery, transaction: OverviewTransaction) {
    if (typeof provider === 'string') this.ethQuery = new EthQuery(provider);
    else this.ethQuery = provider;
    this.transaction = transaction;
  }

  static fromData(provider: string | EthQuery, transaction: OverviewTransaction) {
    return new BaseTransaction(provider, transaction);
  }

  sign(privateKey: string): TransactionSignReturn {
    const _privateKey = stripHexPrefix(privateKey, 'remove');
    const ethTx = TransactionFactory.fromTxData(this.transaction);
    const signedTx = ethTx.sign(Buffer.from(_privateKey, 'hex'));
    const validationErrors = signedTx.validate(true);
    if (validationErrors.length > 0) {
      let errorString = 'Signer Error: ';
      for (const validationError of validationErrors) {
        errorString += `${errorString} ${validationError}.`;
      }
      throw new Error(errorString);
    }
    const rlpEncoded = signedTx.serialize().toString('hex');
    const rawTransaction = '0x' + rlpEncoded;
    const transactionHash = keccak256(rawTransaction);
    return {
      messageHash: '0x' + Buffer.from(signedTx.getMessageToSign(true)).toString('hex'),
      v: signedTx.v ? '0x' + signedTx.v.toString(16) : null,
      r: signedTx.r ? '0x' + signedTx.r.toString(16) : null,
      s: signedTx.s ? '0x' + signedTx.s.toString(16) : null,
      rawTransaction: rawTransaction,
      transactionHash: transactionHash,
    };
  }

  async send(rawTransaction: string) {
    const transactionHash = await this.ethQuery.sendRawTransaction(rawTransaction);
    return transactionHash;
  }

  async signAndSend(privateKey: string) {
    const signedTransaction = this.sign(privateKey);
    return await this.send(signedTransaction.rawTransaction);
  }
}
