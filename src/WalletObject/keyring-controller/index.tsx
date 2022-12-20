import { stripHexPrefix } from '@ethereumjs/util';
import * as encryptor from '@metamask/browser-passworder';
import { normalize as normalizeAddress } from '@metamask/eth-sig-util';
import { ObservableStore } from '@metamask/obs-store';
import EventEmitter from 'events';
import { BaseKeyring } from '../keyring-object/base-keyring';
import { HDKeyring } from '../keyring-object/hd-keyring';
import { SimpleKeyring } from '../keyring-object/simple-keyring';
import { MemStoreType, OptionType, RestoreKeyringType, StoreType } from '../wallet';
import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';

const keyringTypes: typeof BaseKeyring[] = [SimpleKeyring, HDKeyring];

export const KEYRINGS_TYPE_MAP = {
  HD_KEYRING: 'HD Key Tree',
  SIMPLE_KEYRING: 'Simple Key Pair',
};

export class KeyringController extends EventEmitter {
  store: ObservableStore<StoreType>;
  memStore: ObservableStore<MemStoreType>;
  password: string | undefined;
  keyringTypes: Array<typeof BaseKeyring> = [];
  keyrings: Array<BaseKeyring>;
  encryptor: typeof encryptor;
  cacheEncryptionKey: boolean;

  constructor(options: OptionType) {
    super();
    this.keyringTypes = options.keyringTypes ? keyringTypes.concat(options.keyringTypes) : keyringTypes;
    this.store = new ObservableStore(options.initState ?? { vault: '' });
    this.memStore = new ObservableStore({
      isUnlocked: false,
      keyringTypes: this.keyringTypes.map((keyringType) => keyringType.type),
      keyrings: [],
      encryptionKey: undefined,
      encryptionSalt: undefined,
    });
    this.encryptor = options.encryptor || encryptor;
    this.keyrings = [];
    this.cacheEncryptionKey = Boolean(options.cacheEncryptionKey);
  }

  private async _updateMemStoreKeyrings() {
    const keyrings = await Promise.all(this.keyrings.map(this.displayForKeyring));
    return this.memStore.updateState({ keyrings });
  }

  async displayForKeyring(keyring: BaseKeyring) {
    const accounts = await keyring.getAccounts();
    return {
      type: keyring.type,
      accounts: accounts.map(normalizeAddress),
    };
  }

  fullUpdate() {
    this.emit('update', this.memStore.getState());
    return this.memStore.getState();
  }

  setUnlocked() {
    this.memStore.updateState({ isUnlocked: true });
    this.emit('unlock');
  }

  getKeyringClassForType(type: string) {
    return this.keyringTypes.find((keyring) => keyring.type === type);
  }

  getKeyringsByType(type: string) {
    return this.keyrings.filter((keyring) => keyring.type === type);
  }

  async getAccounts() {
    const keyrings = this.keyrings || [];
    const keyringArrays = await Promise.all(keyrings.map((keyring) => keyring.getAccounts()));
    const addresses = keyringArrays.reduce((res, arr) => {
      return res.concat(arr);
    }, []);
    return addresses.map(normalizeAddress);
  }

  async checkForDuplicate(type: string, newAccountArray: Array<string>) {
    const accounts = await this.getAccounts();
    switch (type) {
      case KEYRINGS_TYPE_MAP.SIMPLE_KEYRING: {
        const isIncluded = Boolean(
          accounts.find((key) => key === newAccountArray[0] || key === stripHexPrefix(newAccountArray[0]))
        );
        if (isIncluded) throw new Error('The account you are trying to import is a duplicate');
        return newAccountArray;
      }
      default: {
        return newAccountArray;
      }
    }
  }

  async persistAllKeyrings() {
    const { encryptionKey, encryptionSalt } = this.memStore.getState();
    if (!this.password && !encryptionKey) throw new Error('Cannot persist vault without password and encryption key');
    const serializedKeyrings = await Promise.all(
      this.keyrings.map(async (keyring) => {
        const [type, data] = await Promise.all([keyring.type, keyring.serialize()]);
        return { type, data };
      })
    );
    let vault;
    let newEncryptionKey;
    if (this.cacheEncryptionKey) {
      if (this.password) {
        const { vault: newVault, exportedKeyString } = await this.encryptor.encryptWithDetail(
          this.password,
          serializedKeyrings
        );
        vault = newVault;
        newEncryptionKey = exportedKeyString;
      } else if (encryptionKey) {
        const key = await this.encryptor.importKey(encryptionKey);
        const vaultJSON = await this.encryptor.encryptWithKey(key, serializedKeyrings);
        vaultJSON.salt = encryptionSalt;
        vault = JSON.stringify(vaultJSON);
      }
    } else if (this.password) vault = await this.encryptor.encrypt(this.password, serializedKeyrings);
    if (!vault) throw new Error('Cannot persist vault without vault information');
    this.store.updateState({ vault });
    await this._updateMemStoreKeyrings();
    if (newEncryptionKey) this.memStore.updateState({ encryptionKey: newEncryptionKey });
    return true;
  }

