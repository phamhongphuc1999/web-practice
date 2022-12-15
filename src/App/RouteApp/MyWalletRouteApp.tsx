import { Route, Switch } from 'react-router-dom';
import { ROUTE } from 'src/configs/constance';
import WalletOverview from 'src/Pages/MyWallet/WalletOverview';
import WalletUtils from 'src/Pages/MyWallet/WalletUtils';
import CreateMnemonic from 'src/Pages/MyWallet/WalletUtils/CreateMnemonic';

export default function MyWalletRouteApp() {
  return (
    <Switch>
      <Route path={ROUTE.WALLET_OVERVIEW} exact={true}>
        <WalletOverview />
      </Route>
      <Route path={ROUTE.WALLET_UTILS} exact={true}>
        <WalletUtils />
      </Route>
      <Route path={ROUTE.WALLET_MNEMONIC} exact={true}>
        <CreateMnemonic />
      </Route>
    </Switch>
  );
}
