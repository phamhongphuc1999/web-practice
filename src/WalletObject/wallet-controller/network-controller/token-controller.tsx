import { MyWalletChain } from 'src/configs/wallet-network-config';
import { EthToken } from 'src/global';

export default class TokenController {
  private tokens: EthToken[];

  constructor() {
    this.tokens = [];
  }

  updateTokens(currentNetwork: MyWalletChain) {
    this.tokens.push({ ...currentNetwork.nativeCurrency, address: '' });
  }

  getTokens() {
    return this.tokens;
  }

  importToken(token: EthToken) {
    const _token = this.tokens.find((item) => item.name === token.name);
    if (!_token) this.tokens.push(token);
  }
}
