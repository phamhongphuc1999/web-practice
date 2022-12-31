import { arrToBufArr, bufferToHex, privateToPublic, publicToAddress } from '@ethereumjs/util';
import { normalize } from '@metamask/eth-sig-util';
import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import { HDKey } from 'ethereum-cryptography/hdkey';
import { keccak256 } from 'ethereum-cryptography/keccak';
import { bytesToHex } from 'ethereum-cryptography/utils';
import { OptionType } from '../wallet';
import BaseKeyring from './base-keyring';

// eslint-disable-next-line quotes
const hdPathString = "m/44'/60'/0'/0";

export default class HDKeyring extends BaseKeyring {
  static type = 'HD Key Tree';
  type = 'HD Key Tree';
  root: HDKey | null;
  mnemonic: string;
  hdWallet: HDKey | null;
  hdPath: string;
  private wallets: HDKey[];

  constructor(options?: OptionType) {
    super(options);
    this.root = null;
    this.mnemonic = '';
    this.hdWallet = null;
    this.hdPath = hdPathString;
    this.wallets = [];
    if (options) this.deserialize(options);
  }

  generateRandomMnemonic() {
    this._initFromMnemonic(bip39.generateMnemonic(wordlist));
  }

  private _uint8ArrayToString(mnemonic: number) {
    const recoveredIndices = Array.from(new Uint16Array(new Uint8Array(mnemonic).buffer));
    return recoveredIndices.map((i) => wordlist[i]).join(' ');
  }

  private _stringToUint8Array(mnemonic: string) {
    const indices = mnemonic.split(' ').map((word) => wordlist.indexOf(word));
    return new Uint8Array(new Uint16Array(indices).buffer);
  }

  private _mnemonicToUint8Array(mnemonic: string | Buffer | Array<number> | object) {
    const mnemonicData = mnemonic;
    if (typeof mnemonicData === 'string' || Buffer.isBuffer(mnemonicData) || Array.isArray(mnemonicData)) {
      let mnemonicAsString = mnemonicData;
      if (Array.isArray(mnemonicData)) mnemonicAsString = Buffer.from(mnemonicData).toString();
      else if (Buffer.isBuffer(mnemonicData)) mnemonicAsString = mnemonicData.toString();
      return this._stringToUint8Array(mnemonicAsString.toString());
    } else if (mnemonicData instanceof Object && !(mnemonicData instanceof Uint8Array)) {
      return Uint8Array.from(Object.values(mnemonicData));
    }
    return mnemonicData;
  }

  serialize() {
    if (this.mnemonic) return { mnemonic: this.mnemonic, numberOfAccounts: this.wallets.length, hdPath: this.hdPath };
    return undefined;
  }

  deserialize(options: OptionType) {
    if (options.numberOfAccounts && !options.mnemonic)
      throw new Error(
        'Eth-Hd-Keyring: Deserialize method cannot be called with an opts value for numberOfAccounts and no menmonic'
      );
    if (this.root) throw new Error('Eth-Hd-Keyring: Secret recovery phrase already provided');
    this.options = options;
    this.wallets = [];
    this.mnemonic = '';
    this.root = null;
    this.hdPath = options.hdPath ?? hdPathString;
    if (options.mnemonic) this._initFromMnemonic(options.mnemonic);
    if (options.numberOfAccounts) return this.addAccounts(options.numberOfAccounts);
    return Promise.resolve([]);
  }

  addAccounts(numberOfAccounts = 1): string[] {
    if (!this.root) throw new Error('Eth-Hd-Keyring: No secret recovery phrase provided');
    const oldLen = this.wallets.length;
    const newWallets = [];
    for (let i = oldLen; i < numberOfAccounts + oldLen; i++) {
      const wallet = this.root.deriveChild(i);
      newWallets.push(wallet);
      this.wallets.push(wallet);
    }
    const hexWallets = newWallets.map((w) => {
      if (w.publicKey) return this._addressFromPublicKey(w.publicKey);
      else return '';
    });
    return hexWallets.filter((value) => value.length > 0);
  }

  getAccounts() {
    return this.wallets
      .map((w) => {
        if (w.publicKey) return this._addressFromPublicKey(w.publicKey);
        else return '';
      })
      .filter((value) => value.length > 0);
  }

  async getAppKeyAddress() {
    ///
  }

  exportAccount(address: string, options?: OptionType) {
    const wallet = this._getWalletForAccount(address, options);
    if (wallet.privateKey) return bytesToHex(wallet.privateKey);
    return undefined;
  }

  async signTransaction() {
    ///
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

  removeAccount() {
    ///
  }

  async getEncryptionPublicKey() {
    ///
  }

  private _getPrivateKeyFor() {
    ///
  }

  private _getWalletForAccount(account: string, options?: OptionType) {
    const address = normalize(account);
    const wallet = this.wallets.find(({ publicKey }) => {
      if (publicKey) return this._addressFromPublicKey(publicKey) === address;
      else return false;
    });
    if (!wallet) throw new Error('HD Keyring - Unable to find matching address.');
    if (options?.withAppKeyOrigin) {
      const { privateKey } = wallet;
      if (privateKey) {
        const appKeyOriginBuffer = Buffer.from(options.withAppKeyOrigin, 'utf8');
        const appKeyBuffer = Buffer.concat([privateKey, appKeyOriginBuffer]);
        const appKeyPrivateKey = arrToBufArr(keccak256(appKeyBuffer));
        const appKeyPublicKey = privateToPublic(appKeyPrivateKey);
        return { privateKey: appKeyPrivateKey, publicKey: appKeyPublicKey };
      }
    }
    return wallet;
  }

  private _initFromMnemonic(mnemonic: string) {
    if (this.root) throw new Error('Eth-Hd-Keyring: Secret recovery phrase already provided');
    this.mnemonic = mnemonic;
    const isValid = bip39.validateMnemonic(mnemonic, wordlist);
    if (!isValid) throw new Error('Eth-Hd-Keyring: Invalid secret recovery phrase provided');
    const seed = bip39.mnemonicToSeedSync(mnemonic, wordlist.toString());
    this.hdWallet = HDKey.fromMasterSeed(seed);
    this.root = this.hdWallet.derive(this.hdPath);
  }

  private _addressFromPublicKey(publicKey: Uint8Array) {
    return bufferToHex(publicToAddress(Buffer.from(publicKey), true)).toLowerCase();
  }
}
