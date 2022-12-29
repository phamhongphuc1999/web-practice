/* eslint-disable @typescript-eslint/no-explicit-any */
import { DEFAULT_ADDRESS } from '../constant';
import { EthQuery } from '../eth-query';
import { Json, RawTransaction } from '../type';
import { InputEncoder } from './bytes';
import { Interface } from './interface';

export class Contract {
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

  async viewFunction(functionName: string, params: Array<any>) {
    const _fragment = this.inter.getFunction(functionName);
    const _signature = this.inter.getSignature(functionName);
    if (!_signature) throw new Error(`Can not found ${functionName}`);
    const types = _fragment?.inputs.map((item) => item.type);
    let data = _signature;
    if (types) {
      if (types.length !== params.length) throw new Error('Error params');
      const encodeParam = InputEncoder.encodeParam(params, types);
      data = `${_signature}${encodeParam}`;
    }
    const rawTransaction = { from: DEFAULT_ADDRESS, to: this.address, data } as RawTransaction;
    const result = await this.provider.call(rawTransaction);
    return result;
  }
}
