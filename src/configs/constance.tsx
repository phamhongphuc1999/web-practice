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
