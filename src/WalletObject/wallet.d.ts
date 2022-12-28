/* eslint-disable @typescript-eslint/no-explicit-any */
import * as encryptor from '@metamask/browser-passworder';
import { MyWalletChain } from 'src/configs/wallet-network-config';

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

export interface NetworkOptionType {
  currentNetwork?: MyWalletChain | string;
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
