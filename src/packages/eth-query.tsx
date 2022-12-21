/* eslint-disable @typescript-eslint/no-explicit-any */
import { SafeEventEmitterProvider } from 'eth-json-rpc-middleware';
import { JsonRpcRequest, JsonRpcFailure, JsonRpcSuccess } from 'json-rpc-engine';
import { SimpleItem } from 'src/global';
import { extend } from 'src/services';

type OptionType = { max: number; start: number };

export class EthQuery {
  currentProvider: SafeEventEmitterProvider;
  private idCounter: number;
  private max: number;

  constructor(provider: SafeEventEmitterProvider, options?: OptionType) {
    this.currentProvider = provider;

    const _options = options || { max: undefined, start: undefined };
    this.max = _options.max || Number.MAX_SAFE_INTEGER;
    this.idCounter = _options.start !== undefined ? _options.start : Math.floor(Math.random() * this.max);
  }

  private _createPayload(data: SimpleItem<any>) {
    const _counter = this.idCounter % this.max;
    this.idCounter = _counter + 1;
    return extend({ id: this.idCounter.toString(), jsonrpc: '2.0', params: [] }, data);
  }

  private _sendAsync(options: SimpleItem<any>, cb: any) {
    const _request = this._createPayload(options) as JsonRpcRequest<any>;
    this.currentProvider.sendAsync(_request, function (err, response) {
      if (!err) {
        const _response = response as JsonRpcFailure;
        if (_response.error) err = new Error('EthQuery - RPC Error - ' + _response.error.message);
      }
      if (err) return cb(err);
      cb(null, (response as JsonRpcSuccess<any>).result);
    });
  }

  private _generateFnFor(methodName: string, ...args: any) {
    const _args = [].slice.call(args);
    const cb = args.pop();
    this._sendAsync({ method: methodName, params: _args }, cb);
  }

  private _generateFnWithDefaultBlockFor(argCount: number, methodName: string, ...args: any) {
    const _args = [].slice.call(args);
    const cb = args.pop();
    if (args.length < argCount) args.push('latest');
    this._sendAsync({ method: methodName, params: args }, cb);
  }

  getBalance = this._generateFnWithDefaultBlockFor(2, 'eth_getBalance');
  getCode = this._generateFnWithDefaultBlockFor(2, 'eth_getCode');
  getTransactionCount = this._generateFnWithDefaultBlockFor(2, 'eth_getTransactionCount');
  getStorageAt = this._generateFnWithDefaultBlockFor(2, 'eth_getStorageAt');
  call = this._generateFnWithDefaultBlockFor(2, 'eth_call');

  protocolVersion = this._generateFnFor('eth_protocolVersion');
  syncing = this._generateFnFor('eth_syncing');
  coinbase = this._generateFnFor('eth_coinbase');
  mining = this._generateFnFor('eth_mining');
  hashrate = this._generateFnFor('eth_hashrate');
  gasPrice = this._generateFnFor('eth_gasPrice');
  accounts = this._generateFnFor('eth_accounts');
  blockNumber = this._generateFnFor('eth_blockNumber');
  getBlockTransactionCountByHash = this._generateFnFor('eth_getBlockTransactionCountByHash');
  getBlockTransactionCountByNumber = this._generateFnFor('eth_getBlockTransactionCountByNumber');
  getUncleCountByBlockHash = this._generateFnFor('eth_getUncleCountByBlockHash');
  getUncleCountByBlockNumber = this._generateFnFor('eth_getUncleCountByBlockNumber');
  sign = this._generateFnFor('eth_sign');
  sendTransaction = this._generateFnFor('eth_sendTransaction');
  sendRawTransaction = this._generateFnFor('eth_sendRawTransaction');
  estimateGas = this._generateFnFor('eth_estimateGas');
  getBlockByHash = this._generateFnFor('eth_getBlockByHash');
  getBlockByNumber = this._generateFnFor('eth_getBlockByNumber');
  getTransactionByHash = this._generateFnFor('eth_getTransactionByHash');
  getTransactionByBlockHashAndIndex = this._generateFnFor('eth_getTransactionByBlockHashAndIndex');
  getTransactionByBlockNumberAndIndex = this._generateFnFor('eth_getTransactionByBlockNumberAndIndex');
  getTransactionReceipt = this._generateFnFor('eth_getTransactionReceipt');
  getUncleByBlockHashAndIndex = this._generateFnFor('eth_getUncleByBlockHashAndIndex');
  getUncleByBlockNumberAndIndex = this._generateFnFor('eth_getUncleByBlockNumberAndIndex');
  getCompilers = this._generateFnFor('eth_getCompilers');
  compileLLL = this._generateFnFor('eth_compileLLL');
  compileSolidity = this._generateFnFor('eth_compileSolidity');
  compileSerpent = this._generateFnFor('eth_compileSerpent');
  newFilter = this._generateFnFor('eth_newFilter');
  newBlockFilter = this._generateFnFor('eth_newBlockFilter');
  newPendingTransactionFilter = this._generateFnFor('eth_newPendingTransactionFilter');
  uninstallFilter = this._generateFnFor('eth_uninstallFilter');
  getFilterChanges = this._generateFnFor('eth_getFilterChanges');
  getFilterLogs = this._generateFnFor('eth_getFilterLogs');
  getLogs = this._generateFnFor('eth_getLogs');
  getWork = this._generateFnFor('eth_getWork');
  submitWork = this._generateFnFor('eth_submitWork');
  submitHashrate = this._generateFnFor('eth_submitHashrate');
}
