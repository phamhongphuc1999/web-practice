import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { SnackbarKey, SnackbarProvider } from 'notistack';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import LayoutWrapper from 'src/components/Wrapper/LayoutWrapper';
import MyWalletWrapper from 'src/components/Wrapper/MyWalletWrapper';
import ThemeWrapper from 'src/components/Wrapper/ThemeWrapper';
import store from 'src/redux/store';
import RouteApp from './RouteApp';

function WrapperApp() {
  const location = useLocation();
  const isWallet = location.pathname.includes('/my-wallet');

  return isWallet ? (
    <MyWalletWrapper>
      <RouteApp />
    </MyWalletWrapper>
  ) : (
    <LayoutWrapper>
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
