import { Wallet, Animation, Settings, TaskAlt, CurrencyBitcoin, BarChart } from '@mui/icons-material';

export const LS = {
  THEME: 'theme',
  CONNECTOR: 'connector',
  CHAIN_ID: 'chain_id',
};

export type THEME_MODE = 'dark' | 'light';

export const Layout = [
  { label: 'Animation', link: '/animation', icon: Animation },
  { label: 'Metamask', link: '/metamask', icon: Wallet },
  { label: 'Contract', link: '/contract', icon: CurrencyBitcoin },
  { label: 'Chart', link: '/charts', icon: BarChart },
  { label: 'Utils', link: '/utils', icon: TaskAlt },
  { label: 'Config', link: '/theme', icon: Settings },
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
};
