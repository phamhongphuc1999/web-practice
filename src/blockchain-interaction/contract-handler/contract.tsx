/* eslint-disable @typescript-eslint/no-explicit-any */
import Decoder from '../coder/decoder';
import Encoder from '../coder/encoder';
import EthQuery from '../eth-query';
import { Json, RawTransaction } from '../type';
import Interface from './interface';

export default class Contract {
  address: string;
  private inter: Interface;
  rpcUrl: string;
  provider: EthQuery;

  constructor(address: string, abi: Json | Interface, provider: string | EthQuery) {
    this.address = address;
    if (abi as Json) this.inter = new Interface(abi as Json);
    else this.inter = abi as Interface;
    if (typeof provider === 'string') {
      this.rpcUrl = provider;
      this.provider = new EthQuery(provider);
    } else {
      this.rpcUrl = provider.rpcUrl;
      this.provider = provider;
    }
  }

  async viewFunction(functionName: string, params?: Array<any>, options?: Omit<RawTransaction, 'to' | 'data'>) {
    const _fragment = this.inter.getFunction(functionName);
    const _signature = this.inter.getSignature(functionName);
    if (!_signature) throw new Error(`Can not found ${functionName}`);
    if (!options) options = {};
    let result: string | null = null;
    if (params) {
      const inputTypes = _fragment?.inputs.map((item) => item.type);
      let data = _signature;
      if (inputTypes) {
        if (inputTypes.length !== params.length) throw new Error('Error params');
        const encodeParam = Encoder.encodeParam(params, inputTypes);
        data = `${_signature}${encodeParam}`;
      }
      result = await this.provider.call({ ...options, to: this.address, data } as RawTransaction);
    } else result = await this.provider.call({ ...options, to: this.address, data: _signature });
    const outputTypes = _fragment?.outputs.map((item) => ({ type: item.type, name: item.name }));
    if (outputTypes && result) return Decoder.decodeParam(result, outputTypes);
    return null;
  }
}
