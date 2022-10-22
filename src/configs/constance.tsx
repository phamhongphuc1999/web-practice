import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';

export const LS = {
  THEME: 'theme',
};

export type THEME_MODE = 'dark' | 'light';

export const Layout = [
  { label: 'Chart', link: '/charts', icon: BarChartIcon },
  { label: 'Config', link: '/theme', icon: SettingsIcon },
];
