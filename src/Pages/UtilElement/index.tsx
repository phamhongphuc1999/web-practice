import { Box, Button, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import CopyIcon from 'src/components/Icons/CopyIcon';
import useTranslate from 'src/hooks/useTranslate';

export default function UtilElement() {
  const history = useHistory();
  const { t } = useTranslate();

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
      </Box>
    </>
  );
}
