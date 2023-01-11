/* eslint-disable @typescript-eslint/no-explicit-any */
import type detectEthereumProvider from '@metamask/detect-provider';
import { Provider } from '@web3-react/types';
import { Dispatch } from 'redux';
import { enqueueSnackbarFunc } from 'src/global';
import { errorNotify } from 'src/hooks/useNotify';

type MetaMaskProvider = Provider & {
  isMetaMask?: boolean;
  isConnected?: () => boolean;
  providers?: MetaMaskProvider[];
};

export default class MetamaskConnector {
  public provider?: MetaMaskProvider;
  dispatch: Dispatch;
  enqueueSnackbar: enqueueSnackbarFunc;
  private eagerConnection?: Promise<void>;
  options?: Parameters<typeof detectEthereumProvider>[0];

  constructor(dispatch: Dispatch, enqueueSnackbar: enqueueSnackbarFunc) {
    this.dispatch = dispatch;
    this.enqueueSnackbar = enqueueSnackbar;
  }

  private async initialize() {
    if (this.eagerConnection) return this.eagerConnection;
    return (this.eagerConnection = import('@metamask/detect-provider').then(async (m) => {
      const provider = await m.default(this.options);
      if (provider) {
        this.provider = provider as MetaMaskProvider;
        this.provider.on('connect', this.handleConnect);
        this.provider.on('disconnect', this.handleDisconnect);
        this.provider.on('chainChanged', this.handleChainChange);
        this.provider.on('accountsChanged', this.handleAccountChange);
      }
    }));
  }

  private handleConnect() {
    console.debug('metamask connected');
  }

  private handleDisconnect() {
    console.debug('metamask disconnected');
  }

  private handleChainChange(chainId: string) {
    console.debug('metamask change chain: ', chainId);
  }

  private handleAccountChange(accounts: string[]) {
    console.debug('metamask change account: ', accounts);
  }

  async activate(targetChainId: string) {
    await this.initialize();
    if (!this.provider) {
      errorNotify(this.enqueueSnackbar, 'Metamask is not installed');
      return;
    }
    const chainId = await (this.provider.request({ method: 'eth_chainId' }) as Promise<string>);
    const receiveChainId = parseInt(chainId);
    if (!targetChainId || receiveChainId === parseInt(targetChainId)) return;
    const desiredChainIdHex = `0x${Number(targetChainId).toString(16)}`;
    try {
      await this.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: desiredChainIdHex }],
      });
      return true;
    } catch (error: any) {
      //
    }
  }

  async deactivate() {
    this.provider?.removeListener('connect', this.handleConnect);
    this.provider?.removeListener('disconnect', this.handleDisconnect);
    this.provider?.removeListener('chainChanged', this.handleChainChange);
    this.provider?.removeListener('accountsChanged', this.handleAccountChange);
    this.provider = undefined;
    this.eagerConnection = undefined;
  }
}
