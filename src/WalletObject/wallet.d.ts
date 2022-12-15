export interface Wallet {
  privateKey: Buffer;
  publicKey: Buffer;
}

export interface MemStoreType {
  isUnlocked: boolean;
  keyringTypes: Array<string>;
  keyrings: [];
  encryptionKey: null;
}

export interface StoreType {
  value: string;
}

export interface OptionType {
  initState: StoreType;
  keyringTypes?: Array<typeof BaseKeyring>;
  mnemonic?: string;
  numberOfAccounts?: number;
  hdPath?: string;
  withAppKeyOrigin?: string;
}
