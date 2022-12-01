import BscImage from 'src/assets/images/BSC.svg';
import FtmImage from 'src/assets/images/FTM.svg';
import EthImage from 'src/assets/images/ETH.png';
import { ChainType, NativeToken } from 'src/global';

const ETH: NativeToken = {
  name: 'Ethereum',
  symbol: 'ETH',
  decimals: 18,
};

const BNB: NativeToken = {
  name: 'BNB',
  symbol: 'BNB',
  decimals: 18,
};

const FTM: NativeToken = {
  name: 'Fantom',
  symbol: 'FTM',
  decimals: 18,
};

export const CONNECTOR = {
  METAMASK: 'metamask',
  WALLET_CONNECT: 'walletconnect',
};

export const CHAIN_ALIASES = {
  BSC_MAINNET: 56,
  FTM_MAINNET: 250,
  ETH_MAINNET: 1,
  BSC_TESTNET: 97,
  FTM_TESTNET: 4002,
  ETH_TESTNET: 42,
};

export const CHAINS: ChainType = {
  [CHAIN_ALIASES.BSC_MAINNET]: {
    name: 'BSC Mainnet',
    image: BscImage,
    blockExplorerUrls: ['https://bscscan.com'],
    nativeCurrency: BNB,
    urls: [
      'https://bsc-dataseed.binance.org',
      'https://bsc-dataseed1.binance.org',
      'https://bsc-dataseed1.defibit.io',
      'https://bsc-dataseed2.defibit.io',
      'https://bsc-dataseed1.ninicoin.io',
      'https://bsc-dataseed2.ninicoin.io',
    ],
  },
  [CHAIN_ALIASES.FTM_MAINNET]: {
    name: 'FTM Mainnet',
    image: FtmImage,
    blockExplorerUrls: ['https://ftmscan.com/'],
    nativeCurrency: FTM,
    urls: ['https://rpc.ftm.tools'],
  },
  [CHAIN_ALIASES.ETH_MAINNET]: {
    name: 'ETH Mainnet',
    image: EthImage,
    blockExplorerUrls: ['https://etherscan.io'],
    nativeCurrency: ETH,
    urls: ['https://nd-867-350-180.p2pify.com/783c7718e05463aa0828656842db85a7'],
  },
  [CHAIN_ALIASES.BSC_TESTNET]: {
    name: 'BSC Testnet',
    image: BscImage,
    blockExplorerUrls: ['https://testnet.bscscan.com'],
    nativeCurrency: BNB,
    urls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
  },
  [CHAIN_ALIASES.FTM_TESTNET]: {
    name: 'FTM Testnet',
    image: FtmImage,
    blockExplorerUrls: ['https://testnet.ftmscan.com/'],
    nativeCurrency: FTM,
    urls: ['https://rpc.testnet.fantom.network/'],
  },
  [CHAIN_ALIASES.ETH_TESTNET]: {
    name: 'ETH Testnet',
    image: EthImage,
    blockExplorerUrls: ['https://kovan.etherscan.io'],
    nativeCurrency: ETH,
    urls: ['https://speedy-nodes-nyc.moralis.io/d2dfc8ceacff189f78fa56d6/eth/kovan'],
  },
};
