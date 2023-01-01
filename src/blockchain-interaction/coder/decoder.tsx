/* eslint-disable @typescript-eslint/no-explicit-any */
import numberToBN from '../bn-module/number-to-bn';
import { Json } from '../type';

export type DecodeTypeParam = {
  name: string;
  type: any;
};

export default class Decoder {
  private static truncateBytes(text: string) {
    let result = text;
    if (result.slice(0, 2) == '0x') result = result.slice(2);
    let _check = true;
    while (_check && result.length > 1) {
      if (result[0] === '0') result = result.slice(1);
      else _check = false;
    }
    return `0x${result}`;
  }

  private static decodeNumber(num: number | string) {
    return numberToBN(num);
  }

  private static decodeString(data: string) {
    //
  }

  private static decodeSwitch(param: any, type: string) {
    return undefined;
  }

  static decodeParam(params: string, types: DecodeTypeParam[]) {
    return params;
    // if (params.length !== types.length) throw new Error('Decode interface: Invalid params');
    // else {
    //   const result: Json = {};
    //   const _len = types.length;
    //   for (let i = 0; i < _len; i++) {
    //     const _params = params[i];
    //     const _type = types[i];
    //     const _decode = Decoder.decodeSwitch(_params, _type.type);
    //     if (_decode) result[_type.name] = _decode;
    //     else result[_type.name] = null;
    //   }
    //   return result;
    // }
  }
}
