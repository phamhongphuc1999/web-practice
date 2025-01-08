import { Box, Typography } from '@mui/material';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import ThemeButton from 'src/components/Button/ThemeButton';
import ReactSeo from 'src/components/ReactSeo';
import LanguageSelector from 'src/components/Selector/LanguageSelector';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import { useAppSelector } from 'src/redux/store';
import { mergeSx } from 'src/services';

function useStyle() {
  return {
    box: {
      display: 'flex',
      alignItems: 'center',
    },
  };
}

export default function ConfigPage() {
  const cls = useStyle();
  const { t } = useLocalTranslate();
  const { themeLabel } = useAppSelector((state) => state.config);

  return (
    <>
      <ReactSeo title={t('config')} />
      <CssBreadcrumbs configs={[{ label: t('config') }]} mb={2} />
      <Box sx={cls.box}>
        <ThemeButton />
        <Typography>{t(themeLabel)}</Typography>
      </Box>
      <Box sx={mergeSx(cls.box, { marginTop: 2 })}>
        <Typography>{t('language')}</Typography>
        <LanguageSelector />
      </Box>
    </>
  );
}
