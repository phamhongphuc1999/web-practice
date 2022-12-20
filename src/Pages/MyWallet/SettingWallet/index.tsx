import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import useTranslate from 'src/hooks/useTranslate';
import { useHistory } from 'react-router-dom';
import { ROUTE } from 'src/configs/constance';
import ThemeButton from 'src/components/Button/ThemeButton';
import LanguageSelector from 'src/components/Selector/LanguageSelector';

export default function SettingWallet() {
  const { t } = useTranslate();
  const history = useHistory();

  return (
    <>
      <Box display="flex" alignItems="center">
        <IconButton sx={{ mr: 1 }} onClick={() => history.push(ROUTE.WALLET_OVERVIEW)}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography>{t('config')}</Typography>
      </Box>
      <Box>
        <Box display="flex" alignItems="center">
          <Typography>{t('theme')}</Typography>
          <ThemeButton />
        </Box>
        <Box display="flex" alignItems="center">
          <Typography>{t('language')}</Typography>
          <LanguageSelector />
        </Box>
      </Box>
    </>
  );
}
