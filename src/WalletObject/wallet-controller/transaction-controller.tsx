import EthQuery from 'src/blockchain-interaction/eth-query';
import BaseTransaction from 'src/blockchain-interaction/transaction-module/BaseTransaction';
import { OverviewTransaction } from 'src/blockchain-interaction/transaction-module/type';
import { MyWalletChain } from 'src/configs/wallet-network-config';

export default class TransactionController {
  currentNetwork: MyWalletChain;
  private ethQuery: EthQuery;
  private legacyTransaction?: BaseTransaction;

  constructor(currentNetwork: MyWalletChain) {
    this.currentNetwork = currentNetwork;
    this.ethQuery = new EthQuery(currentNetwork.provider.rpcUrl);
  }

  switchNetwork(currentNetwork: MyWalletChain) {
    this.currentNetwork = currentNetwork;
    this.ethQuery = new EthQuery(currentNetwork.provider.rpcUrl);
    this.legacyTransaction = undefined;
  }

  sign(privateKey: string, transaction: OverviewTransaction) {
    const legacyTransaction = BaseTransaction.fromData(this.ethQuery, transaction);
    if (!this.legacyTransaction) this.legacyTransaction = legacyTransaction;
    return legacyTransaction.sign(privateKey);
  }

  async send(rawTransaction: string) {
    if (!this.legacyTransaction) throw Error('Can not send undefined transaction');
    return await this.legacyTransaction.send(rawTransaction);
  }

  async signAndSend(privateKey: string, transaction: OverviewTransaction) {
    const legacyTransaction = BaseTransaction.fromData(this.ethQuery, transaction);
    if (!this.legacyTransaction) this.legacyTransaction = legacyTransaction;
    return await this.legacyTransaction.signAndSend(privateKey);
  }
}