  async addNewKeyring(type: string, options?: OptionType) {
    const _Keyring = this.getKeyringClassForType(type);
    if (_Keyring) {
      const keyring = new _Keyring(options);
      if ((!options || !options.mnemonic) && type === KEYRINGS_TYPE_MAP.HD_KEYRING) {
        const _keyring = keyring as HDKeyring;
        _keyring.generateRandomMnemonic();
        _keyring.addAccounts();
      }
      const accounts = keyring.getAccounts();
      await this.checkForDuplicate(type, accounts);
      this.keyrings.push(keyring);
      await this.persistAllKeyrings();
      this.fullUpdate();
      return keyring;
    }
    return undefined;
  }

  async clearKeyrings() {
    this.keyrings = [];
    const _state = { keyrings: [] } as Partial<MemStoreType>;
    this.memStore.updateState(_state);
  }

  async createFirstKeyTree() {
    this.clearKeyrings();
    const keyring = await this.addNewKeyring(KEYRINGS_TYPE_MAP.HD_KEYRING);
    if (keyring) {
      const [firstAccount] = await keyring.getAccounts();
      if (!firstAccount) throw new Error('KeyringController - No account found on keychain.');
      const hexAccount = normalizeAddress(firstAccount);
      this.emit('newVault', hexAccount);
      return null;
    }
  }

  async createNewVaultAndKeychain(password: string) {
    this.password = password;
    await this.createFirstKeyTree();
    this.setUnlocked();
    return this.fullUpdate();
  }

  async createNewVaultAndRestore(password: string, seedPhrase: string) {
    if (!bip39.validateMnemonic(seedPhrase, wordlist)) throw new Error('Seed phrase is invalid.');
    this.password = password;
    this.clearKeyrings();
    const firstKeyring = await this.addNewKeyring(KEYRINGS_TYPE_MAP.HD_KEYRING, {
      mnemonic: seedPhrase,
      numberOfAccounts: 1,
    });
    if (firstKeyring) {
      const [firstAccount] = await firstKeyring.getAccounts();
      if (!firstAccount) throw new Error('KeyringController - First Account not found.');
      this.setUnlocked();
    }
    return this.fullUpdate();
  }

  async _restoreKeyring(serialized: RestoreKeyringType) {
    const { type, data } = serialized;

    const Keyring = this.getKeyringClassForType(type);
    if (Keyring) {
      const keyring = new Keyring();
      await keyring.deserialize(data);
      await keyring.getAccounts();
      this.keyrings.push(keyring);
      return keyring;
    }
  }

  async restoreKeyring(serialized: RestoreKeyringType) {
    const keyring = await this._restoreKeyring(serialized);
    await this._updateMemStoreKeyrings();
    return keyring;
  }

  async unlockKeyrings(password: string, encryptionKey?: string, encryptionSalt?: string) {
    const encryptedVault = this.store.getState().vault;
    if (!encryptedVault) throw new Error('Cannot unlock without a previous vault.');
    await this.clearKeyrings();

    let vault;
    if (this.cacheEncryptionKey) {
      if (password) {
        const result = await this.encryptor.decryptWithDetail(password, encryptedVault);
        vault = result.vault;
        this.password = password;

        this.memStore.updateState({
          encryptionKey: result.exportedKeyString,
          encryptionSalt: result.salt,
        });
      } else {
        const parsedEncryptedVault = JSON.parse(encryptedVault);
        if (encryptionSalt !== parsedEncryptedVault.salt)
          throw new Error('Encryption key and salt provided are expired');
        if (encryptionKey) {
          const key = await this.encryptor.importKey(encryptionKey);
          vault = await this.encryptor.decryptWithKey(key, parsedEncryptedVault);
        }
        this.memStore.updateState({ encryptionKey, encryptionSalt });
      }
    } else {
      vault = await this.encryptor.decrypt(password, encryptedVault);
      this.password = password;
    }

    await Promise.all((vault as RestoreKeyringType[]).map(this._restoreKeyring.bind(this)));
    await this._updateMemStoreKeyrings();
    return this.keyrings;
  }

  async submitPassword(password: string) {
    this.keyrings = await this.unlockKeyrings(password);
    this.setUnlocked();
    return this.fullUpdate();
  }
}
