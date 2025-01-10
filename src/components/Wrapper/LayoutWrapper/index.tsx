import { Container } from '@mui/material';
import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LS } from 'src/configs/constance';
import { ReferenceMapping } from 'src/configs/layout';
import { AppReferenceId, LanguageType, ThemeMode } from 'src/global';
import { initLocalStorage, setReferenceId } from 'src/redux/config-slice';
import { useAppDispatch } from 'src/redux/store';
import LocalStorage from 'src/services';
import Footer from './Footer';
import Header from './header';

interface Props {
  children: ReactNode;
}

export default function LayoutWrapper({ children }: Props) {
  const dispatch = useAppDispatch();
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
    <div className="bg-black-200">
      <Header />
      <Container
        maxWidth="lg"
        className="mb-[50px] flex h-full min-h-[calc(100vh-55px)] flex-col justify-between pt-[100px]"
      >
        <div>{children}</div>
      </Container>
      <Footer />
    </div>
  );
}
