import { Theme, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';
import ScrollToTop from '../../ScrollToTop';
import Sidebar from './Sidebar';

interface Props {
  children: ReactNode;
}

const useStyle = (theme: Theme) => ({
  container: {
    transition: 'margin 0.5s linear',
    padding: theme.spacing(10, 2, 0, 2),
  },
  mainContainer: {
    marginLeft: '220px',
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

export default function LayoutWrapper({ children }: Props) {
  const theme = useTheme();
  const cls = useStyle(theme);
  const onlyXs = useMediaQuery<Theme>((theme) => theme.breakpoints.only('xs'));

  return (
    <Box position="relative" sx={{ backgroundColor: theme.palette.background.primary }}>
      <Header />
      <Box sx={cls.container}>
        {!onlyXs && <Sidebar />}
        <Box display="flex" justifyContent="space-between" flexDirection="column" sx={cls.mainContainer}>
          <Box>{children}</Box>
          <Footer />
        </Box>
      </Box>
      <ScrollToTop />
    </Box>
  );
}
