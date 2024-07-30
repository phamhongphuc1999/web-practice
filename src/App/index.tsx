import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { SnackbarKey, SnackbarProvider } from 'notistack';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import DocsWrapper from 'src/components/Wrapper/DocsWrapper';
import LayoutWrapper from 'src/components/Wrapper/LayoutWrapper';
import ThemeWrapper from 'src/components/Wrapper/ThemeWrapper';
import useLayout from 'src/hooks/useLayout';
import store from 'src/redux/store';
import AptosWrapper from 'src/wallet-connection/aptos-connection/aptos-wrapper';
import DocsRouteApp from './DocsRouteApp';
import RouteApp from './RouteApp';

function WrapperApp() {
  const layout = useLayout();

  return (
    <AptosWrapper>
      {layout == 'normal' && (
        <LayoutWrapper>
          <RouteApp />
        </LayoutWrapper>
      )}
      {layout == 'docs' && (
        <DocsWrapper>
          <DocsRouteApp />
        </DocsWrapper>
      )}
    </AptosWrapper>
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
