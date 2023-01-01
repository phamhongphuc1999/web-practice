import { alpha, Box, Button } from '@mui/material';
import ThemeButton from 'src/components/Button/ThemeButton';
import CssSelector, { CssSelectItem } from 'src/components/Selector/CssSelector';
import { languageConfig, LanguageType } from 'src/configs/constance';
import useTranslate from 'src/hooks/useTranslate';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { setLanguage } from 'src/redux/userConfigSlice';

export default function Header() {
  const dispatch = useAppDispatch();
  const { t } = useTranslate();
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
      <Box display="flex" alignItems="center" justifyContent="space-between" height="100%">
        <Box display="flex" alignItems="center">
          <ThemeButton />
          <Button variant="outlined" sx={{ ml: 1 }} onClick={() => window.open('/my-wallet', '_blank')}>
            {t('launchWallet')}
          </Button>
        </Box>
        <CssSelector
          width={120}
          items={Object.values(languageConfig)}
          defaultSelectedItem={languageConfig[language]}
          events={{ onChooseItem }}
        />
      </Box>
    </Box>
  );
}
