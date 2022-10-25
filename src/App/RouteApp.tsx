import { Redirect, Route, Switch } from 'react-router-dom';
import Overview from 'src/Pages/Charts/Overview';
import ConfigPage from 'src/Pages/ConfigPage';
import SvgPage from 'src/Pages/SvgPage';
import UtilElement from 'src/Pages/UtilElement';
import DatePickerElement from 'src/Pages/UtilElement/DatePickerElement';
import SelectorElement from 'src/Pages/UtilElement/SelectorElement';

export default function RouteApp() {
  return (
    <Switch>
      <Route path="/charts" exact={true}>
        <Overview />
      </Route>
      <Route path="/svg" exact={true}>
        <SvgPage />
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
      <Redirect from="/" to="/charts" />
    </Switch>
  );
}
