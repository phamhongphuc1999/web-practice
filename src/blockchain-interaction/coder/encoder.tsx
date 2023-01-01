/* eslint-disable @typescript-eslint/no-explicit-any */
export default class Encoder {
  private static expand32bytes(text: string) {
    let result = text;
    while (result.length < 64) result = '0' + result;
    return result;
  }

  private static encodeNumber(num: number) {
    return Encoder.expand32bytes(num.toString(16));
  }

  private static encodeAddress(address: string) {
    address = address.toLowerCase();
    if (address.slice(0, 2) == '0x') return Encoder.expand32bytes(address.slice(2));
    else return Encoder.expand32bytes(address);
  }

  private static encodeSwitch(param: any, type: string) {
    if (type === 'address') return Encoder.encodeAddress(param as string);
    else if (type === 'number') return Encoder.encodeNumber(param as number);
    else if (type === 'boolean') return Encoder.encodeNumber(Number(param));
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
        const _encode = Encoder.encodeSwitch(_param, _type);
        if (_encode) result += _encode;
        else return undefined;
      }
      return result;
    }
  }
}
