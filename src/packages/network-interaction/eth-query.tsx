/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonRpcEngine } from './json-rpc-engine';
import { BlockTag, EthBlock, JsonRpcRequest, OptionType, SimpleItem } from './type';
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

  private _createPayload(data: SimpleItem<any>) {
    const _counter = this.idCounter % this.max;
    this.idCounter = _counter + 1;
    return extend({ id: this.idCounter.toString(), jsonrpc: '2.0', params: [] }, data);
  }

  private async _sendAsync<Params = any>(data: JsonRpcRequest<Params>) {
    return await this.engine.handle(data);
  }

  async getBlockByHash(blockHash: string, hydratedTransaction: boolean) {
    const data = this._createPayload({
      method: 'eth_getBlockByHash',
      params: [blockHash, hydratedTransaction],
    }) as JsonRpcRequest<any>;
    const _block = await this._sendAsync(data);
    if (_block) return _block as unknown as EthBlock;
    else return null;
  }

  async getBlockByNumber(block: string | BlockTag = 'latest', hydratedTransaction = false) {
    const data = this._createPayload({
      method: 'eth_getBlockByNumber',
      params: [block, hydratedTransaction],
    }) as JsonRpcRequest<any>;
    const _block = await this._sendAsync(data);
    if (_block) return _block as unknown as EthBlock;
    else return null;
  }

  async getBlockTransactionCountByHash(blockHash: string) {
    const data = this._createPayload({
      method: 'eth_getBlockTransactionCountByHash',
      params: [blockHash],
    }) as JsonRpcRequest<any>;
    const _transactionCount = await this._sendAsync(data);
    return _transactionCount ? _transactionCount.toString() : null;
  }

  async getBlockTransactionCountByNumber(block: string | BlockTag = 'latest') {
    const data = this._createPayload({
      method: 'eth_getBlockTransactionCountByNumber',
      params: [block],
    }) as JsonRpcRequest<any>;
    const _transactionCount = await this._sendAsync(data);
    return _transactionCount ? _transactionCount.toString() : null;
  }

  async getUncleCountByBlockHash(blockHash: string) {
    const data = this._createPayload({
      method: 'eth_getUncleCountBlockHash',
      params: [blockHash],
    }) as JsonRpcRequest<any>;
    const _uncleCount = await this._sendAsync(data);
    return _uncleCount ? _uncleCount.toString() : null;
  }

  async getUncleCountByBlockNumber(block: string | BlockTag = 'latest') {
    const data = this._createPayload({
      method: 'eth_getUncleCountBlockNumber',
      params: [block],
    }) as JsonRpcRequest<any>;
    const _uncleCount = await this._sendAsync(data);
    return _uncleCount ? _uncleCount.toString() : null;
  }

  async chainId() {
    const _chainId = await this._sendAsync(
      this._createPayload({ method: 'eth_chainId', params: [] }) as JsonRpcRequest<any>
    );
    return _chainId ? _chainId.toString() : null;
  }

  async syncing() {
    const _syncing = await this._sendAsync(
      this._createPayload({ method: 'eth_syncing', params: [] }) as JsonRpcRequest<any>
    );
    return _syncing ? _syncing.toString() : null;
  }

  async coinbase() {
    const data = await this._sendAsync(
      this._createPayload({ method: 'eth_coinbase', params: [] }) as JsonRpcRequest<any>
    );
    return data ? data.toString() : null;
  }

  async accounts() {
    const data = await this._sendAsync(
      this._createPayload({ method: 'eth_accounts', params: [] }) as JsonRpcRequest<any>
    );
    return data ? (data as unknown as Array<string>) : null;
  }

  async blockNumber() {
    const data = await this._sendAsync(
      this._createPayload({ method: 'eth_blockNumber', params: [] }) as JsonRpcRequest<any>
    );
    return data ? data.toString() : null;
  }

  async getBalance(address: string, block: string | BlockTag = 'latest') {
    const _address = getAddress(address);
    if (!_address) throw new Error('EthQuery-invalid address');
    const data = this._createPayload({
      method: 'eth_getBalance',
      params: [_address, block.toString()],
    }) as JsonRpcRequest<any>;
    const balance = await this._sendAsync(data);
    return balance ? balance.toString() : null;
  }

  async getTransactionCount(address: string, block: string | BlockTag = 'latest') {
    const _address = getAddress(address);
    if (!_address) throw new Error('EthQuery-invalid address');
    const data = this._createPayload({
      method: 'eth_getTransactionCount',
      params: [_address, block],
    }) as JsonRpcRequest<any>;
    const transactionCount = await this._sendAsync(data);
    return transactionCount ? transactionCount.toString() : null;
  }
}
