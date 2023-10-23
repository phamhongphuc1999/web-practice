import { EthQuery } from '@peter-present/eth-query';
import axios from 'axios';
import BigNumber from 'bignumber.js';
import StandardTokenAbi from 'src/assets/abis/StandardTokenAbi.json';
import { BIG_NUMBER } from '../constant';
import Contract from '../contract-handler/contract';

export default class TokenBalance {
  static readonly PRICE_TOKEN_ROOT = 'https://min-api.cryptocompare.com/data/price';

  static async getTokenPrice(tokenSymbol: string, currency = 'USD') {
    const formattedCurrency = currency.toUpperCase();
    const result = await axios
      .get<{ [key: string]: number }>(
        `${TokenBalance.PRICE_TOKEN_ROOT}?fsym=${tokenSymbol}&tsyms=${formattedCurrency}`
      )
      .then((res) => res.data);
    return result[formattedCurrency];
  }

  static async getNativeBalance(address: string, rpcUrl: string) {
    const ethQuery = new EthQuery(rpcUrl);
    const _balance = await ethQuery.getBalance(address);
    if (_balance) {
      const _bigNumber = BigNumber(_balance, 16).div(BIG_NUMBER.TEN_POW_18);
      return { raw: _balance, bigNumber: _bigNumber };
    }
    return null;
  }

  static async getNormalBalance(address: string, tokenAddress: string, rpcUrl: string) {
    const contract = new Contract(tokenAddress, JSON.stringify(StandardTokenAbi), rpcUrl);
    const _balance: string = await contract.viewFunction('balanceOf', [address]);
    const _decimal: string = await contract.viewFunction('decimals');
    if (_balance && _decimal) {
      const _bigNumber = BigNumber(_balance).div(BIG_NUMBER.TEN.pow(_decimal));
      return { raw: _balance, bigNumber: _bigNumber };
    }
    return null;
  }

  static async getBalance(address: string, tokenAddress: string, rpcUrl: string) {
    if (tokenAddress.length === 0) return await TokenBalance.getNativeBalance(address, rpcUrl);
    else return await TokenBalance.getNormalBalance(address, tokenAddress, rpcUrl);
  }

  static async getBalanceAndPrice(
    address: string,
    tokenAddress: string,
    tokenSymbol: string,
    rpcUrl: string
  ) {
    const balance = await TokenBalance.getBalance(address, tokenAddress, rpcUrl);
    const usdPrice = await TokenBalance.getTokenPrice(tokenSymbol);
    if (balance) {
      const _usd = Number(balance.bigNumber.toString()) * usdPrice;
      return { balance, usdPrice, usd: _usd.toString() };
    } else return null;
  }
}
