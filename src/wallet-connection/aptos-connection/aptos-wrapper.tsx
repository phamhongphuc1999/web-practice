import { Network } from '@aptos-labs/ts-sdk';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { BitgetWallet } from '@bitget-wallet/aptos-wallet-adapter';
import { MartianWallet } from '@martianwallet/aptos-wallet-adapter';
import { MSafeWalletAdapter } from '@msafe/aptos-wallet-adapter';
import { OKXWallet } from '@okwallet/aptos-wallet-adapter';
import { PontemWallet } from '@pontem/wallet-adapter-plugin';
import { BybitWallet } from 'bybit-plugin-wallet-adapter';
import { FewchaWallet } from 'fewcha-plugin-wallet-adapter';
import { PetraWallet } from 'petra-plugin-wallet-adapter';
import { PropsWithChildren } from 'react';

export default function AptosWrapper({ children }: PropsWithChildren) {
  const wallets = [
    new PetraWallet(),
    new OKXWallet(),
    new PontemWallet(),
    new BitgetWallet(),
    new MSafeWalletAdapter(),
    new BybitWallet(),
    new MartianWallet(),
    new FewchaWallet(),
  ];

  return (
    <AptosWalletAdapterProvider
      plugins={wallets}
      autoConnect={true}
      dappConfig={{ network: Network.MAINNET }}
      onError={(error) => {
        console.error(error);
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
}
