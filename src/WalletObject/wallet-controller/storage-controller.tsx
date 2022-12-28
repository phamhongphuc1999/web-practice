import { WALLET_LS } from 'src/configs/constance';

export class StorageController {
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
}
