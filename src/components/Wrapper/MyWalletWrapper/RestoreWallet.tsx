import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTE, WALLET_LS } from 'src/configs/constance';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { updateStatus } from 'src/redux/my-wallet/myWalletSlice';
import { updateAccounts, updateCurrentNetwork, updateTokens } from 'src/redux/my-wallet/myWalletStateSlice';
import { actionController, setActionController } from 'src/WalletObject/background';

export default function RestoreWallet() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { password } = useAppSelector((state) => state.myWalletSlice);

  function _backToInitWallet() {
    dispatch(updateStatus('init'));
    const _check =
      history.location.pathname.includes('/my-wallet-utils') ||
      history.location.pathname.includes('/my-wallet-setting');
    if (!_check) history.push(ROUTE.WALLET_OVERVIEW);
  }

  async function _initWallet() {
    if (!actionController) setActionController();
    if (actionController) {
      const _network = actionController.networkController.currentNetwork;
      dispatch(updateCurrentNetwork(_network));
      const seedPhrase = localStorage.getItem(WALLET_LS.SEED);
      if (!seedPhrase || !password) _backToInitWallet();
      else {
        dispatch(updateStatus('login'));
        const vaults = await actionController.createNewVaultAndRestore(password, seedPhrase);
        const _accounts = vaults.keyrings[0].accounts;
        dispatch(updateAccounts({ accounts: _accounts }));
        const tokens = actionController.networkController.tokenController.getTokens();
        dispatch(updateTokens(tokens));
      }
    } else _backToInitWallet();
  }

  useEffect(() => {
    _initWallet();
  }, []);

  return <></>;
}
