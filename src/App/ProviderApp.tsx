import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ScrollToTop from 'src/components/ScrollToTop';
import LayoutWrapper from 'src/components/Wrapper/LayoutWrapper';
import ThemeWrapper from 'src/components/Wrapper/ThemeWrapper';
import store from 'src/redux/store';
import WalletConnection from 'src/WalletConnection';

export default function ProviderApp() {
  return (
    <Provider store={store}>
      <ToastContainer autoClose={4000} theme="dark" hideProgressBar={false} position="top-center" />
      <ThemeWrapper>
        <WalletConnection>
          <LayoutWrapper>
            <Outlet />
            <ScrollToTop />
          </LayoutWrapper>
        </WalletConnection>
      </ThemeWrapper>
    </Provider>
  );
}
