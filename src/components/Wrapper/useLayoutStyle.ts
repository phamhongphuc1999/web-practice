import { Theme, useTheme } from '@mui/material';
import { ReactNode } from 'react';

const useStyle = (theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.primary,
    overflow: 'hidden',
  },
  container: {
    transition: 'margin 0.5s linear',
    padding: theme.spacing(10, 2, 5, 2),
  },
  mainContainer: {
    minHeight: 'calc(100vh - 80px)',
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 1),
    },
    [theme.breakpoints.only('sm')]: {
      marginLeft: '80px',
    },
    [theme.breakpoints.only('xs')]: {
      marginLeft: 0,
    },
  },
});

export default function useLayoutStyle() {
  const theme = useTheme();
  return useStyle(theme);
}

export interface LayoutProps {
  children: ReactNode;
}
