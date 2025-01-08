import { Link, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LS } from 'src/configs/constance';
import { ReferenceMapping } from 'src/configs/layout';
import { AppReferenceId, LanguageType, ThemeMode } from 'src/global';
import { initLocalStorage, setReferenceId } from 'src/redux/config-slice';
import { useAppDispatch } from 'src/redux/store';
import LocalStorage from 'src/services';
import Header from './header';
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
    marginLeft: '220px',
    [theme.breakpoints.down('md')]: {
      marginLeft: '0px',
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
  const mdDown = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'));
  const location = useLocation();

  useEffect(() => {
    const themeMode = LocalStorage.get(LS.THEME);
    const language = LocalStorage.get(LS.LANGUAGE);
    dispatch(
      initLocalStorage({ themeMode: themeMode as ThemeMode, language: language as LanguageType })
    );
  }, []);

  useEffect(() => {
    let result: AppReferenceId | undefined = undefined;
    const pathname = location.pathname;
    for (const item of ReferenceMapping) {
      if (pathname.includes(item.pathname)) {
        result = item.id;
        break;
      }
    }
    dispatch(setReferenceId(result));
  }, [location.pathname]);

  return (
    <Box position="relative" sx={cls.root}>
      <Header />
      <Box sx={cls.container}>
        {!mdDown && <Sidebar />}
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
