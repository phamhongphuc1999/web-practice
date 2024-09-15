import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DocsWrapper from 'src/components/Wrapper/DocsWrapper';
import LayoutWrapper from 'src/components/Wrapper/LayoutWrapper';
import ThemeWrapper from 'src/components/Wrapper/ThemeWrapper';
import useLayout from 'src/hooks/useLayout';
import store from 'src/redux/store';
import WalletConnection from 'src/wallet-connection';
import DocsRouteApp from './DocsRouteApp';
import RouteApp from './RouteApp';

function WrapperApp() {
  const layout = useLayout();

  return (
    <>
      {layout == 'normal' && (
        <WalletConnection>
          <LayoutWrapper>
            <RouteApp />
          </LayoutWrapper>
        </WalletConnection>
      )}
      {layout == 'docs' && (
        <DocsWrapper>
          <DocsRouteApp />
        </DocsWrapper>
      )}
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <ToastContainer
          autoClose={4000}
          theme="dark"
          hideProgressBar={false}
          position="top-center"
        />
        <ThemeWrapper>
          <WrapperApp />
        </ThemeWrapper>
      </Router>
    </Provider>
  );
}
