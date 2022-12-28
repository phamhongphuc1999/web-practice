/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonRpcEngine } from './json-rpc-engine';
import {
  AccountProofType,
  BlockTag,
  EthBlock,
  EthTransaction,
  FeeHistoryResult,
  Filter,
  JsonRpcRequest,
  LogType,
  OptionType,
  RequestRpcMiddleware,
  ResponseRpcMiddleware,
  SimpleItem,
  SyncingType,
  TransactionReceipt,
} from './type';
import { extend, getAddress } from './utils';

export class EthQuery {
  rpcUrl: string;
  private engine: JsonRpcEngine;
  private idCounter: number;
  private max: number;

  constructor(rpcUrl: string, options?: OptionType) {
    this.rpcUrl = rpcUrl;
    try {
      this.engine = new JsonRpcEngine(rpcUrl);
    } catch (_) {
      throw new Error('Invalid RPC');
    }
    const _options = options || { max: undefined, start: undefined };
    this.max = _options.max || Number.MAX_SAFE_INTEGER;
    this.idCounter = _options.start !== undefined ? _options.start : Math.floor(Math.random() * this.max);
  }

  addRequestMiddleware<Params>(middleware: RequestRpcMiddleware<Params>) {
    this.engine.addRequestMiddleware(middleware);
  }

  addResponseMiddleware<Params, Result>(middleware: ResponseRpcMiddleware<Params, Result>) {
    this.engine.addResponseMiddleware(middleware);
  }

  private _createPayload(data: SimpleItem<any>) {
    const _counter = this.idCounter % this.max;
    this.idCounter = _counter + 1;
    return extend({ id: this.idCounter.toString(), jsonrpc: '2.0', params: [] }, data);
  }

  private async _sendAsync<Params, Result = unknown>(data: JsonRpcRequest<Params>) {
    return await this.engine.handle<Params, Result>(data);
  }

  async getBlockByHash(blockHash: string, hydratedTransaction: boolean) {
    const data = this._createPayload({
      method: 'eth_getBlockByHash',
      params: [blockHash, hydratedTransaction],
    }) as JsonRpcRequest<any>;
    const _block = await this._sendAsync<any, EthBlock>(data);
    return _block;
  }

  async getBlockByNumber(block: string | BlockTag = 'latest', hydratedTransaction = false) {
    const data = this._createPayload({
      method: 'eth_getBlockByNumber',
      params: [block, hydratedTransaction],
    }) as JsonRpcRequest<any>;
    const _block = await this._sendAsync<any, EthBlock>(data);
    return _block;
  }

  async getBlockTransactionCountByHash(blockHash: string) {
    const data = this._createPayload({
      method: 'eth_getBlockTransactionCountByHash',
      params: [blockHash],
    }) as JsonRpcRequest<any>;
    const _transactionCount = await this._sendAsync<any, string>(data);
    return _transactionCount;
  }

  async getBlockTransactionCountByNumber(block: string | BlockTag = 'latest') {
    const data = this._createPayload({
      method: 'eth_getBlockTransactionCountByNumber',
      params: [block],
    }) as JsonRpcRequest<any>;
    const _transactionCount = await this._sendAsync<any, string>(data);
    return _transactionCount;
  }

  async getUncleCountByBlockHash(blockHash: string) {
    const data = this._createPayload({
      method: 'eth_getUncleCountBlockHash',
      params: [blockHash],
    }) as JsonRpcRequest<any>;
    const _uncleCount = await this._sendAsync<any, string>(data);
    return _uncleCount;
  }

  async getUncleCountByBlockNumber(block: string | BlockTag = 'latest') {
    const data = this._createPayload({
      method: 'eth_getUncleCountBlockNumber',
      params: [block],
    }) as JsonRpcRequest<any>;
    const _uncleCount = await this._sendAsync<any, string>(data);
    return _uncleCount;
  }

