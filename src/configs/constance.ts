import {
  Animation,
  BarChart,
  CurrencyBitcoin,
  LinkOutlined,
  LocalFireDepartmentOutlined,
  Settings,
  SvgIconComponent,
  TaskAlt,
  Wallet,
} from '@mui/icons-material';
import BSC from 'src/assets/images/BSC.svg';

export const LS = {
  THEME: 'theme',
  LANGUAGE: 'la',
  CONNECTOR: 'connector',
  CHAIN_ID: 'chain_id',
};

export const WALLET_LS = {
  SEED: 'seed',
  PASSWORD: 'password',
  STATUS: 'status',
  CHAIN_ID: 'wallet_chain_id',
  TOKEN: 'wallet_token',
};

export const ChainConfig = [
  { chainId: 56, image: BSC, name: 'BSC Mainnet' },
  { chainId: 97, image: BSC, name: 'BSC Testnet' },
];

export const Layout: Array<{ label: string; link: string; icon: SvgIconComponent }> = [
  { label: 'animation', link: '/animation', icon: Animation },
  { label: 'ant-design', link: '/ant-design', icon: LocalFireDepartmentOutlined },
  { label: 'aptos', link: '/aptos', icon: LinkOutlined },
  { label: 'chart', link: '/charts', icon: BarChart },
  { label: 'contract', link: '/contract', icon: CurrencyBitcoin },
  { label: 'metamask', link: '/metamask', icon: Wallet },
  { label: 'utils', link: '/utils', icon: TaskAlt },
  { label: 'config', link: '/theme', icon: Settings },
];

export const ROUTE = {
  ANIMATION: '/animation',
  ANT_DESIGN: '/ant-design',
  APTOS: '/aptos',
  APTOS_SDK: '/aptos/sdk',
  METAMASK: '/metamask',
  CONTRACT: '/contract',
  CHART: '/charts',
  ECHART: '/charts/e-chart',
  UTILS: '/utils',
  UTIL_DATE_PICKER: '/utils/date-picker',
  UTIL_SELECTOR: '/utils/selector',
  UTIL_CAROUSEL: '/utils/carousel',
  THEME: '/theme',
};

export const DOCS_ROUTE = {
  MAIN_PAGE: '/docs',
  GAS_PRICE: '/docs/gas-and-price',
};

export const languageConfig = {
  en: { id: 'en', label: 'english' },
  vi: { id: 'vi', label: 'vietnamese' },
};

export const MILLISECOND = 1;
export const SECOND = MILLISECOND * 1000;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;

export const color1 = '#335cd7';
export const color2 = '#19ab17';
export const color3 = '#f150f4';
export const color4 = '#b4b625';
export const color5 = '#da1f73';
export const color6 = '#fa4646';
export const color7 = '#46faf2';
export const color8 = '#7700ff';

export const COLOR_ARRAY = [color1, color2, color3, color4, color5, color6, color7, color8];

export const TESTNET_NODE_URL = 'https://api.testnet.aptoslabs.com/v1';
export const MAINNET_NODE_URL = 'https://api.mainnet.aptoslabs.com/v1';
export const IGNORE_APTOS_WALLET = ['Continue with Google', 'T wallet', 'Nightly'];
