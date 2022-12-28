import { CHAIN_ALIASES } from 'src/configs/networkConfig';
import {
  INFURA_PROVIDER_TYPES,
  MyWalletChain,
  MyWalletChainType,
  NetworkConfigOptions,
  NETWORK_TYPES,
} from 'src/configs/wallet-network-config';
import { EthQuery } from 'src/blockchain-interaction/eth-query';
import { NetworkOptionType } from '../wallet';
import { StorageController } from './storage-controller';

export class NetworkController {
  options: NetworkOptionType | undefined;
  networkConfig: MyWalletChainType;
  currentNetwork: MyWalletChain;
  private _infuraProjectId: string;
  private _provider: EthQuery | undefined;

  constructor(options?: NetworkOptionType) {
    this.options = options;
    this.networkConfig = NetworkConfigOptions;
    if (options?.currentNetwork) {
      if (typeof options.currentNetwork == 'string') {
        const _networkConfig = NetworkConfigOptions[options.currentNetwork];
        if (_networkConfig) this.currentNetwork = _networkConfig;
        else this.currentNetwork = NetworkConfigOptions[CHAIN_ALIASES.ETH_MAINNET];
      } else this.currentNetwork = options.currentNetwork;
    } else this.currentNetwork = NetworkConfigOptions[CHAIN_ALIASES.ETH_MAINNET];
    this._infuraProjectId = '';
  }

  switchNetwork(chainId: string) {
    this.currentNetwork = NetworkConfigOptions[chainId];
    const { provider } = this.currentNetwork;
    this._configureProvider(provider.type, provider.rpcUrl);
    StorageController.saveChainId(chainId);
  }

  getProviderConfig() {
    const { chainId, provider } = this.currentNetwork;
    const { type, rpcUrl } = provider;
    return { chainId, type, rpcUrl };
  }

  initializeProvider() {
    const { type, rpcUrl, chainId } = this.getProviderConfig();
    this._configureProvider(type, rpcUrl);
    StorageController.saveChainId(chainId);
  }

  setInfuraProjectId(projectId: string) {
    this._infuraProjectId = projectId;
  }

  private _configureProvider(type: string, rpcUrl: string) {
    const isInfura = INFURA_PROVIDER_TYPES.includes(type);
    if (isInfura) this._configureInfuraProvider(type, this._infuraProjectId);
    else if (type === NETWORK_TYPES.RPC) this._configureStandardProvider(rpcUrl);
    else throw new Error(`NetworkController - _configureProvider - unknown type "${type}"`);
  }

  private _configureInfuraProvider(type: string, infuraProjectId: string) {
    console.warn(type, infuraProjectId);
  }
  private _configureStandardProvider(rpcUrl: string) {
    this._setNetworkClient(rpcUrl);
  }

  private _setNetworkClient(rpcUrl: string) {
    const ethQuery = new EthQuery(rpcUrl);
    this._setProviderAndBlockTracker(ethQuery);
  }

  private _setProviderAndBlockTracker(provider: EthQuery) {
    this._provider = provider;
  }
}
