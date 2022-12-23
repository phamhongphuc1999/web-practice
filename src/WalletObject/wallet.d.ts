/* eslint-disable @typescript-eslint/no-explicit-any */
import * as encryptor from '@metamask/browser-passworder';
import { MyWalletChain } from 'src/configs/wallet-network-config';
import { JsonRpcRequest, JsonRpcMiddleware } from 'json-rpc-engine';
import { MessageParams } from 'eth-json-rpc-middleware';
import { PollingBlockTracker } from 'eth-block-tracker';

export interface TransactionParam {
  to: string;
  data: string;
  nonce: string;
  gas: string;
  from: string;
  value: any;
  gasPrice: string;
  accessList: any;
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
}

export interface TransactionMetadata {
  r: string;
  s: string;
  v: string;
  hash: string;
  txReceipt: any;
  txParams: TransactionParam;
}

export interface FormattedTransactionMetadata {
  v: string;
  r: string;
  s: string;
  to: string;
  gas: string;
  from: string;
  hash: string;
  nonce: string;
  input: any;
  value: any;
  accessList: any;
  blockHash: string | null;
  blockNumber: number | null;
  transactionIndex: number | null;
  gasPrice?: string;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
  type?: string;
}

type ProcessTypedMessage = (
  msgParams: TypedMessageParams,
  req: JsonRpcRequest<unknown>,
  version: string
) => Promise<Record<string, unknown>>;

export interface WalletMiddlewareOptions {
  getAccounts: (req: JsonRpcRequest<unknown>, options?: { suppressUnauthorized?: boolean }) => Promise<string[]>;
  processDecryptMessage?: (msgParams: MessageParams, req: JsonRpcRequest<unknown>) => Promise<Record<string, unknown>>;
  processEncryptionPublicKey?: (address: string, req: JsonRpcRequest<unknown>) => Promise<Record<string, unknown>>;
  processEthSignMessage?: (msgParams: MessageParams, req: JsonRpcRequest<unknown>) => Promise<Record<string, unknown>>;
  processPersonalMessage?: (msgParams: MessageParams, req: JsonRpcRequest<unknown>) => Promise<string>;
  processTransaction?: (txParams: TransactionParams, req: JsonRpcRequest<unknown>) => Promise<string>;
  processSignTransaction?: (txParams: TransactionParams, req: JsonRpcRequest<unknown>) => Promise<string>;
  processTypedMessage?: (msgParams: MessageParams, req: JsonRpcRequest<unknown>, version: string) => Promise<string>;
  processTypedMessageV3?: ProcessTypedMessage;
  processTypedMessageV4?: ProcessTypedMessage;
}

export interface StandardClientMiddleware {
  networkMiddleware: JsonRpcMiddleware<unknown, unknown>;
  blockTracker: PollingBlockTracker;
}

export interface Wallet {
  privateKey: Buffer;
  publicKey: Buffer;
}

export interface MemStoreKeyringType {
  type: string;
  accounts: string[];
}

export interface MemStoreType {
  isUnlocked: boolean;
  keyringTypes: Array<string>;
  keyrings: Array<MemStoreKeyringType>;
  encryptionKey: string | undefined;
  encryptionSalt: string | undefined;
}

export interface StoreType {
  vault: string;
}

export interface OptionType {
  initState?: StoreType;
  keyringTypes?: Array<typeof BaseKeyring>;
  mnemonic?: string;
  numberOfAccounts?: number;
  hdPath?: string;
  withAppKeyOrigin?: string;
  encryptor?: typeof encryptor;
  cacheEncryptionKey?: boolean;
}

export interface MiddlewareParam extends WalletMiddlewareOptions {
  version: string;
  getPendingNonce: (param: any) => void;
  getPendingTransactionByHash: (hash: string) => TransactionMetadata;
}

export interface NetworkOptionType {
  currentNetwork?: MyWalletChain;
}

export interface ActionOptionType {
  initState?: {
    keyringController?: StoreType;
    networkController?: NetworkOptionType;
  };
  encryptor?: typeof encryptor;
}

export interface RestoreKeyringType {
  type: string;
  data: OptionType;
}
