import { Mutex } from 'await-semaphore';
import EventEmitter from 'events';
import { KeyringController } from '../keyring-controller';
import { ActionOptionType, MemStoreType } from '../wallet';
import { StorageController } from './storage-controller';

export class ActionController extends EventEmitter {
  options: ActionOptionType | undefined;
  keyringController: KeyringController;
  storageController: StorageController;
  createVaultMutex: Mutex;

  constructor(options?: ActionOptionType) {
    super();
    this.options = options;
    this.keyringController = new KeyringController({
      initState: options?.initState?.keyringController,
      encryptor: options?.encryptor,
    });
    this.keyringController.memStore.subscribe((state) => this._onKeyringControllerUpdate(state));
    this.keyringController.on('unlock', () => this._onUnlock());
    this.keyringController.on('lock', () => this._onLock());
    this.storageController = new StorageController();
    this.createVaultMutex = new Mutex();
  }

  private _onKeyringControllerUpdate(state: MemStoreType) {
    const { keyrings } = state;
    const addresses = Array<string>();
    for (const keyring of keyrings) addresses.concat(keyring.accounts);
    if (!addresses.length) return;
  }

  private _onUnlock() {
    ///
  }

  private _onLock() {
    ///
  }

  private async _save() {
    const _mnemonic = await this.verifySeedPhrase();
    if (_mnemonic) this.storageController.saveSeedPhrase(_mnemonic);
  }

  async createNewVaultAndKeychain(password: string) {
    const releaseLock = await this.createVaultMutex.acquire();
    try {
      let vault;
      const accounts = await this.keyringController.getAccounts();
      if (accounts.length > 0) vault = await this.keyringController.fullUpdate();
      else vault = await this.keyringController.createNewVaultAndKeychain(password);
      await this._save();
      return vault;
    } finally {
      releaseLock();
    }
  }

  async createNewVaultAndRestore(password: string, seedPhrase: string) {
    const releaseLock = await this.createVaultMutex.acquire();
    try {
      const vault = await this.keyringController.createNewVaultAndRestore(password, seedPhrase);
      // const accounts = await this.keyringController.getAccounts();
      const [primaryKeyring] = this.keyringController.getKeyringsByType('HD Key Tree');
      if (!primaryKeyring) throw new Error('ActionController - No HD Key Tree found');
      await this._save();
      return vault;
    } finally {
      releaseLock();
    }
  }

  async verifySeedPhrase() {
    const [primaryKeyring] = this.keyringController.getKeyringsByType('HD Key Tree');
    if (!primaryKeyring) throw new Error('ActionController - No HD Key Tree found');
    const serialized = await primaryKeyring.serialize();
    const mnemonic = serialized?.mnemonic;
    if (mnemonic) {
      const accounts = await primaryKeyring.getAccounts();
      if (accounts.length < 1) throw new Error('ActionController - No accounts found');
      // verify account with mnemonic
      return mnemonic;
    }
  }
}
