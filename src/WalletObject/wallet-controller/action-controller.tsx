import { Mutex } from 'await-semaphore';
import EventEmitter from 'events';
import { KeyringController } from '../keyring-controller';
import { ActionOptionType, MemStoreType } from '../wallet';

export class ActionController extends EventEmitter {
  options: ActionOptionType | undefined;
  keyringController: KeyringController;
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
    this.createVaultMutex = new Mutex();
  }

  _onKeyringControllerUpdate(state: MemStoreType) {
    const { keyrings } = state;
    const addresses = Array<string>();
    for (const keyring of keyrings) addresses.concat(keyring.accounts);
    if (!addresses.length) return;
  }

  _onUnlock() {
    ///
  }

  _onLock() {
    ///
  }

  async createNewVaultAndKeychain(password: string) {
    const releaseLock = await this.createVaultMutex.acquire();
    try {
      let vault;
      const accounts = await this.keyringController.getAccounts();
      if (accounts.length > 0) vault = await this.keyringController.fullUpdate();
      else vault = await this.keyringController.createNewVaultAndKeychain(password);
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
