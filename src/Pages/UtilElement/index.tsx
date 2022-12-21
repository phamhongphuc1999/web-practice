import { Box, Button, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import ThemeButton from 'src/components/Button/ThemeButton';
import CopyIcon from 'src/components/Icons/CopyIcon';
import LanguageSelector from 'src/components/Selector/LanguageSelector';
import PasswordTextField from 'src/components/TextField/PasswordTextField';
import useTranslate from 'src/hooks/useTranslate';
import { useAppSelector } from 'src/redux/hook';

export default function UtilElement() {
  const history = useHistory();
  const { t } = useTranslate();
  const { theme } = useAppSelector((state) => state.userConfigSlice);

  return (
    <>
      <CssBreadcrumbs configs={[{ label: t('utils') }]} props={{ mb: 2 }} />
      <Box display="flex" flexWrap="wrap">
        <Button variant="contained" color="primary" onClick={() => history.push('/utils/date-picker')}>
          {t('rangeDatePicker')}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => history.push('/utils/selector')}
          sx={{ marginLeft: '0.5rem' }}
        >
          {t('multipleSelector')}
        </Button>
        <Box ml={1} display="flex" alignItems="center">
          <Typography>{t('copyHere')}</Typography>
          <CopyIcon copyText="Copy is here" />
        </Box>
        <Box ml={1} display="flex" alignItems="center">
          <Typography>{t(theme.label)}</Typography>
          <ThemeButton />
        </Box>
      </Box>
      <Box mt={2} display="flex" flexWrap="wrap">
        <LanguageSelector />
        <PasswordTextField props={{ sx: { ml: 2, width: '40%' }, placeholder: t('enterPassword') }} />
      </Box>
    </>
  );
}
