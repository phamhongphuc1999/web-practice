import { Redirect, Route, Switch } from 'react-router-dom';
import DocsPage from 'src/Pages/DocsPage';
import GasAndPrice from 'src/Pages/DocsPage/gas-and-price';
import { DOCS_ROUTE, ROUTE } from 'src/configs/constance';

export default function DocsRouteApp() {
  return (
    <Switch>
      <Route path={DOCS_ROUTE.MAIN_PAGE} exact={true}>
        <DocsPage />
      </Route>
      <Route path={DOCS_ROUTE.GAS_PRICE} exact={true}>
        <GasAndPrice />
      </Route>
      <Redirect from="/" to={ROUTE.ANIMATION} />
    </Switch>
  );
}
