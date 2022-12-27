/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonRpcEngine } from './json-rpc-engine';
import { BlockTag, EthBlock, JsonRpcRequest, OptionType, SimpleItem } from './network-interaction';
import { extend } from './utils';

export class EthQuery {
  rpcUrl: string;
  private engine: JsonRpcEngine;
  private idCounter: number;
  private max: number;

  constructor(rpcUrl: string, options?: OptionType) {
    this.rpcUrl = rpcUrl;
    this.engine = new JsonRpcEngine(rpcUrl);
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

  async getBalance(address: string, block: string | BlockTag = 'latest') {
    const data = this._createPayload({
      method: 'eth_getBalance',
      params: [address, block.toString()],
    }) as JsonRpcRequest<any>;
    return await this._sendAsync(data);
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

  async getTransactionCount(address: string, block: string | BlockTag = 'latest') {
    const data = this._createPayload({
      method: 'eth_getTransactionCount',
      params: [address, block],
    }) as JsonRpcRequest<any>;
    return await this._sendAsync(data);
  }
}
