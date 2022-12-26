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
