import { bufferToHex, privateToPublic, publicToAddress } from '@ethereumjs/util';
import { generateKey } from '../utils';
import { OptionType, Wallet } from '../wallet';
import { BaseKeyring } from './base-keyring';

export class SimpleKeyring extends BaseKeyring {
  static type = 'Simple Key Pair';
  type = 'Simple Key Pair';
  private wallets: Wallet[];

  constructor(options?: OptionType) {
    super(options);
    this.wallets = [];
  }

  serialize() {
    return undefined;
  }

  deserialize() {
    return ['123'];
  }

  addAccounts(numberOfAccounts = 1) {
    const newWallets = [];
    for (let i = 0; i < numberOfAccounts; i++) {
      const privateKey = generateKey();
      const publicKey = privateToPublic(privateKey);
      newWallets.push({ privateKey, publicKey });
    }
    this.wallets = this.wallets.concat(newWallets);
    const hexWallets = newWallets.map(({ publicKey }) => {
      return bufferToHex(publicToAddress(publicKey));
    });
    return hexWallets;
  }

  getAccounts() {
    return this.wallets.map(({ publicKey }) => bufferToHex(publicToAddress(publicKey)));
  }

  async signTransaction() {
    //
  }

  async signMessage() {
    ///
  }

  async signPersonalMessage() {
    ///
  }

  async decryptMessage() {
    ///
  }

  async signTypedData() {
    ///
  }

  async getEncryptionPublicKey() {
    ///
  }

  private _getPrivateKeyFor() {
    ///
  }

  async getAppKeyAddress() {
    ///
  }

  async exportAccount() {
    ///
  }

  removeAccount() {
    ///
  }

  private _getWalletForAccount() {
    ///
  }
}
