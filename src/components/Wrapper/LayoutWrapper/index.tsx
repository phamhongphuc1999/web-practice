import { Link, Theme, Typography, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { LS } from 'src/configs/constance';
import { LanguageType, ThemeMode } from 'src/global';
import { initLocalStorage } from 'src/redux/config-slice';
import { useAppDispatch } from 'src/redux/store';
import LocalStorage from 'src/services';
import useLayoutStyle, { LayoutProps } from '../useLayoutStyle';
import Header from './Header';
import Sidebar from './Sidebar';

export default function LayoutWrapper({ children }: LayoutProps) {
  const dispatch = useAppDispatch();
  const cls = useLayoutStyle();
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
