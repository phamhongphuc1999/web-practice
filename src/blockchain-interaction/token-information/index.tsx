import StandardTokenAbi from 'src/assets/abis/StandardTokenAbi.json';
import Contract from '../contract-handler/contract';
import { getAddress } from '../utils';
import TokenBalance from './TokenBalance';

export default class TokenInformation {
  tokenAddress: string;
  rpcUrl: string;
  private contract: Contract;
  private _decimals: string;
  private _symbol: string;
  private _name: string;

  constructor(tokenAddress: string, rpcUrl: string) {
    const _tokenAddress = getAddress(tokenAddress);
    if (_tokenAddress) this.tokenAddress = _tokenAddress;
    else throw new Error('tokenInformation-invalid token address');
    this.rpcUrl = rpcUrl;
    this.contract = new Contract(tokenAddress, JSON.stringify(StandardTokenAbi), rpcUrl);
    this._decimals = '';
    this._symbol = '';
    this._name = '';
  }

  async price() {
    return await TokenBalance.getTokenPrice(await this.symbol());
  }

  async balanceOf(address: string) {
    return await TokenBalance.getBalance(address, this.tokenAddress, this.rpcUrl);
  }

  async decimals() {
    if (this._decimals.length === 0) this._decimals = await this.contract.viewFunction('decimals');
    return this._decimals;
  }

  async symbol() {
    if (this._symbol.length === 0) this._symbol = await this.contract.viewFunction('symbol');
    return this._symbol;
  }

  async name() {
    if (this._name.length === 0) this._name = await this.contract.viewFunction('name');
    return this._name;
  }
}
