import { Navigate, useRoutes } from 'react-router-dom';
import { ROUTE } from 'src/configs/constance';
import Animation from 'src/pages/animation';
import Animation3d from 'src/pages/animation-3d';
import BouncePage from 'src/pages/animation/bounce-page';
import CirclePage from 'src/pages/animation/circle-page';
import ClockPage from 'src/pages/animation/clock-page';
import DropPage from 'src/pages/animation/drop-page';
import GooeyPage from 'src/pages/animation/gooey-page';
import GridPage from 'src/pages/animation/grid-page';
import AntDesignPage from 'src/pages/AntDesignPage';
import AptosPage from 'src/pages/AptosPage';
import AptosSdk from 'src/pages/AptosPage/sdk';
import EChart from 'src/pages/Charts/EChart';
import Overview from 'src/pages/Charts/Overview';
import ConfigPage from 'src/pages/ConfigPage';
import ContractPage from 'src/pages/ContractPage';
import HashFunction from 'src/pages/cryptography/hash-function';
import MetamaskPage from 'src/pages/MetamaskPage';
import UtilElement from 'src/pages/UtilElement';
import CarouselElement from 'src/pages/UtilElement/CarouselElement';
import DatePickerElement from 'src/pages/UtilElement/DatePickerElement';
import SelectorElement from 'src/pages/UtilElement/SelectorElement';
import ProviderApp from './ProviderApp';
import CircomPage from 'src/pages/cryptography/circom-page';

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
      path: `${ROUTE.ANIMATION}-3d`,
      element: <ProviderApp />,
      children: [{ path: '', element: <Animation3d /> }],
    },
    {
      path: ROUTE.APTOS,
      element: <ProviderApp />,
      children: [{ path: '', element: <AptosPage /> }],
    },
    {
      path: ROUTE.APTOS_SDK,
      element: <ProviderApp />,
      children: [{ path: '', element: <AptosSdk /> }],
    },
    {
      path: ROUTE.ANT_DESIGN,
      element: <ProviderApp />,
      children: [{ path: '', element: <AntDesignPage /> }],
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
      path: ROUTE.CONFIG,
      element: <ProviderApp />,
      children: [{ path: '', element: <ConfigPage /> }],
    },
    {
      path: ROUTE.HASH_FUNCTION,
      element: <ProviderApp />,
      children: [{ path: '', element: <HashFunction /> }],
    },
    {
      path: ROUTE.CIRCOM,
      element: <ProviderApp />,
      children: [{ path: '', element: <CircomPage /> }],
    },
    {
      path: '/',
      element: <ProviderApp />,
      children: [{ path: '', element: <Navigate to={`${ROUTE.ANIMATION}/1`} /> }],
    },
  ]);
}
