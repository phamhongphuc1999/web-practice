import { Link, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { ReactNode, useEffect } from 'react';
import { LS } from 'src/configs/constance';
import { LanguageType, ThemeMode } from 'src/global';
import { initLocalStorage } from 'src/redux/config-slice';
import { useAppDispatch } from 'src/redux/store';
import LocalStorage from 'src/services';
import Header from './Header';
import Sidebar from './Sidebar';

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

interface Props {
  children: ReactNode;
}

export default function LayoutWrapper({ children }: Props) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const cls = useStyle(theme);
  const onlyXs = useMediaQuery<Theme>((theme) => theme.breakpoints.only('xs'));

  useEffect(() => {
    const themeMode = LocalStorage.get(LS.THEME);
    const language = LocalStorage.get(LS.LANGUAGE);
    dispatch(
      initLocalStorage({ themeMode: themeMode as ThemeMode, language: language as LanguageType })
    );
  }, []);

  return (
    <Box position="relative" sx={cls.root}>
      <Header />
      <Box sx={cls.container}>
        {!onlyXs && <Sidebar />}
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
          sx={[cls.mainContainer, { marginLeft: '220px' }]}
        >
          <Box>{children}</Box>
          <Box height="20px" display="flex" mt={2}>
            <Typography>COPYRIGHT © {new Date().getFullYear()}&nbsp;</Typography>
            <Link href="https://github.com/phamhongphuc1999/web-practice" target="_blank">
              Main page
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