  async chainId() {
    const _chainId = await this._sendAsync<any, string>(
      this._createPayload({ method: 'eth_chainId', params: [] }) as JsonRpcRequest<any>
    );
    return _chainId;
  }

  async syncing() {
    const _syncing = await this._sendAsync<any, SyncingType>(
      this._createPayload({ method: 'eth_syncing', params: [] }) as JsonRpcRequest<any>
    );
    return _syncing;
  }

  async coinbase() {
    const data = await this._sendAsync<any, string>(
      this._createPayload({ method: 'eth_coinbase', params: [] }) as JsonRpcRequest<any>
    );
    return data;
  }

  async accounts() {
    const data = await this._sendAsync<any, Array<string>>(
      this._createPayload({ method: 'eth_accounts', params: [] }) as JsonRpcRequest<any>
    );
    return data;
  }

  async blockNumber() {
    const data = await this._sendAsync<any, string>(
      this._createPayload({ method: 'eth_blockNumber', params: [] }) as JsonRpcRequest<any>
    );
    return data;
  }

  async gasPrice() {
    const data = await this._sendAsync<any, string>(
      this._createPayload({ method: 'eth_gasPrice', params: [] }) as JsonRpcRequest<any>
    );
    return data;
  }

  async maxPriorityFeePerGas() {
    const data = await this._sendAsync<any, string>(
      this._createPayload({ method: 'eth_maxPriorityFeePerGas', params: [] }) as JsonRpcRequest<any>
    );
    return data;
  }

  async feeHistory(blockCount: string, rewardPercentiles: Array<number>, newestBlock: string | BlockTag = 'latest') {
    const data = this._createPayload({
      method: 'eth_feeHistory',
      params: [blockCount, newestBlock, rewardPercentiles],
    }) as JsonRpcRequest<any>;
    const result = await this._sendAsync<any, FeeHistoryResult>(data);
    return result;
  }

  async newFilter(filter: Filter) {
    const data = this._createPayload({ method: 'eth_newFilter', params: [filter] }) as JsonRpcRequest<any>;
    const result = await this._sendAsync<any, string>(data);
    return result;
  }

  async newBlockFilter() {
    const data = await this._sendAsync<any, string>(
      this._createPayload({ method: 'eth_newBlockFilter', params: [] }) as JsonRpcRequest<any>
    );
    return data;
  }

  async newPendingTransactionFilter() {
    const data = await this._sendAsync<any, string>(
      this._createPayload({ method: 'eth_newPendingTransactionFilter', params: [] }) as JsonRpcRequest<any>
    );
    return data;
  }

  async newUninstallFilter(filterIdentifier: string) {
    const data = await this._sendAsync<any, boolean>(
      this._createPayload({ method: 'eth_newUninstallFilter', params: [filterIdentifier] }) as JsonRpcRequest<any>
    );
    return data;
  }

  async getFilterChanges(filterIdentifier: string) {
    const data = await this._sendAsync<any, Array<string> | Array<LogType>>(
      this._createPayload({ method: 'eth_getFilterChanges', params: [filterIdentifier] }) as JsonRpcRequest<any>
    );
    return data;
  }

  async getFilterLogs(filterIdentifier: string) {
    const data = await this._sendAsync<any, Array<string> | Array<LogType>>(
      this._createPayload({ method: 'eth_getFilterLogs', params: [filterIdentifier] }) as JsonRpcRequest<any>
    );
    return data;
  }

  async getLogs(filter: Filter) {
    const data = await this._sendAsync<any, Array<string> | Array<LogType>>(
      this._createPayload({ method: 'eth_getLogs', params: [filter] }) as JsonRpcRequest<any>
    );
    return data;
  }

  async mining() {
    const data = await this._sendAsync<any, boolean>(
      this._createPayload({ method: 'eth_mining', params: [] }) as JsonRpcRequest<any>
    );
    return data;
  }

  async hashrate() {
    const data = await this._sendAsync<any, boolean>(
      this._createPayload({ method: 'eth_hashrate', params: [] }) as JsonRpcRequest<any>
    );
    return data;
  }

