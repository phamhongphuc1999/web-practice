import {
  AccountAddressInput,
  Aptos,
  AptosConfig,
  Ed25519PublicKey,
  InputEntryFunctionData,
  InputViewFunctionData,
  Network,
  SimpleTransaction,
} from '@aptos-labs/ts-sdk';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { createContext, ReactNode, useCallback, useContext, useMemo } from 'react';
import { MAINNET_NODE_URL, TESTNET_NODE_URL } from 'src/configs/constance';

async function _view(aptos: Aptos, payload: InputViewFunctionData) {
  return await aptos.view({ payload });
}

async function _build(aptos: Aptos, sender: AccountAddressInput, data: InputEntryFunctionData) {
  const transaction = await aptos.transaction.build.simple({ sender, data });
  return transaction;
}

async function _simulate(
  aptos: Aptos,
  publicKey: Ed25519PublicKey,
  transaction: SimpleTransaction
) {
  const response = await aptos.transaction.simulate.simple({
    signerPublicKey: publicKey,
    transaction,
  });
  return response;
}

type RunType = { sender?: AccountAddressInput; payload: InputEntryFunctionData };

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

  const view = useCallback(
    async (payload: InputViewFunctionData) => {
      if (aptos) await _view(aptos, payload);
    },
    [aptos]
  );

  const send = useCallback(
    async (params: RunType) => {
      if (aptos) {
        const { payload } = params;
        const realSender = account?.address;
        if (realSender) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const rawTxn = _build(aptos, realSender, payload);
          const pendingTransaction = await signAndSubmitTransaction({ data: payload });
          const response = await aptos.waitForTransaction({
            transactionHash: pendingTransaction.hash,
          });
          return response;
        }
      }
    },
    [account?.address]
  );

  const contextData = useMemo<AptosWalletContextProps>(() => {
    return { accountAddress: account?.address ?? '', config, aptos, fn: { view, send } };
  }, [config, aptos, account?.address, view, send]);

  return <AptosWalletContext.Provider value={contextData}>{children}</AptosWalletContext.Provider>;
}

export function useAptosWalletContext() {
  return useContext(AptosWalletContext);
}
