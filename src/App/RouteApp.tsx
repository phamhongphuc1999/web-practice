import { Redirect, Route, Switch } from 'react-router-dom';
import AnimationPage from 'src/Pages/AnimationPage';
import Overview from 'src/Pages/Charts/Overview';
import ConfigPage from 'src/Pages/ConfigPage';
import ContractPage from 'src/Pages/ContractPage';
import MetamaskPage from 'src/Pages/MetamaskPage';
import UtilElement from 'src/Pages/UtilElement';
import DatePickerElement from 'src/Pages/UtilElement/DatePickerElement';
import SelectorElement from 'src/Pages/UtilElement/SelectorElement';

export default function RouteApp() {
  return (
    <Switch>
      <Route path="/animation" exact={true}>
        <AnimationPage />
      </Route>
      <Route path="/metamask" exact={true}>
        <MetamaskPage />
      </Route>
      <Route path="/contract" exact={true}>
        <ContractPage />
      </Route>
      <Route path="/charts" exact={true}>
        <Overview />
      </Route>
      <Route path="/utils" exact={true}>
        <UtilElement />
      </Route>
      <Route path="/utils/date-picker" exact={true}>
        <DatePickerElement />
      </Route>
      <Route path="/utils/selector" exact={true}>
        <SelectorElement />
      </Route>
      <Route path="/theme" exact>
        <ConfigPage />
      </Route>
      <Redirect from="/" to="/animation" />
    </Switch>
  );
}
