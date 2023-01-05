/* eslint-disable @typescript-eslint/no-explicit-any */
import { TransactionFactory } from '@ethereumjs/tx';
import { AbiCoder } from '@ethersproject/abi';
import { keccak256 } from '@ethersproject/keccak256';
import BigNumber from 'bignumber.js';
import EthQuery from '../eth-query';
import { Json, RawTransaction } from '../type';
import { stripHexPrefix } from '../utils';
import Interface from './interface';

export default class Contract {
  address: string;
  private inter: Interface;
  rpcUrl: string;
  provider: EthQuery;
  abiCoder: AbiCoder;

  constructor(address: string, abi: Json | Interface, provider: string | EthQuery) {
    this.address = address;
    if (abi as Json) this.inter = new Interface(abi as Json);
    else this.inter = abi as Interface;
    if (typeof provider === 'string') {
      this.rpcUrl = provider;
      this.provider = new EthQuery(provider);
    } else {
      this.rpcUrl = provider.rpcUrl;
      this.provider = provider;
    }
    this.abiCoder = new AbiCoder();
  }

  async viewFunction(functionName: string, params?: Array<any>, options?: Omit<RawTransaction, 'to' | 'data'>) {
    const _fragment = this.inter.getFunction(functionName);
    const _signature = this.inter.getSignature(functionName);
    if (!_signature) throw new Error(`Can not found ${functionName}`);
    if (!options) options = {};
    let result: string | null = null;
    if (params) {
      const inputTypes = _fragment?.inputs.map((item) => item.type);
      let data = _signature;
      if (inputTypes) {
        if (inputTypes.length !== params.length) throw new Error('Error params');
        const encodeParam = this.abiCoder.encode(inputTypes, params);
        data = `${_signature}${encodeParam.slice(2)}`;
      }
      result = await this.provider.call({ ...options, to: this.address, data } as RawTransaction);
    } else result = await this.provider.call({ ...options, to: this.address, data: _signature });
    const outputTypes = _fragment?.outputs.map((item) => item.type);
    let finalResult = null;
    if (outputTypes && result) finalResult = this.abiCoder.decode(outputTypes, result);
    if (finalResult) {
      if (finalResult.length === 1) finalResult = finalResult[0];
      if (finalResult?._hex) return BigNumber(finalResult._hex);
      else return finalResult;
    } else return null;
  }

  static signTransaction(privateKey: string, transactionData: any) {
    const _privateKey = stripHexPrefix(privateKey, 'remove');
    const ethTx = TransactionFactory.fromTxData(transactionData);
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
}
