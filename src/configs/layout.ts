import {
  Animation,
  BarChart,
  BlenderOutlined,
  CurrencyBitcoin,
  EnhancedEncryptionOutlined,
  LinkOutlined,
  LocalFireDepartmentOutlined,
  School,
  Storefront,
  TaskAlt,
  Wallet,
} from '@mui/icons-material';
import { ShadcnIcon } from 'src/components/Icons';
import { AppReferenceId, AppReferenceType } from 'src/global';

export const ROUTE = {
  ANIMATION: '/animation',
  ANT_DESIGN: '/ant-design',
  SHADCN_UI: '/shadcn-ui',
  APTOS: '/aptos',
  APTOS_SDK: '/aptos/sdk',
  SUI: '/sui',
  METAMASK: '/metamask',
  CONTRACT: '/contract',
  CHART: '/charts',
  ECHART: '/charts/e-chart',
  UTILS: '/utils',
  UTIL_DATE_PICKER: '/utils/date-picker',
  UTIL_SELECTOR: '/utils/selector',
  UTIL_CAROUSEL: '/utils/carousel',
  CONFIG: '/config',
  HASH_FUNCTION: '/hash-function',
  CIRCOM: '/circom',
  ACADEMY: '/academy',
  MOBX: '/mobx',
  NO_ROUTE: '/no-page',
};

export const ReferenceMapping: Array<{ pathname: string; id: AppReferenceId }> = [
  { pathname: ROUTE.ANIMATION, id: 'component' },
  { pathname: ROUTE.ANT_DESIGN, id: 'component' },
  { pathname: ROUTE.APTOS, id: 'web3' },
  { pathname: ROUTE.METAMASK, id: 'web3' },
  { pathname: ROUTE.CONTRACT, id: 'web3' },
  { pathname: ROUTE.CHART, id: 'chart' },
  { pathname: ROUTE.UTILS, id: 'component' },
  { pathname: ROUTE.HASH_FUNCTION, id: 'encryption' },
  { pathname: ROUTE.CIRCOM, id: 'encryption' },
  { pathname: ROUTE.ACADEMY, id: 'academy' },
];

const Component: AppReferenceType = {
  id: 'component',
  title: 'component',
  items: [
    {
      id: 'animation',
      title: 'animation',
      link: ROUTE.ANIMATION,
      description: 'header-description.animation',
      icon: Animation,
    },
    {
      id: 'ant-design',
      title: 'ant-design',
      link: ROUTE.ANT_DESIGN,
      description: 'header-description.ant-design',
      icon: LocalFireDepartmentOutlined,
    },
    {
      id: 'shadcn-ui',
      title: 'SHADCN/UI',
      link: ROUTE.SHADCN_UI,
      description: 'header-description.shadcn-ui',
      icon: ShadcnIcon,
    },
    { id: 'utils', title: 'utils', link: ROUTE.UTILS, description: '', icon: TaskAlt },
  ],
};

const Chart: AppReferenceType = {
  id: 'chart',
  title: 'chart',
  items: [
    { id: 'chart', title: 'chart', link: ROUTE.CHART, description: '', icon: BarChart },
    { id: 'eChart', title: 'echart', link: ROUTE.ECHART, description: '', icon: BarChart },
  ],
};

const Web3: AppReferenceType = {
  id: 'web3',
  title: 'Web3',
  items: [
    { id: 'metamask', title: 'metamask', link: ROUTE.METAMASK, description: '', icon: Wallet },
    {
      id: 'contract',
      title: 'contract',
      link: ROUTE.CONTRACT,
      description: '',
      icon: CurrencyBitcoin,
    },
    { id: 'aptos', title: 'aptos', link: ROUTE.APTOS, description: '', icon: LinkOutlined },
    { id: 'sui', title: 'sui', link: ROUTE.SUI, description: '', icon: School },
  ],
};

const Encryption: AppReferenceType = {
  id: 'encryption',
  title: 'encryption',
  items: [
    {
      id: 'circom',
      title: 'Circom',
      link: ROUTE.CIRCOM,
      description: '',
      icon: EnhancedEncryptionOutlined,
    },
    {
      id: 'hashFunction',
      title: 'hashFunction',
      link: ROUTE.HASH_FUNCTION,
      description: '',
      icon: BlenderOutlined,
    },
  ],
};

const Academy: AppReferenceType = {
  id: 'academy',
  title: 'academy',
  items: [
    { id: 'academy', title: 'academy', link: ROUTE.ACADEMY, description: '', icon: School },
    {
      id: 'mobX',
      title: 'mobX',
      link: ROUTE.MOBX,
      description: '',
      icon: Storefront,
    },
  ],
};

export const AppReferenceConfig: { [key in AppReferenceId]: AppReferenceType } = {
  component: Component,
  chart: Chart,
  web3: Web3,
  encryption: Encryption,
  academy: Academy,
};

export const AcademyConfig: Array<{ title: string; link: string }> = [
  { title: 'academy-item.transition', link: `${ROUTE.ACADEMY}/transition-delay` },
  { title: 'academy-item.scroll-page', link: `${ROUTE.ACADEMY}/animation-scroll` },
  { title: 'academy-item.horizontal-scroll', link: `${ROUTE.ACADEMY}/horizontal-scroll` },
  {
    title: 'academy-item.horizontal-scroll-animation',
    link: `${ROUTE.ACADEMY}/horizontal-scroll-animation`,
  },
  {
    title: 'academy-item.position-preserve',
    link: `${ROUTE.ACADEMY}/position-preserve`,
  },
];
