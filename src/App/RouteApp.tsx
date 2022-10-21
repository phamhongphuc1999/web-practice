import { Redirect, Route, Switch } from 'react-router-dom';
import Charts from 'src/Pages/Charts';
import ConfigPage from 'src/Pages/ConfigPage';

export default function RouteApp() {
  return (
    <Switch>
      <Route path="/charts" exact={true}>
        <Charts />
      </Route>
      <Route path="/theme" exact>
        <ConfigPage />
      </Route>
      <Redirect from="/" to="/charts" />
    </Switch>
  );
}
