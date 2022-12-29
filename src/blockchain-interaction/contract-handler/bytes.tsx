/* eslint-disable @typescript-eslint/no-explicit-any */
import { keccak256 } from '@ethersproject/keccak256';
import { toUtf8Bytes } from '@ethersproject/strings';

export function getId(text: string) {
  return keccak256(toUtf8Bytes(text));
}

export class InputEncoder {
  static expand32bytes(text: string) {
    let result = text;
    while (result.length < 64) result = '0' + result;
    return result;
  }

  static encodeNumber(num: number) {
    return InputEncoder.expand32bytes(num.toString(16));
  }

  static encodeBool(bool: boolean) {
    return InputEncoder.expand32bytes(Number(bool).toString(16));
  }

  static encodeAddress(address: string) {
    address = address.toLowerCase();
    if (address.slice(0, 2) == '0x') return InputEncoder.expand32bytes(address.slice(2));
    else return InputEncoder.expand32bytes(address);
  }

  private static encodeSwitch(param: any, type: string) {
    if (type === 'address') return InputEncoder.encodeAddress(param as string);
    else if (type === 'number') return InputEncoder.encodeNumber(param as number);
    else if (type === 'boolean') return InputEncoder.encodeBool(param as boolean);
    else return undefined;
  }

  static encodeParam(params: Array<any>, types: Array<string>) {
    if (params.length !== types.length) throw new Error('Encode interface: Invalid params');
    else {
      let result = '';
      const _len = types.length;
      for (let i = 0; i < _len; i++) {
        const _param = params[i];
        const _type = types[i];
        const _encode = InputEncoder.encodeSwitch(_param, _type);
        if (_encode) result += _encode;
        else return undefined;
      }
      return result;
    }
  }
}
