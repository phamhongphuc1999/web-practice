import { Box, Theme, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import ScrollToTop from 'src/components/ScrollToTop';
import Header from './Header';
import RestoreWallet from './RestoreWallet';

const useStyle = (theme: Theme) => ({
  container: {
    transition: 'margin 0.5s linear',
    padding: theme.spacing(10, 2, 10, 2),
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

interface Props {
  children: ReactNode;
}

export default function MyWalletWrapper({ children }: Props) {
  const theme = useTheme();
  const cls = useStyle(theme);

  return (
    <Box position="relative" sx={{ backgroundColor: theme.palette.background.primary }}>
      <RestoreWallet />
      <Header />
      <Box sx={cls.container}>
        <Box display="flex" justifyContent="space-between" flexDirection="column" sx={cls.mainContainer}>
          <Box>{children}</Box>
        </Box>
      </Box>
      <ScrollToTop />
    </Box>
  );
}
