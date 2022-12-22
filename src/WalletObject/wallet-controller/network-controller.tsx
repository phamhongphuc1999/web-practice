import { PollingBlockTracker } from 'eth-block-tracker';
import { providerFromEngine, SafeEventEmitterProvider } from 'eth-json-rpc-middleware';
import { JsonRpcEngine } from 'json-rpc-engine';
import { CHAIN_ALIASES } from 'src/configs/networkConfig';
import {
  INFURA_PROVIDER_TYPES,
  MyWalletChain,
  NetworkConfigOptions,
  NETWORK_TYPES,
} from 'src/configs/wallet-network-config';
import createJsonRpcClient from '../CreateClient/createJsonRpcClient';
import createMyWalletMiddleware from '../CreateClient/createMyWalletMiddleware';
import { MiddlewareParam, NetworkOptionType, StandardClientMiddleware } from '../wallet';

export class NetworkController {
  options: NetworkOptionType | undefined;
  currentNetwork: MyWalletChain;
  private _baseProviderParams: MiddlewareParam | undefined;
  private _infuraProjectId: string;
  private _provider: SafeEventEmitterProvider | undefined;
  private _blockTracker: PollingBlockTracker | undefined;

  constructor(options?: NetworkOptionType) {
    this.options = options;
    this.currentNetwork = this.options?.currentNetwork
      ? this.options.currentNetwork
      : NetworkConfigOptions[CHAIN_ALIASES.ETH_MAINNET];
    this._infuraProjectId = '';
  }

  initializeProvider(providerParams: MiddlewareParam) {
    this._baseProviderParams = providerParams;
    const { chainId, provider } = this.currentNetwork;
    const { type, rpcUrl } = provider;
    this._configureProvider(type, rpcUrl, chainId);
  }

  setInfuraProjectId(projectId: string) {
    this._infuraProjectId = projectId;
  }

  private _configureProvider(type: string, rpcUrl: string, chainId: number) {
    const isInfura = INFURA_PROVIDER_TYPES.includes(type);
    if (isInfura) this._configureInfuraProvider(type, this._infuraProjectId);
    else if (type === NETWORK_TYPES.RPC) this._configureStandardProvider(rpcUrl, chainId);
    else throw new Error(`NetworkController - _configureProvider - unknown type "${type}"`);
  }

  private _configureInfuraProvider(type: string, infuraProjectId: string) {
    console.warn(type, infuraProjectId);
  }
  private _configureStandardProvider(rpcUrl: string, chainId: number) {
    const networkClient = createJsonRpcClient(rpcUrl, chainId);
    this._setNetworkClient(networkClient);
  }

  private _setNetworkClient(networkMiddleware: StandardClientMiddleware) {
    if (this._baseProviderParams) {
      const _walletMiddleware = createMyWalletMiddleware(this._baseProviderParams);
      const engine = new JsonRpcEngine();
      engine.push(_walletMiddleware);
      engine.push(networkMiddleware.networkMiddleware);
      const _provider = providerFromEngine(engine);
      this._setProviderAndBlockTracker(_provider, networkMiddleware.blockTracker);
    }
  }

  private _setProviderAndBlockTracker(provider: SafeEventEmitterProvider, blockTracker: PollingBlockTracker) {
    this._provider = provider;
    this._blockTracker = blockTracker;
  }
}
