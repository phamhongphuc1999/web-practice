import {
  ExploreConfigProps,
  ExplorerConfigType,
  useExplorerUrl,
} from '@peter-present/react-hook-utils';

const aptosExplorerConfig: { [chainId: string]: ExplorerConfigType } = {
  '1_mainnet': {
    address: 'https://explorer.aptoslabs.com/account/%{hash}?network=mainnet',
    transaction: 'https://explorer.aptoslabs.com/txn/%{hash}?network=mainnet',
    baseUrl: 'https://explorer.aptoslabs.com/?network=mainnet',
    label: 'aptosmainnet',
  },
  '2_testnet': {
    address: 'https://explorer.aptoslabs.com/account/%{hash}?network=testnet',
    transaction: 'https://explorer.aptoslabs.com/txn/%{hash}?network=testnet',
    baseUrl: 'https://explorer.aptoslabs.com/?network=testnet',
    label: 'aptostestnet',
  },
  '148_devnet': {
    address: 'https://explorer.aptoslabs.com/account/%{hash}?network=devnet',
    transaction: 'https://explorer.aptoslabs.com/txn/%{hash}?network=devnet',
    baseUrl: 'https://explorer.aptoslabs.com/?network=devnet',
    label: 'aptosdevnet',
  },
};

export default function useExtendExploreUrl(hash: string | undefined, config: ExploreConfigProps) {
  const { link, text } = useExplorerUrl(hash, { ...config, exploreConfig: aptosExplorerConfig });
  return { link, text };
}
