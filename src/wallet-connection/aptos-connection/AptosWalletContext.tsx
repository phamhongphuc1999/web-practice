import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { createContext, ReactNode, useContext, useMemo } from 'react';
import { MAINNET_NODE_URL, TESTNET_NODE_URL } from 'src/configs/constance';

interface AptosWalletContextProps {
  accountAddress: string;
  config: AptosConfig | undefined;
  aptos: Aptos | undefined;
}

const AptosWalletContext = createContext<AptosWalletContextProps>({
  accountAddress: '',
  config: undefined,
  aptos: undefined,
});

interface Props {
  children: ReactNode;
}

export default function AptosWalletProvider({ children }: Props) {
  const { network, account } = useWallet();

  const { config, aptos } = useMemo(() => {
    if (network) {
      const rpcUrl = network.name == Network.MAINNET ? MAINNET_NODE_URL : TESTNET_NODE_URL;
      const config = new AptosConfig({ network: network.name, fullnode: rpcUrl });
      const aptos = new Aptos(config);
      return { config, aptos };
    }
    return { config: undefined, aptos: undefined };
  }, [network]);

  const contextData = useMemo<AptosWalletContextProps>(() => {
    return { accountAddress: account?.address ?? '', config, aptos };
  }, [config, aptos, account?.address]);

  return <AptosWalletContext.Provider value={contextData}>{children}</AptosWalletContext.Provider>;
}

export function useAptosWalletContext() {
  return useContext(AptosWalletContext);
}
