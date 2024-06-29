import { Redirect, Route, Switch } from 'react-router-dom';
import { DOCS_ROUTE, ROUTE } from 'src/configs/constance';
import AnimationPage from 'src/Pages/AnimationPage';
import BouncePage from 'src/Pages/AnimationPage/bounce-page';
import CirclePage from 'src/Pages/AnimationPage/circle-page';
import ClockPage from 'src/Pages/AnimationPage/clock-page';
import DropPage from 'src/Pages/AnimationPage/drop-page';
import GooeyPage from 'src/Pages/AnimationPage/gooey-page';
import GridPage from 'src/Pages/AnimationPage/grid-page';
import Overview from 'src/Pages/Charts/Overview';
import ConfigPage from 'src/Pages/ConfigPage';
import ContractPage from 'src/Pages/ContractPage';
import DocsPage from 'src/Pages/DocsPage';
import MetamaskPage from 'src/Pages/MetamaskPage';
import ThreePage from 'src/Pages/three-page';
import UtilElement from 'src/Pages/UtilElement';
import CarouselElement from 'src/Pages/UtilElement/CarouselElement';
import DatePickerElement from 'src/Pages/UtilElement/DatePickerElement';
import SelectorElement from 'src/Pages/UtilElement/SelectorElement';

export default function RouteApp() {
  return (
    <Switch>
      <Route path={`${ROUTE.ANIMATION}/:page`} exact={true}>
        <AnimationPage />
      </Route>
      <Route path={`${ROUTE.ANIMATION}-circle/:page`} exact={true}>
        <CirclePage />
      </Route>
      <Route path={`${ROUTE.ANIMATION}-gooey/:page`} exact={true}>
        <GooeyPage />
      </Route>
      <Route path={`${ROUTE.ANIMATION}-grid/:page`} exact={true}>
        <GridPage />
      </Route>
      <Route path={`${ROUTE.ANIMATION}-bounce/:page`} exact={true}>
        <BouncePage />
      </Route>
      <Route path={`${ROUTE.ANIMATION}-clock/:page`} exact={true}>
        <ClockPage />
      </Route>
      <Route path={`${ROUTE.ANIMATION}-drop-animation/:page`} exact={true}>
        <DropPage />
      </Route>
      <Route path={`${ROUTE.ANIMATION}-3d`} exact={true}>
        <ThreePage />
      </Route>
      <Redirect from={ROUTE.ANIMATION} to={`${ROUTE.ANIMATION}/1`} />
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
      <Route path={ROUTE.UTIL_CAROUSEL} exact={true}>
        <CarouselElement />
      </Route>
      <Route path={ROUTE.THEME} exact>
        <ConfigPage />
      </Route>
      <Route path={DOCS_ROUTE.MAIN_PAGE} exact={true}>
        <DocsPage />
      </Route>
      <Redirect from="/" to={ROUTE.ANIMATION} />
    </Switch>
  );
}
