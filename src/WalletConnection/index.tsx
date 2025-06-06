import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { suiNetworkConfig } from 'src/configs/network-config';
import { WagmiProvider } from 'wagmi';
import AptosWrapper from './aptos-connection/aptos-wrapper';
import AptosWalletProvider from './aptos-connection/AptosWalletContext';
import RpcProviderProvider from './wagmi-connection/rpc-provider-context';
import { wagmiConfig } from './wagmi-connection/wallet-action';
import WalletEffect from './wagmi-connection/WalletEffect';

interface Props {
  children: ReactNode;
}

export default function WalletConnection({ children }: Props) {
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={suiNetworkConfig.networkConfig} defaultNetwork="localnet">
          <WalletProvider>
            <AptosWrapper>
              <AptosWalletProvider>
                <RpcProviderProvider>
                  <WalletEffect />
                  {children}
                </RpcProviderProvider>
              </AptosWalletProvider>
            </AptosWrapper>
          </WalletProvider>
        </SuiClientProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
