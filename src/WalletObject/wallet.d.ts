import * as encryptor from '@metamask/browser-passworder';

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

export interface ActionOptionType {
  initState?: {
    keyringController?: StoreType;
  };
  encryptor?: typeof encryptor;
}

export interface RestoreKeyringType {
  type: string;
  data: OptionType;
}
