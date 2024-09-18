/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Aptos,
  AptosConfig,
  CommittedTransactionResponse,
  MoveValue,
  Network,
} from '@aptos-labs/ts-sdk';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { createContext, ReactNode, useCallback, useContext, useMemo } from 'react';
import { MAINNET_NODE_URL, TESTNET_NODE_URL } from 'src/configs/constance';
import { AptosMoveIdType, AptosRunDataType, AptosViewDataType } from 'src/global';
import { accountResource, contractRun, contractView } from './utils';

interface AptosWalletContextProps {
  accountAddress: string;
  config: AptosConfig | undefined;
  aptos: Aptos | undefined;
  fn: {
    view: <T = Array<MoveValue>>(payload: AptosViewDataType) => Promise<T | undefined>;
    send: (payload: AptosRunDataType) => Promise<CommittedTransactionResponse | undefined>;
    getAccountResource: <T = unknown>(
      data: AptosMoveIdType & {
        accountAddress?: undefined;
      }
    ) => Promise<T | undefined>;
  };
}

const AptosWalletContext = createContext<AptosWalletContextProps>({
  accountAddress: '',
  config: undefined,
  aptos: undefined,
  fn: {
    view: async () => {
      return undefined;
    },
    send: async () => {
      return undefined;
    },
    getAccountResource: async () => {
      return undefined;
    },
  },
});

interface Props {
  children: ReactNode;
}

export default function AptosWalletProvider({ children }: Props) {
  const { network, account, signAndSubmitTransaction } = useWallet();

  const { config, aptos } = useMemo(() => {
    if (network) {
      const rpcUrl = network.name == Network.MAINNET ? MAINNET_NODE_URL : TESTNET_NODE_URL;
      const config = new AptosConfig({ network: network.name, fullnode: rpcUrl });
      const aptos = new Aptos(config);
      return { config, aptos };
    }
    return { config: undefined, aptos: undefined };
  }, [network]);

  const getAccountResource = useCallback(
    async <T = unknown,>(data: AptosMoveIdType & { accountAddress?: undefined }) => {
      const realAccountAddress = data.accountAddress ?? account?.address;
      if (aptos && realAccountAddress) return accountResource<T>(aptos, realAccountAddress, data);
    },
    [aptos, account?.address]
  );

  const view = useCallback(
    async <T = Array<MoveValue>,>(payload: AptosViewDataType) => {
      if (aptos) return contractView<T>(aptos, payload);
    },
    [aptos]
  );

  const send = useCallback(
    async (payload: AptosRunDataType) => {
      const realSender = account?.address;
      if (aptos && realSender) {
        return contractRun(aptos, payload, realSender, signAndSubmitTransaction);
      }
    },
    [account?.address, aptos]
  );

  const contextData = useMemo<AptosWalletContextProps>(() => {
    return {
      accountAddress: account?.address ?? '',
      config,
      aptos,
      fn: { view, send, getAccountResource },
    };
  }, [config, aptos, account?.address, view, send, getAccountResource]);

  return <AptosWalletContext.Provider value={contextData}>{children}</AptosWalletContext.Provider>;
}

export function useAptosWalletContext() {
  return useContext(AptosWalletContext);
}
