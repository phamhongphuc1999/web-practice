import EventEmitter from 'events';
import { ObservableStore } from '@metamask/obs-store';
import { SimpleKeyring } from '../keyring-object/simple-keyring';
import { BaseKeyring } from '../keyring-object/base-keyring';
import { MemStoreType, OptionType, StoreType } from '../wallet';
import { HDKeyring } from '../keyring-object/hd-keyring';

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

  getKeyringClassForType(type: string) {
    return this.keyringTypes.find((keyring) => keyring.type === type);
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
      // const accounts = keyring.getAccounts();
      this.keyrings.push(keyring);
      return keyring;
    }
    return undefined;
  }

  async clearKeyrings() {
    const _state = { keyrings: [] } as Partial<MemStoreType>;
    this.memStore.updateState(_state);
  }

  async createFirstKeyTree() {
    this.clearKeyrings();
    const keyring = await this.addNewKeyring(KEYRINGS_TYPE_MAP.HD_KEYRING);
    if (keyring) {
      // const [firstAccount] = await keyring.getAccounts();
    }
  }

  async createNewVaultAndKeychain(password: string) {
    this.password = password;
  }
}
