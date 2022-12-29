import { Json } from '../type';
import { getId } from './bytes';
import {
  BaseFragment,
  ConstructorFragment,
  ErrorFragment,
  EventFragment,
  FunctionFragment,
  JsonContractAbi,
} from './type';

export class Interface {
  private rawAbi: Json[];
  abi: JsonContractAbi;

  constructor(abi: Json) {
    if (abi == null) throw new Error('Abi invalid: null type');
    const _type = typeof abi;
    if (_type === 'boolean' || _type === 'number') throw new Error('Abi invalid: wrong type');
    if (_type === 'string') abi = JSON.parse(abi.toString());
    if (Array.isArray(abi)) this.rawAbi = abi;
    else throw new Error('Abi invalid: can not convert to array');
    this.abi = {
      functions: [] as Array<FunctionFragment>,
      events: [] as Array<EventFragment>,
      errors: [] as Array<ErrorFragment>,
    } as JsonContractAbi;
    this._from();
  }

  private _from() {
    for (const item of this.rawAbi) {
      const rawFragment = item as BaseFragment;
      if (rawFragment) {
        if (rawFragment.type === 'constructor') this.abi.constructor = rawFragment as ConstructorFragment;
        else if (rawFragment.type === 'function') this.abi.functions.push(rawFragment as FunctionFragment);
        else if (rawFragment.type === 'event') this.abi.events.push(rawFragment as EventFragment);
        else if (rawFragment.type === 'error') this.abi.errors.push(rawFragment as ErrorFragment);
      }
    }
  }

  getFunctions() {
    return this.abi.functions;
  }

  getFunction(functionName: string) {
    return this.abi.functions.find((item) => item.name === functionName);
  }

  getEvents() {
    return this.abi.events;
  }

  getEvent(eventName: string) {
    return this.abi.events.find((item) => item.name === eventName);
  }

  getErrors() {
    return this.abi.errors;
  }

  getError(eventName: string) {
    return this.abi.errors.find((item) => item.name === eventName);
  }

  findByName(fragmentName: string) {
    const _function = this.getFunction(fragmentName);
    const _event = this.getEvent(fragmentName);
    const _error = this.getError(fragmentName);
    const result = [] as Array<FunctionFragment | EventFragment | ErrorFragment>;
    if (_function) result.push(_function);
    if (_event) result.push(_event);
    if (_error) result.push(_error);
    return result;
  }

  getFunctionFormat(fragment: FunctionFragment) {
    const inputs = [] as Array<string>;
    for (const input of fragment.inputs) {
      inputs.push(input.type);
    }
    if (inputs.length > 0) return `${fragment.name}(${inputs.join(',')})`;
    else return `${fragment.name}()`;
  }

  getSignature(fragment: string | FunctionFragment) {
    let _fragment: FunctionFragment | undefined = undefined;
    if (typeof fragment === 'string') _fragment = this.getFunction(fragment);
    else _fragment = fragment;
    if (_fragment) {
      const _funcString = this.getFunctionFormat(_fragment);
      return getId(_funcString).slice(0, 10);
    }
    return undefined;
  }
}
