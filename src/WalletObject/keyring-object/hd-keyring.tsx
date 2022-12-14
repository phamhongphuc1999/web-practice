import { bufferToHex, publicToAddress } from '@ethereumjs/util';
import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import { HDKey } from 'ethereum-cryptography/hdkey';
import { OptionType } from '../wallet';
import { BaseKeyring } from './base-keyring';

export class HDKeyring extends BaseKeyring {
  static type = 'HD Key Tree';
  root: HDKey | null;
  mnemonic: Uint8Array | null;
  hdWallet: HDKey | null;
  hdPath: string;
  private wallets: HDKey[];

  constructor(options?: OptionType) {
    super(options);
    this.root = null;
    this.mnemonic = null;
    this.hdWallet = null;
    // eslint-disable-next-line quotes
    this.hdPath = "m/44'/60'/0'/0";
    this.wallets = [];
  }

  generateRandomMnemonic() {
    this._initFromMnemonic(bip39.generateMnemonic(wordlist));
  }

  _uint8ArrayToString() {
    ///
  }

  private _stringToUint8Array(mnemonic: string) {
    const indices = mnemonic.split(' ').map((word) => wordlist.indexOf(word));
    return new Uint8Array(new Uint16Array(indices).buffer);
  }

  private _mnemonicToUint8Array(mnemonic: string | Array<number> | Buffer) {
    const mnemonicData = mnemonic;
    if (Array.isArray(mnemonicData)) {
      return this._stringToUint8Array(Buffer.from(mnemonicData).toString());
    } else if (Buffer.isBuffer(mnemonicData)) {
      return this._stringToUint8Array(mnemonicData.toString());
    } else return this._stringToUint8Array(mnemonicData);
  }

  serialize() {
    ///
  }

  deserialize() {
    ///
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
      if (w.publicKey) return this._addressfromPublicKey(w.publicKey);
      else return '';
    });
    return hexWallets.filter((value) => value.length > 0);
  }

  getAccounts() {
    return this.wallets
      .map((w) => {
        if (w.publicKey) return this._addressfromPublicKey(w.publicKey);
        else return '';
      })
      .filter((value) => value.length > 0);
  }

  async getAppKeyAddress() {
    ///
  }

  async exportAccount() {
    ///
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

  private _getWalletForAccount() {
    ///
  }

  private _initFromMnemonic(mnemonic: string | Array<number> | Buffer) {
    if (this.root) throw new Error('Eth-Hd-Keyring: Secret recovery phrase already provided');
    this.mnemonic = this._mnemonicToUint8Array(mnemonic);
    const isValid = bip39.validateMnemonic(this.mnemonic.toString(), wordlist);
    if (!isValid) throw new Error('Eth-Hd-Keyring: Invalid secret recovery phrase provided');
    const seed = bip39.mnemonicToSeedSync(this.mnemonic.toString(), wordlist.toString());
    this.hdWallet = HDKey.fromMasterSeed(seed);
    this.root = this.hdWallet.derive(this.hdPath);
  }

  _addressfromPublicKey(publicKey: Uint8Array) {
    return bufferToHex(publicToAddress(Buffer.from(publicKey), true)).toLowerCase();
  }
}
