import { WALLET_LS } from 'src/configs/constance';
import { EthToken } from 'src/global';

export default class StorageController {
  static saveSeedPhrase(seedPhrase: string) {
    localStorage.setItem(WALLET_LS.SEED, seedPhrase);
  }

  static getSeedPhrase() {
    return localStorage.getItem(WALLET_LS.SEED);
  }

  static saveChainId(chainId: string) {
    localStorage.setItem(WALLET_LS.CHAIN_ID, chainId);
  }

  static getChainId() {
    return localStorage.getItem(WALLET_LS.CHAIN_ID);
  }

  static saveTokens(tokens: EthToken[]) {
    const chainId = StorageController.getChainId();
    const _key = `${WALLET_LS.TOKEN}_${chainId}`;
    localStorage.setItem(_key, JSON.stringify(tokens));
  }

  static getTokens() {
    const chainId = StorageController.getChainId();
    const _key = `${WALLET_LS.TOKEN}_${chainId}`;
    const sTokens = localStorage.getItem(_key);
    if (sTokens) return JSON.parse(sTokens);
    else return null;
  }
}
