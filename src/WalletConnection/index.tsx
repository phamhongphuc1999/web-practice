import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';
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
        <RpcProviderProvider>
          <WalletEffect />
          {children}
        </RpcProviderProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
