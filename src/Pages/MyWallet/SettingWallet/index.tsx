import { Box, Button, IconButton, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import useTranslate from 'src/hooks/useTranslate';
import { useHistory } from 'react-router-dom';
import { ROUTE } from 'src/configs/constance';
import ThemeButton from 'src/components/Button/ThemeButton';
import LanguageSelector from 'src/components/Selector/LanguageSelector';
import NetworkConfig from './NetworkConfig';

export default function SettingWallet() {
  const { t } = useTranslate();
  const history = useHistory();

  return (
    <>
      <Button variant="outlined" onClick={() => history.push(ROUTE.WALLET_UTILS)}>
        {t('testWalletUtils')}
      </Button>
      <Box display="flex" alignItems="center">
        <IconButton sx={{ mr: 1 }} onClick={() => history.push(ROUTE.WALLET_OVERVIEW)}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography>{t('config')}</Typography>
      </Box>
      <Box>
        <Box display="flex" alignItems="center" mt={1}>
          <Typography>{t('theme')}</Typography>
          <ThemeButton />
        </Box>
        <Box display="flex" alignItems="center" mt={1} sx={{ borderTop: '1px solid', pt: 1 }}>
          <Typography>{t('language')}</Typography>
          <LanguageSelector />
        </Box>
        <NetworkConfig />
      </Box>
    </>
  );
}
