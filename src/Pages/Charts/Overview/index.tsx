import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import { ROUTE } from 'src/configs/constance';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import AreaChartOverview from './AreaChartOverview';
import BarChartOverview from './BarChartOverview';
import LineChartOverview from './LineChartOverview';
import ReactSeo from 'src/components/ReactSeo';

export default function Overview() {
  const { t } = useLocalTranslate();
  const history = useHistory();

  return (
    <>
      <ReactSeo title={t('chart')} />
      <CssBreadcrumbs configs={[{ label: t('chart') }]} mb={2} />
      <Button
        variant="contained"
        onClick={() => history.push(ROUTE.ECHART)}
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
