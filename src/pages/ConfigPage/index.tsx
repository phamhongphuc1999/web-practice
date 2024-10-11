import { Box, Typography } from '@mui/material';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import ThemeButton from 'src/components/Button/ThemeButton';
import ReactSeo from 'src/components/ReactSeo';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import { useAppSelector } from 'src/redux/store';

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
        <Typography>{t(themeLabel)}</Typography>
        <ThemeButton />
      </Box>
    </>
  );
}
