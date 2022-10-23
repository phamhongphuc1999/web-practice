import BarChartIcon from '@mui/icons-material/BarChart';
import AppsIcon from '@mui/icons-material/Apps';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import SettingsIcon from '@mui/icons-material/Settings';

export const LS = {
  THEME: 'theme',
};

export type THEME_MODE = 'dark' | 'light';

export const Layout = [
  { label: 'Chart', link: '/charts', icon: BarChartIcon },
  { label: 'Svg', link: '/svg', icon: AppsIcon },
  { label: 'Utils', link: '/utils', icon: TaskAltIcon },
  { label: 'Config', link: '/theme', icon: SettingsIcon },
];
