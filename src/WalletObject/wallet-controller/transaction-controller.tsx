import { TransactionMetadata } from '../wallet';

export class TransactionController {
  getTransactions() {
    return {
      r: '0x',
      s: '0x',
      v: '0x',
      hash: '0x',
      txReceipt: null,
      txParams: {
        to: '0x',
        data: '',
        nonce: '0',
        gas: '0',
        from: '0x',
        value: null,
        gasPrice: '0',
        accessList: null,
        maxFeePerGas: '0',
        maxPriorityFeePerGas: '0',
      },
    } as TransactionMetadata;
  }

  async approveTransaction(transactionId: number, actionId: string) {
    const rawTx = await this.signTransaction(transactionId);
    await this.publishTransaction(transactionId, rawTx, actionId);
  }

  async signTransaction(transactionId: number) {
    return '123';
  }

  async publishTransaction(transactionId: number, rawTx: string, actionId: string) {
    ///
  }
}
