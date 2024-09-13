import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';
import AptosWalletProvider from './aptos-connection/AptosWalletContext';
import RpcProviderProvider from './wagmi-connection/rpc-provider-context';
import { wagmiConfig } from './wagmi-connection/wallet-action';
import WalletEffect from './wagmi-connection/wallet-effect';

interface Props {
  children: ReactNode;
}

export default function WalletConnection({ children }: Props) {
  const queryClient = new QueryClient();

  return (
    <AptosWalletProvider>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RpcProviderProvider>
            <WalletEffect />
            {children}
          </RpcProviderProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </AptosWalletProvider>
  );
}