  async getWork() {
    const data = await this._sendAsync<any, Array<string>>(
      this._createPayload({ method: 'eth_getWork', params: [] }) as JsonRpcRequest<any>
    );
    return data;
  }

  async submitWork(nonce: string, hash: string, digest: string) {
    const data = await this._sendAsync<any, boolean>(
      this._createPayload({ method: 'eth_submitWork', params: [nonce, hash, digest] }) as JsonRpcRequest<any>
    );
    return data;
  }

  async submitHashrate(hashrate: string, ID: string) {
    const data = await this._sendAsync<any, boolean>(
      this._createPayload({ method: 'eth_submitHashrate', params: [hashrate, ID] }) as JsonRpcRequest<any>
    );
    return data;
  }

  async sign(address: string, message: string) {
    const _address = getAddress(address);
    if (!_address) throw new Error('EthQuery-invalid address');
    const data = this._createPayload({
      method: 'eth_sign',
      params: [_address, message],
    }) as JsonRpcRequest<any>;
    const result = await this._sendAsync<any, string>(data);
    return result;
  }

  async getBalance(address: string, block: string | BlockTag = 'latest') {
    const _address = getAddress(address);
    if (!_address) throw new Error('EthQuery-invalid address');
    const data = this._createPayload({ method: 'eth_getBalance', params: [_address, block] }) as JsonRpcRequest<any>;
    const balance = await this._sendAsync<any, string>(data);
    return balance;
  }

  async getStorageAt(address: string, storageSlot: string, block: string | BlockTag = 'latest') {
    const _address = getAddress(address);
    if (!_address) throw new Error('EthQuery-invalid address');
    const data = this._createPayload({
      method: 'eth_getStorageAt',
      params: [_address, storageSlot, block],
    }) as JsonRpcRequest<any>;
    const result = this._sendAsync<any, string>(data);
    return result;
  }

  async getTransactionCount(address: string, block: string | BlockTag = 'latest') {
    const _address = getAddress(address);
    if (!_address) throw new Error('EthQuery-invalid address');
    const data = this._createPayload({
      method: 'eth_getTransactionCount',
      params: [_address, block],
    }) as JsonRpcRequest<any>;
    const transactionCount = await this._sendAsync<any, string>(data);
    return transactionCount;
  }

  async getCode(address: string, block: string | BlockTag = 'latest') {
    const _address = getAddress(address);
    if (!_address) throw new Error('EthQuery-invalid address');
    const data = this._sendAsync<any, string>(
      this._createPayload({ method: 'eth_getCode', params: [_address, block] }) as JsonRpcRequest<any>
    );
    return data;
  }

  async getProof(address: string, storageKeys: Array<string>, block: string | BlockTag = 'latest') {
    const _address = getAddress(address);
    if (!_address) throw new Error('EthQuery-invalid address');
    const data = this._sendAsync<any, AccountProofType>(
      this._createPayload({ method: 'eth_getProof', params: [_address, storageKeys, block] }) as JsonRpcRequest<any>
    );
    return data;
  }

  async getTransactionByHash(transactionHash: string) {
    const data = this._createPayload({
      method: 'eth_getTransactionByHash',
      params: [transactionHash],
    }) as JsonRpcRequest<any>;
    const result = await this._sendAsync<any, EthTransaction>(data);
    return result;
  }

  async getTransactionReceipt(transactionHash: string) {
    const data = await this._sendAsync<any, TransactionReceipt>(
      this._createPayload({ method: 'eth_getTransactionReceipt', params: [transactionHash] }) as JsonRpcRequest<any>
    );
    return data;
  }

  async getRawTransaction(transactionHash: string) {
    const data = await this._sendAsync<any, string>(
      this._createPayload({ method: 'eth_getRawTransaction', params: [transactionHash] }) as JsonRpcRequest<any>
    );
    return data;
  }
}
