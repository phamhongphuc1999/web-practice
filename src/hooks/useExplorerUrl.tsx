import { useMemo } from 'react';
import { CHAIN_ALIASES } from 'src/configs/networkConfig';

export interface ConfigType {
  chainId: number;
  type?: 'address' | 'transaction';
  isBaseLink?: boolean;
}

const exploreConfig = {
  [CHAIN_ALIASES.BSC_MAINNET]: {
    address: 'https://bscscan.com/address',
    transaction: 'https://bscscan.com/tx',
    label: 'bscscan',
  },
  [CHAIN_ALIASES.FTM_MAINNET]: {
    address: 'https://ftmscan.com/address',
    transaction: 'https://ftmscan.com/tx',
    label: 'ftmscan',
  },
  [CHAIN_ALIASES.ETH_MAINNET]: {
    address: 'https://etherscan.io/address',
    transaction: 'https://etherscan.io/tx',
    label: 'etherscan',
  },
  [CHAIN_ALIASES.BSC_TESTNET]: {
    address: 'https://testnet.bscscan.com/address',
    transaction: 'https://testnet.bscscan.com/tx',
    label: 'bsctestscan',
  },
};

export default function useExplorerUrl(hash: string, config: ConfigType) {
  const { chainId, type = 'address', isBaseLink = false } = config;

  return useMemo(() => {
    if (exploreConfig[chainId]) {
      const _config = exploreConfig[chainId];
      if (isBaseLink) return { link: `${_config[type]}`, text: _config.label };
      return { link: `${_config[type]}/${hash}`, text: _config.label };
    } else return { link: '', text: '' };
  }, [hash, chainId, type]);
}
