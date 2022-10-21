import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { SnackbarKey, SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeWrapper from 'src/components/Wrapper/ThemeWrapper';
import store from 'src/reduxs/store';
import RouteApp from './RouteApp';
import LayoutWrapper from 'src/components/Wrapper/LayoutWrapper';

export default function App() {
  const notistackRef = React.createRef<SnackbarProvider>();
  const onClickDismiss = (key: SnackbarKey) => () => {
    notistackRef?.current?.closeSnackbar(key);
  };

  return (
    <Provider store={store}>
      <Router>
        <ThemeWrapper>
          <LayoutWrapper>
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
              <RouteApp />
            </SnackbarProvider>
          </LayoutWrapper>
        </ThemeWrapper>
      </Router>
    </Provider>
  );
}
