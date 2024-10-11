/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserProvider } from 'ethers';
import { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { CHAINS } from 'src/configs/network-config';
import { resetConfig, setNetworkConfig } from 'src/redux/config-slice';
import { useAppDispatch } from 'src/redux/store';
import { resetUser } from 'src/redux/user-slice';
import { useAccount, useConnect } from 'wagmi';
import { useRpcProviderContext } from './rpc-provider-context';

export default function WalletEffect() {
  const dispatch = useAppDispatch();
  const account = useAccount();
  const { error } = useConnect();
  const { setReader, setSigner } = useRpcProviderContext();

  const _setReader = useCallback(
    async (chainId: number) => {
      const _config = CHAINS[chainId];
      await setReader(_config.urls);
    },
    [setReader]
  );

  const _updateAccount = useCallback(
    async (chainId: number) => {
      if (account.isConnected && account.connector?.getProvider) {
        if (typeof account.connector.getProvider == 'function') {
          await _setReader(chainId);
          const provider = new BrowserProvider((await account.connector.getProvider()) as any);
          setSigner(await provider.getSigner());
        }
      }
    },
    [account.isConnected, account.connector]
  );

  // switch chain event
  useEffect(() => {
    if (account.chainId && account.isConnected) {
      _updateAccount(account.chainId);
      dispatch(setNetworkConfig({ chainId: account.chainId }));
    }
  }, [account.chainId, account.isConnected, _updateAccount]);

  // disconnect
  useEffect(() => {
    if (account.isDisconnected) {
      dispatch(resetUser());
      dispatch(resetConfig());
    }
  }, [account.isDisconnected]);

  // detect errors
  useEffect(() => {
    if (error) {
      toast.error(error.message);
      console.error(error);
    }
  }, [error]);

  return <></>;
}
