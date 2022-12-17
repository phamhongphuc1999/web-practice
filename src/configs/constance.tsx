import { Wallet, Animation, Settings, TaskAlt, CurrencyBitcoin, BarChart } from '@mui/icons-material';

export const LS = {
  THEME: 'theme',
  LANGUAGE: 'la',
  CONNECTOR: 'connector',
  CHAIN_ID: 'chain_id',
};

export type THEME_MODE = 'dark' | 'light';
export type MY_WALLET_STATUS = 'init' | 'create_wallet' | 'import_wallet';

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
  CHART: '/charts',
  UTILS: '/utils',
  UTIL_DATE_PICKER: '/utils/date-picker',
  UTIL_SELECTOR: '/utils/selector',
  THEME: '/theme',
  WALLET_OVERVIEW: '/my-wallet',
  WALLET_UTILS: '/my-wallet/utils',
  WALLET_MNEMONIC: '/my-wallet/utils/mnemonic',
  WALLET_BROWSER_PASSWORD: '/my-wallet/utils/browser-password',
};

export type LanguageType = 'en' | 'vi';
export const languageConfig = {
  en: { id: 'en', label: 'English' },
  vi: { id: 'vi', label: 'Vietnamese' },
};
