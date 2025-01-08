import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import ReactSeo from 'src/components/ReactSeo';
import { ROUTE } from 'src/configs/layout';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import AreaChartOverview from './AreaChartOverview';
import BarChartOverview from './BarChartOverview';
import LineChartOverview from './LineChartOverview';

export default function Overview() {
  const { t } = useLocalTranslate();
  const navigate = useNavigate();

  return (
    <>
      <ReactSeo title={t('chart')} />
      <CssBreadcrumbs configs={[{ label: t('chart') }]} mb={2} />
      <Button
        variant="contained"
        onClick={() => navigate(ROUTE.ECHART)}
        style={{ marginBottom: '1rem' }}
      >
        {t('goToEChart')}
      </Button>
      <LineChartOverview />
      <AreaChartOverview mt={3} />
      <BarChartOverview mt={3} />
    </>
  );
}
