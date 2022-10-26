import BarChartIcon from '@mui/icons-material/BarChart';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import SettingsIcon from '@mui/icons-material/Settings';

export const LS = {
  THEME: 'theme',
};

export type THEME_MODE = 'dark' | 'light';

export const Layout = [
  { label: 'Chart', link: '/charts', icon: BarChartIcon },
  { label: 'Contract', link: '/contract', icon: CurrencyBitcoinIcon },
  { label: 'Utils', link: '/utils', icon: TaskAltIcon },
  { label: 'Config', link: '/theme', icon: SettingsIcon },
];
