import { Route, Switch } from 'react-router-dom';
import WalletOverview from 'src/Pages/MyWallet/WalletOverview';

export default function MyWalletRouteApp() {
  return (
    <Switch>
      <Route path="/my-wallet" exact={true}>
        <WalletOverview />
      </Route>
    </Switch>
  );
}
