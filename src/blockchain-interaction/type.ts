export const TRANSACTION_ENVELOPE_TYPES = {
  LEGACY: '0x0',
  ACCESS_LIST: '0x1',
  FEE_MARKET: '0x2',
};

export const NETWORK_TYPES = {
  GOERLI: 'goerli',
  LOCALHOST: 'localhost',
  MAINNET: 'mainnet',
  RPC: 'rpc',
  SEPOLIA: 'sepolia',
};

export type SimpleItem<T> = { [key: string]: T };

export type PlainObject = Record<number | string | symbol, unknown>;
export type RuntimeObject = Record<number | string | symbol, unknown>;

export type Json = null | boolean | number | string | Json[] | { [prop: string]: Json };

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

export type JsonRpcRequest<Params> = {
  id: JsonRpcId;
  jsonrpc: JsonRpcVersion2;
  method: string;
  params?: Params;
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

export type RequestRpcMiddlewareReturn<Params> = {
  request: JsonRpcRequest<Params>;
  error?: JsonRpcError;
};

export type RequestRpcMiddleware<Params> = (request: JsonRpcRequest<Params>) => RequestRpcMiddlewareReturn<Params>;

export type ResponseRpcMiddlewareReturn<Params, Result> = {
  request: JsonRpcRequest<Params>;
  response: JsonRpcResponse<Result>;
};

export type ResponseRpcMiddleware<Params, Result> = (
  request: JsonRpcRequest<Params>,
  response: JsonRpcResponse<Result>
) => ResponseRpcMiddlewareReturn<Params, Result>;

export type SyncingObject = {
  startingBlock: string;
  currentBlock: string;
  highestBlock: string;
};

export type SyncingType = SyncingObject | boolean;

export type LogType = {
  removed?: boolean;
  logIndex?: string;
  transactionIndex?: string;
  transactionHash: string;
  blockHash?: string;
  blockNumber?: string;
  address?: string;
  data?: string;
  topics?: Array<string>;
};

export type RawTransaction = {
  type?: string;
  nonce?: string;
  to?: string;
  from?: string;
  gas?: string;
  value?: string;
  data?: string;
  gasPrice?: string;
  maxPriorityFeePerGas?: string;
  maxFeePerGas?: string;
  accessList?: Array<{ address: string; storageKeys: Array<string> }>;
  chainId?: string;
};

export type EthTransaction = {
  hash: string;
  type: string;
  nonce: string;
  from?: string;
  to?: string;
  gas: string;
  value: string;
  maxPriorityFeePerGas?: string;
  maxFeePerGas?: string;
  gasPrice?: string;
  accessList?: Array<{ address: string; storageKeys: Array<string> }>;
  chainId: string;
  yParity: string;
  v?: string;
  r: string;
  s: string;
};

export type TransactionReceipt = {
  transactionHash: string;
  transactionIndex: string;
  blockHash: string;
  blockNumber: string;
  from: string;
  to?: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  contractAddress: string | null;
  logs: Array<LogType>;
  logsBloom: string;
  root?: string;
  status?: string;
  effectiveGasPRice?: string;
};

export type BlockDataTransaction = Array<string> | Array<EthTransaction>;

export type EthBlock = {
  parentHash: string;
  sha3Uncles: string;
  miner: string;
  stateRoot: string;
  transactionsRoot: string;
  receiptsRoot: string;
  logsBloom: string;
  difficulty?: string;
  number: string;
  gasLimit: string;
  gasUsed: string;
  timestamp: string;
  extraData: string;
  mixHash: string;
  nonce: string;
  totalDifficulty?: string;
  baseFeePerGas?: string;
  size: string;
  transactions: BlockDataTransaction;
  uncles?: Array<string>;
  hash: string;
};

export type Filter = {
  fromBlock?: string;
  toBlock?: string;
  address?: string | Array<string>;
  topics?: Array<null | string | Array<string>>;
};

export type FeeHistoryResult = {
  oldestBlock: string;
  baseFeePerGas: Array<string>;
  reward: Array<Array<string>>;
};

export type AccountProofType = {
  address: string;
  accountProof?: Array<string>;
  balance: string;
  codeHash: string;
  nonce: string;
  storageHash: string;
  storageProof: Array<{ key: string; value: string; proof: Array<string> }>;
};

export type GasUsed = {
  accessList?: Array<{ address: string; storageKeys: Array<string> }>;
  error?: string;
  gasUsed?: string;
};
