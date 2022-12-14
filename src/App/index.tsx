import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { SnackbarKey, SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import ThemeWrapper from 'src/components/Wrapper/ThemeWrapper';
import store from 'src/redux/store';
import RouteApp from './RouteApp/RouteApp';
import LayoutWrapper from 'src/components/Wrapper/LayoutWrapper';
import MyWalletRouteApp from './RouteApp/MyWalletRouteApp';
import MyWalletWrapper from 'src/components/Wrapper/MyWalletWrapper';

function WrapperApp() {
  const location = useLocation();
  const isWallet = location.pathname.includes('/my-wallet');

  return isWallet ? (
    <MyWalletWrapper>
      <MyWalletRouteApp />
      <RouteApp />
    </MyWalletWrapper>
  ) : (
    <LayoutWrapper>
      <MyWalletRouteApp />
      <RouteApp />
    </LayoutWrapper>
  );
}

export default function App() {
  const notistackRef = React.createRef<SnackbarProvider>();
  const onClickDismiss = (key: SnackbarKey) => () => {
    notistackRef?.current?.closeSnackbar(key);
  };

  return (
    <Provider store={store}>
      <Router>
        <SnackbarProvider
          maxSnack={3}
          ref={notistackRef}
          preventDuplicate
          action={(key) => (
            <IconButton size="small" color="inherit" onClick={onClickDismiss(key)}>
              <CloseIcon style={{ cursor: 'pointer' }} />
            </IconButton>
          )}
        >
          <ThemeWrapper>
            <WrapperApp />
          </ThemeWrapper>
        </SnackbarProvider>
      </Router>
    </Provider>
  );
}
