import { ExternalProvider } from '@ethersproject/providers';
import { Dispatch } from 'redux';
import { CONNECTOR } from 'src/configs/networkConfig';
import { enqueueSnackbarFunc } from 'src/global';
import { resetWallet, updateWallet } from 'src/redux/walletSlice';
import { getChainId, setConnectedWallet, setWeb3Sender } from '.';
import MetamaskConnector from './connectors/metamask-connector';

let _metamaskConnector: MetamaskConnector | undefined;

export async function connectMetamask(dispatch: Dispatch, enqueueSnackbar: enqueueSnackbarFunc) {
  setConnectedWallet(CONNECTOR.METAMASK);
  if (!_metamaskConnector) _metamaskConnector = new MetamaskConnector(dispatch, enqueueSnackbar);
  const chainId = getChainId();
  await _metamaskConnector.activate(chainId.toString());
  setWeb3Sender(_metamaskConnector?.provider as ExternalProvider);
  const accounts = await (_metamaskConnector.provider?.request({ method: 'eth_requestAccounts' }) as Promise<string[]>);
  dispatch(updateWallet({ chainId: chainId.toString(), accountAddress: accounts[0] }));
}

export function disconnect(dispatch: Dispatch) {
  _metamaskConnector?.deactivate();
  dispatch(resetWallet());
}
