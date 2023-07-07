import { BNB, CHAIN_ALIASES, ETH } from './networkConfig';
import BscImage from 'src/assets/images/BSC.svg';
import EthImage from 'src/assets/images/ETH.png';
import { BaseChain } from 'src/global';
import { NETWORK_TYPES } from 'src/blockchain-interaction/type';

export interface MyWalletChain extends BaseChain {
  chainId: string;
  provider: {
    type: string;
    rpcUrl: string;
  };
}

export interface MyWalletChainType {
  [chain: string]: MyWalletChain;
}

export const INFURA_PROVIDER_TYPES = [
  NETWORK_TYPES.MAINNET,
  NETWORK_TYPES.GOERLI,
  NETWORK_TYPES.SEPOLIA,
];

export const NetworkConfigOptions: MyWalletChainType = {
  [CHAIN_ALIASES.ETH_MAINNET]: {
    name: 'Eth Mainnet',
    isMainnet: true,
    translate: 'ETH',
    chainId: CHAIN_ALIASES.ETH_MAINNET.toString(),
    image: EthImage,
    nativeCurrency: ETH,
    provider: {
      type: NETWORK_TYPES.RPC,
      rpcUrl: 'https://nd-867-350-180.p2pify.com/783c7718e05463aa0828656842db85a7',
    },
  },
  [CHAIN_ALIASES.BSC_MAINNET]: {
    name: 'BSC Mainnet',
    isMainnet: true,
    translate: 'BSC',
    chainId: CHAIN_ALIASES.BSC_MAINNET.toString(),
    image: BscImage,
    nativeCurrency: BNB,
    provider: { type: NETWORK_TYPES.RPC, rpcUrl: 'https://bsc-dataseed.binance.org' },
  },
  [CHAIN_ALIASES.BSC_TESTNET]: {
    name: 'BSC Testnet',
    isMainnet: false,
    translate: 'BSC',
    chainId: CHAIN_ALIASES.BSC_TESTNET.toString(),
    image: BscImage,
    nativeCurrency: BNB,
    provider: {
      type: NETWORK_TYPES.RPC,
      rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    },
  },
};
