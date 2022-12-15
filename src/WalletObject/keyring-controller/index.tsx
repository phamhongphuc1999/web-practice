import EventEmitter from 'events';
import { ObservableStore } from '@metamask/obs-store';
import { SimpleKeyring } from '../keyring-object/simple-keyring';
import { BaseKeyring } from '../keyring-object/base-keyring';
import { MemStoreType, OptionType, StoreType } from '../wallet';
import { HDKeyring } from '../keyring-object/hd-keyring';
import { normalize as normalizeAddress } from '@metamask/eth-sig-util';
import { stripHexPrefix } from '@ethereumjs/util';

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

  constructor(options: OptionType) {
    super();
    this.keyringTypes = options.keyringTypes ? keyringTypes.concat(options.keyringTypes) : keyringTypes;
    this.store = new ObservableStore(options.initState);
    this.memStore = new ObservableStore({
      isUnlocked: false,
      keyringTypes: this.keyringTypes.map((keyringType) => keyringType.type),
      keyrings: [],
      encryptionKey: null,
    });
    this.keyrings = [];
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
}
