import { ExternalProvider } from '@ethersproject/providers';
import { CONNECTOR } from 'src/configs/networkConfig';
import { enqueueSnackbarFunc } from 'src/global';
import { AppDispatch } from 'src/redux/store';
import { resetWallet, updateWallet } from 'src/redux/walletSlice';
import {
  getChainId,
  getConnectedWallet,
  setChainId,
  setConnectedWallet,
  setWeb3Reader,
  setWeb3Sender,
} from '.';
import MetamaskConnector from './connectors/metamask-connector';

let _metamaskConnector: MetamaskConnector | undefined;

export async function connectMetamask(dispatch: AppDispatch, enqueueSnackbar: enqueueSnackbarFunc) {
  setConnectedWallet(CONNECTOR.METAMASK);
  if (!_metamaskConnector) _metamaskConnector = new MetamaskConnector(dispatch, enqueueSnackbar);
  const chainId = getChainId();
  await _metamaskConnector.activate(chainId.toString());
  setWeb3Sender(_metamaskConnector?.provider as ExternalProvider);
  const accounts = await (_metamaskConnector.provider?.request({
    method: 'eth_requestAccounts',
  }) as Promise<string[]>);
  dispatch(updateWallet({ chainId: chainId.toString(), accountAddress: accounts[0] }));
}

export function disconnect(dispatch: AppDispatch) {
  _metamaskConnector?.deactivate();
  dispatch(resetWallet());
}

export async function switchNetwork(
  dispatch: AppDispatch,
  enqueueSnackbar: enqueueSnackbarFunc,
  chainId: string
) {
  const wallet = getConnectedWallet();
  let isSwitchSuccess: boolean | undefined = true;
  if (wallet == CONNECTOR.METAMASK) {
    if (!_metamaskConnector) _metamaskConnector = new MetamaskConnector(dispatch, enqueueSnackbar);
    isSwitchSuccess = await _metamaskConnector.activate(chainId);
  }
  if (isSwitchSuccess) {
    setChainId(chainId);
    await setWeb3Reader(chainId);
    dispatch(updateWallet({ chainId }));
  }
  return isSwitchSuccess;
}
