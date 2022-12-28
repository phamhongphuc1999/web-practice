import { Box, Theme, useTheme } from '@mui/material';
import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ScrollToTop from 'src/components/ScrollToTop';
import { ROUTE, WALLET_LS } from 'src/configs/constance';
import { useAppSelector } from 'src/redux/hook';
import { updateStatus } from 'src/redux/my-wallet/myWalletSlice';
import { updateCurrentNetwork } from 'src/redux/my-wallet/myWalletStateSlice';
import { actionController, setActionController } from 'src/WalletObject/background';
import Header from './Header';

const useStyle = (theme: Theme) => ({
  container: {
    transition: 'margin 0.5s linear',
    padding: theme.spacing(10, 2, 10, 2),
  },
  mainContainer: {
    minHeight: 'calc(100vh - 80px)',
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 1),
    },
    [theme.breakpoints.only('sm')]: {
      marginLeft: '80px',
    },
    [theme.breakpoints.only('xs')]: {
      marginLeft: 0,
    },
  },
});

interface Props {
  children: ReactNode;
}

export default function MyWalletWrapper({ children }: Props) {
  const theme = useTheme();
  const cls = useStyle(theme);
  const dispatch = useDispatch();
  const history = useHistory();
  const { password } = useAppSelector((state) => state.myWalletSlice);

  function _backToInitWallet() {
    dispatch(updateStatus('init'));
    const _check =
      history.location.pathname.includes('/my-wallet-utils') ||
      history.location.pathname.includes('/my-wallet-setting');
    if (!_check) history.push(ROUTE.WALLET_OVERVIEW);
  }

  function _initWallet() {
    if (!actionController) setActionController();
    if (actionController) {
      const _network = actionController.networkController.currentNetwork;
      dispatch(updateCurrentNetwork(_network));
      const seedPhrase = localStorage.getItem(WALLET_LS.SEED);
      if (!seedPhrase || !password) _backToInitWallet();
      else {
        dispatch(updateStatus('login'));
        actionController.createNewVaultAndRestore(password, seedPhrase);
      }
    } else _backToInitWallet();
  }

  useEffect(() => {
    _initWallet();
  }, []);

  return (
    <Box position="relative" sx={{ backgroundColor: theme.palette.background.primary }}>
      <Header />
      <Box sx={cls.container}>
        <Box display="flex" justifyContent="space-between" flexDirection="column" sx={cls.mainContainer}>
          <Box>{children}</Box>
        </Box>
      </Box>
      <ScrollToTop />
    </Box>
  );
}
