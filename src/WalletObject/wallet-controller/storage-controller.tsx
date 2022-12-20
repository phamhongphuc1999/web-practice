import { WALLET_LS } from 'src/configs/constance';

export class StorageController {
  saveSeedPhrase(seedPhrase: string) {
    localStorage.setItem(WALLET_LS.SEED, seedPhrase);
  }

  getSeedPhrase() {
    return localStorage.getItem(WALLET_LS.SEED);
  }
}
