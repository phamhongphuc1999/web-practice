import { useCurrentAccount } from '@mysten/dapp-kit';
import { suiNetworkConfig } from 'src/configs/network-config';

export function useSuiWeb3() {
  const account = useCurrentAccount();
  const network = suiNetworkConfig.useNetworkConfig();

  return {
    address: account?.address,
    account: account,
    network,
  };
}

export const useNetworkConfig = suiNetworkConfig.useNetworkConfig;
export const useNetworkVariable = suiNetworkConfig.useNetworkVariable;
export const useNetworkVariables = suiNetworkConfig.useNetworkVariables;
