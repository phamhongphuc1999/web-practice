export const TransactionType = {
  legacy: 0,
  eip2930: 1,
  eip1559: 2,
};

export type TransactionSignReturn = {
  messageHash: string;
  v: string | null;
  r: string | null;
  s: string | null;
  rawTransaction: string;
  transactionHash: string;
};

export interface LegacyTransactionType {
  type?: string;
  nonce?: string;
  gasPrice?: string;
  gasLimit?: string;
  to?: string;
  value?: string;
  data?: string;
  v?: string;
  r?: string;
  s?: string;
}

export interface EIP2930TransactionType extends LegacyTransactionType {
  chainId?: string;
  accessList?: Array<{ address: string; storageKeys: Array<string> }>;
}

export interface EIP1559TransactionType extends EIP2930TransactionType {
  maxPriorityFeePerGas?: string;
  maxFeePerGas?: string;
}

export type OverviewTransaction =
  | LegacyTransactionType
  | EIP2930TransactionType
  | EIP1559TransactionType;
