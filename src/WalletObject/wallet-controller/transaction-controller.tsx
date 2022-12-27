/* eslint-disable @typescript-eslint/no-unused-vars */

export class TransactionController {
  getTransactions() {
    //
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
