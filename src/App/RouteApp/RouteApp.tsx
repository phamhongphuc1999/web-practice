import { Redirect, Route, Switch } from 'react-router-dom';
import { ROUTE } from 'src/configs/constance';
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
      <Route path={ROUTE.ANIMATION} exact={true}>
        <AnimationPage />
      </Route>
      <Route path={ROUTE.METAMASK} exact={true}>
        <MetamaskPage />
      </Route>
      <Route path={ROUTE.CONTRACT} exact={true}>
        <ContractPage />
      </Route>
      <Route path={ROUTE.CHART} exact={true}>
        <Overview />
      </Route>
      <Route path={ROUTE.UTILS} exact={true}>
        <UtilElement />
      </Route>
      <Route path={ROUTE.UTIL_DATE_PICKER} exact={true}>
        <DatePickerElement />
      </Route>
      <Route path={ROUTE.UTIL_SELECTOR} exact={true}>
        <SelectorElement />
      </Route>
      <Route path={ROUTE.THEME} exact>
        <ConfigPage />
      </Route>
      <Redirect exact from="/" to={ROUTE.ANIMATION} />
    </Switch>
  );
}
