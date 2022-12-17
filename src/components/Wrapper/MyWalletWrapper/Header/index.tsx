import { alpha, Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ThemeButton from 'src/components/Button/ThemeButton';
import CssSelector, { CssSelectItem } from 'src/components/Selector/CssSelector';
import { languageConfig, LanguageType, ROUTE } from 'src/configs/constance';
import useTranslate from 'src/hooks/useTranslate';
import { useAppSelector } from 'src/redux/hook';
import { setLanguage } from 'src/redux/userConfigSlice';

export default function Header() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslate();
  const { status } = useAppSelector((state) => state.myWalletSlice);
  const { language } = useAppSelector((state) => state.userConfigSlice);

  function onChooseItem(e: React.MouseEvent<HTMLDivElement, MouseEvent>, item: CssSelectItem) {
    dispatch(setLanguage(item.id as LanguageType));
  }

  return (
    <Box
      position="fixed"
      sx={(theme) => ({
        background: theme.palette.background.paper,
        zIndex: 1205,
        width: '100%',
        height: 55,
        borderBottom: `1px solid ${alpha(theme.palette.mode === 'dark' ? '#fff' : '#000', 0.12)}`,
        padding: theme.spacing(0, 2),
      })}
    >
      <Box display="flex" alignItems="center" height="100%">
        <ThemeButton />
        {location.pathname === '/my-wallet' && status === 'init' && (
          <Button variant="outlined" onClick={() => history.push(ROUTE.WALLET_UTILS)}>
            {t('testWalletUtils')}
          </Button>
        )}
        <CssSelector
          props={{ sx: { ml: 1 } }}
          items={Object.values(languageConfig)}
          defaultSelectedItem={languageConfig[language]}
          events={{ onChooseItem }}
        />
      </Box>
    </Box>
  );
}
