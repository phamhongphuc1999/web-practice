import EventEmitter from 'events';
import { OptionType } from '../wallet';

export default class BaseKeyring extends EventEmitter {
  static type = 'Base Keyring';
  type = 'Base Keyring';
  options?: OptionType = undefined;

  constructor(options?: OptionType) {
    super();
    this.options = options;
  }

  serialize():
    | {
        mnemonic: string;
        numberOfAccounts: number;
        hdPath: string;
      }
    | undefined {
    return undefined;
  }

  deserialize(options: OptionType): string[] | Promise<never[]> {
    return [options.mnemonic ?? ''];
  }

  addAccounts(numberOfAccounts = 1): string[] {
    return [numberOfAccounts.toString()];
  }

  getAccounts(): string[] {
    return ['getAccounts'];
  }
}
