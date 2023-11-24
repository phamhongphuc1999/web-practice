import {
  Wallet,
  Animation,
  Settings,
  TaskAlt,
  CurrencyBitcoin,
  BarChart,
} from '@mui/icons-material';

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

export type THEME_MODE = 'dark' | 'light';
export type MY_WALLET_STATUS = 'init' | 'create_wallet' | 'import_wallet' | 'login' | 'logout';

export const Layout = [
  { label: 'animation', link: '/animation', icon: Animation },
  { label: 'metamask', link: '/metamask', icon: Wallet },
  { label: 'contract', link: '/contract', icon: CurrencyBitcoin },
  { label: 'chart', link: '/charts', icon: BarChart },
  { label: 'utils', link: '/utils', icon: TaskAlt },
  { label: 'config', link: '/theme', icon: Settings },
];

export const ROUTE = {
  ANIMATION: '/animation',
  METAMASK: '/metamask',
  CONTRACT: '/contract',
  MY_CONTRACT: '/contract/my-contract',
  CHART: '/charts',
  UTILS: '/utils',
  UTIL_DATE_PICKER: '/utils/date-picker',
  UTIL_SELECTOR: '/utils/selector',
  UTIL_CAROUSEL: '/utils/carousel',
  THEME: '/theme',
  WALLET_OVERVIEW: '/my-wallet',
  WALLET_ADD_TOKEN: '/my-wallet/add-token',
  WALLET_SETTING: '/my-wallet-setting',
  WALLET_UTILS: '/my-wallet-utils',
  WALLET_MNEMONIC: '/my-wallet-utils/mnemonic',
  WALLET_BROWSER_PASSWORD: '/my-wallet-utils/browser-password',
  WALLET_RPC: '/my-wallet-utils/rpc',
  WALLET_SIGN_TRANSACTION: '/my-wallet-utils/sign-transaction',
};

export const DOCS_ROUTE = {
  MAIN_PAGE: '/docs',
  GAS_PRICE: '/docs/gas-and-price',
};

export type LanguageType = 'en' | 'vi';
export const languageConfig = {
  en: { id: 'en', label: 'English' },
  vi: { id: 'vi', label: 'Vietnamese' },
};

export const MILLISECOND = 1;
export const SECOND = MILLISECOND * 1000;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;

export const color1 = '#55B2FF';
export const color2 = '#8270A9';
export const color3 = '#82E28E';
export const color4 = '#927AD1';
export const color5 = '#FCAE6B';
export const color6 = '#A5A5A5';

export const COLOR_ARRAY = [color1, color2, color3, color4, color5, color6];
