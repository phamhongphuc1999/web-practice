import { RouteComponentProps } from 'react-router-dom';
import { ROUTE, WALLET_LS } from 'src/configs/constance';
import { updateStatus } from 'src/redux/my-wallet/myWalletSlice';
import { updateAccounts, updateCurrentNetwork, updateTokens } from 'src/redux/my-wallet/myWalletStateSlice';
import { AppDispatch } from 'src/redux/store';
import { actionController, setActionController } from './background';

export function backToInitWallet(dispatch: AppDispatch, history: Pick<RouteComponentProps, 'history'>) {
  dispatch(updateStatus('init'));
  const _check =
    history.history.location.pathname.includes('/my-wallet-utils') ||
    history.history.location.pathname.includes('/my-wallet-setting');
  if (!_check) history.history.push(ROUTE.WALLET_OVERVIEW);
}

export async function initWallet(
  password: string | undefined,
  dispatch: AppDispatch,
  history: Pick<RouteComponentProps, 'history'>
) {
  if (!actionController) setActionController();
  if (actionController) {
    const _network = actionController.networkController.currentNetwork;
    dispatch(updateCurrentNetwork(_network));
    const seedPhrase = localStorage.getItem(WALLET_LS.SEED);
    if (!seedPhrase || !password) backToInitWallet(dispatch, history);
    else {
      dispatch(updateStatus('login'));
      const vaults = await actionController.createNewVaultAndRestore(password, seedPhrase);
      const _accounts = vaults.keyrings[0].accounts;
      dispatch(updateAccounts({ accounts: _accounts }));
      const tokens = actionController.networkController.tokenController.getTokens();
      dispatch(updateTokens(tokens));
    }
  } else backToInitWallet(dispatch, history);
}
