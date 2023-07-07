import { MyWalletChain } from 'src/configs/wallet-network-config';
import { EthToken } from 'src/global';
import StorageController from '../storage-controller';

export default class TokenController {
  private tokens: EthToken[];

  constructor() {
    this.tokens = [];
  }

  initToken(currentNetwork?: MyWalletChain) {
    if (currentNetwork) {
      this.tokens = [];
      let localTokens = StorageController.getTokens() as EthToken[];
      if (!localTokens) localTokens = [];
      const _check = localTokens.find((token) => token.address === '');
      if (!_check)
        this.tokens.push({ ...currentNetwork.nativeCurrency, address: '', isNative: true });
      this.tokens = this.tokens.concat(localTokens);
    }
  }

  getTokens() {
    return this.tokens;
  }

  importToken(token: EthToken) {
    const _token = this.tokens.find((item) => item.name === token.name);
    if (!_token) {
      token.address = token.address.toLowerCase();
      this.tokens.push(token);
      StorageController.saveTokens(this.tokens);
    }
  }
}
