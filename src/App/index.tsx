import { Navigate, useRoutes } from 'react-router-dom';
import { ROUTE } from 'src/configs/layout';
import Academy from 'src/pages/academy';
import AnimationScroll from 'src/pages/academy/animation-scroll';
import FlexLayout from 'src/pages/academy/flex-layout';
import HorizontalScroll from 'src/pages/academy/horizontal-scroll';
import HorizontalScrollAnimation from 'src/pages/academy/horizontal-scroll-animation';
import PositionPreservesState from 'src/pages/academy/position-preserves-state';
import TransitionDelay from 'src/pages/academy/transition-delay';
import Animation from 'src/pages/animation';
import BouncePage from 'src/pages/animation/bounce-page';
import CirclePage from 'src/pages/animation/circle-page';
import ClockPage from 'src/pages/animation/clock-page';
import DropPage from 'src/pages/animation/drop-page';
import GooeyPage from 'src/pages/animation/gooey-page';
import GridPage from 'src/pages/animation/grid-page';
import AntDesignPage from 'src/pages/AntDesignPage';
import BubbleChart from 'src/pages/Charts/bubble-chart';
import EChart from 'src/pages/Charts/EChart';
import Overview from 'src/pages/Charts/Overview';
import ConfigPage from 'src/pages/ConfigPage';
import ContractPage from 'src/pages/ContractPage';
import MetamaskPage from 'src/pages/MetamaskPage';
import MobXPage from 'src/pages/mobx-page';
import NoRoute from 'src/pages/no-route';
import ShadcnUi from 'src/pages/shadcn-ui';
import UtilElement from 'src/pages/UtilElement';
import CarouselElement from 'src/pages/UtilElement/CarouselElement';
import ColorfulBoxElement from 'src/pages/UtilElement/ColorfulBoxElement';
import DatePickerElement from 'src/pages/UtilElement/DatePickerElement';
import SelectorElement from 'src/pages/UtilElement/SelectorElement';
import ZustandPage from 'src/pages/zustand-page';
import '../styles/animation.css';
import '../styles/ant.style.css';
import '../styles/colorful-box.style.css';
import ProviderApp from './ProviderApp';

export default function App() {
  return useRoutes([
    {
      path: ROUTE.ANIMATION,
      element: <ProviderApp />,
      children: [
        { path: ':page', element: <Animation /> },
        { path: '', element: <Navigate to={`${ROUTE.ANIMATION}/1`} /> },
      ],
    },
    {
      path: `${ROUTE.ANIMATION}-circle/:page`,
      element: <ProviderApp />,
      children: [{ path: '', element: <CirclePage /> }],
    },
    {
      path: `${ROUTE.ANIMATION}-gooey/:page`,
      element: <ProviderApp />,
      children: [{ path: '', element: <GooeyPage /> }],
    },
    {
      path: `${ROUTE.ANIMATION}-grid/:page`,
      element: <ProviderApp />,
      children: [{ path: '', element: <GridPage /> }],
    },
    {
      path: `${ROUTE.ANIMATION}-bounce/:page`,
      element: <ProviderApp />,
      children: [{ path: '', element: <BouncePage /> }],
    },
    {
      path: `${ROUTE.ANIMATION}-clock/:page`,
      element: <ProviderApp />,
      children: [{ path: '', element: <ClockPage /> }],
    },
    {
      path: `${ROUTE.ANIMATION}-drop-animation/:page`,
      element: <ProviderApp />,
      children: [{ path: '', element: <DropPage /> }],
    },
    {
      path: ROUTE.ANT_DESIGN,
      element: <ProviderApp />,
      children: [{ path: '', element: <AntDesignPage /> }],
    },
    {
      path: ROUTE.SHADCN_UI,
      element: <ProviderApp />,
      children: [{ path: '', element: <ShadcnUi /> }],
    },
    {
      path: ROUTE.METAMASK,
      element: <ProviderApp />,
      children: [{ path: '', element: <MetamaskPage /> }],
    },
    {
      path: ROUTE.CONTRACT,
      element: <ProviderApp />,
      children: [{ path: '', element: <ContractPage /> }],
    },
    {
      path: ROUTE.CHART,
      element: <ProviderApp />,
      children: [{ path: '', element: <Overview /> }],
    },
    {
      path: ROUTE.ECHART,
      element: <ProviderApp />,
      children: [{ path: '', element: <EChart /> }],
    },
    {
      path: ROUTE.BUBBLE_CHART,
      element: <ProviderApp />,
      children: [{ path: '', element: <BubbleChart /> }],
    },
    {
      path: ROUTE.UTILS,
      element: <ProviderApp />,
      children: [{ path: '', element: <UtilElement /> }],
    },
    {
      path: ROUTE.UTIL_DATE_PICKER,
      element: <ProviderApp />,
      children: [{ path: '', element: <DatePickerElement /> }],
    },
    {
      path: ROUTE.UTIL_SELECTOR,
      element: <ProviderApp />,
      children: [{ path: '', element: <SelectorElement /> }],
    },
    {
      path: ROUTE.UTIL_CAROUSEL,
      element: <ProviderApp />,
      children: [{ path: '', element: <CarouselElement /> }],
    },
    {
      path: ROUTE.UTIL_COLORFUL_BOX,
      element: <ProviderApp />,
      children: [{ path: '', element: <ColorfulBoxElement /> }],
    },
    {
      path: ROUTE.CONFIG,
      element: <ProviderApp />,
      children: [{ path: '', element: <ConfigPage /> }],
    },
    {
      path: ROUTE.ACADEMY,
      element: <ProviderApp />,
      children: [
        { path: '', element: <Academy /> },
        { path: 'transition-delay', element: <TransitionDelay /> },
        { path: 'animation-scroll', element: <AnimationScroll /> },
        { path: 'horizontal-scroll', element: <HorizontalScroll /> },
        { path: 'horizontal-scroll-animation', element: <HorizontalScrollAnimation /> },
        { path: 'position-preserve', element: <PositionPreservesState /> },
        { path: 'flex-layout', element: <FlexLayout /> },
      ],
    },
    { path: ROUTE.MOBX, element: <ProviderApp />, children: [{ path: '', element: <MobXPage /> }] },
    {
      path: ROUTE.ZUSTAND,
      element: <ProviderApp />,
      children: [{ path: '', element: <ZustandPage /> }],
    },
    {
      path: ROUTE.NO_ROUTE,
      element: <ProviderApp />,
      children: [{ path: '', element: <NoRoute /> }],
    },
    {
      path: '/',
      element: <ProviderApp />,
      children: [
        { path: '', element: <Navigate to={`${ROUTE.ANIMATION}/1`} /> },
        { path: '/*', element: <Navigate to={ROUTE.NO_ROUTE} /> },
      ],
    },
  ]);
}
