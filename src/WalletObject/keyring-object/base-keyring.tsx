import EventEmitter from 'events';
import { OptionType } from '../wallet';

export class BaseKeyring extends EventEmitter {
  static type = 'Base Keyring';
  options?: OptionType = undefined;

  constructor(options?: OptionType) {
    super();
    this.options = options;
  }

  addAccounts(numberOfAccounts = 1): string[] {
    return [numberOfAccounts.toString()];
  }

  getAccounts(): string[] {
    return ['getAccounts'];
  }
}
