/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonRpcEngine } from './json-rpc-engine';
import {
  BlockTag,
  EthBlock,
  JsonRpcRequest,
  OptionType,
  RequestRpcMiddleware,
  ResponseRpcMiddleware,
  SimpleItem,
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
    const _syncing = await this._sendAsync<any, string>(
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

  async getBalance(address: string, block: string | BlockTag = 'latest') {
    const _address = getAddress(address);
    if (!_address) throw new Error('EthQuery-invalid address');
    const data = this._createPayload({
      method: 'eth_getBalance',
      params: [_address, block.toString()],
    }) as JsonRpcRequest<any>;
    const balance = await this._sendAsync<any, string>(data);
    return balance;
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
}
