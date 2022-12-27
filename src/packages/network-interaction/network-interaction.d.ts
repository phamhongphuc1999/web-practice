export type SimpleItem<T> = { [key: string]: T };
export type BlockTag = 'earliest' | 'finalized' | 'safe' | 'latest' | 'pending';

export type OptionType = { max: number; start: number };
export type JsonRpcId = string | number | null;
export type JsonRpcVersion2 = '2.0';
export declare type JsonRpcError = {
  code: number;
  message: string;
  data?: unknown;
  stack?: string;
};

export type JsonRpcRequest<Param> = {
  id: JsonRpcId;
  jsonrpc: JsonRpcVersion2;
  method: string;
  params?: Param;
};

export type JsonRpcSuccess<Result> = {
  id: JsonRpcId;
  jsonrpc: JsonRpcVersion2;
  result: Result;
};

export type JsonRpcFailure = {
  id: JsonRpcId;
  jsonrpc: JsonRpcVersion2;
  error: JsonRpcError;
};

export type JsonRpcResponse<Result = unknown> = JsonRpcSuccess<Result> | JsonRpcFailure;

export type EthTransaction = {
  blockHash: string;
  blockNumber: string;
  from: string;
  gas: string;
  gasPrice: string;
  hash: string;
  input: string;
  nonce: string;
  r: string;
  s: string;
  to: string;
  transactionIndex: string;
  type: string;
  v: string;
  value: string;
};

export type EthBlock = {
  difficulty: string;
  extraData: string;
  gasLimit: string;
  gasUsed: string;
  hash: string;
  logsBloom: string;
  miner: string;
  mixHash: string;
  nonce: string;
  number: string;
  parentHash: string;
  receiptsRoot: string;
  sha3Uncles: string;
  size: string;
  stateRoot: string;
  timestamp: string;
  totalDifficulty: string;
  transactions: Array<EthTransaction>;
  transactionsRoot: string;
  uncles: Array<string>;
};
