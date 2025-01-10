import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import ReactSeo from 'src/components/ReactSeo';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import AreaChartOverview from './AreaChartOverview';
import BarChartOverview from './BarChartOverview';
import LineChartOverview from './LineChartOverview';

export default function Overview() {
  const { t } = useLocalTranslate();

  return (
    <>
      <ReactSeo title={t('chart')} />
      <CssBreadcrumbs configs={[{ label: t('chart') }]} mb={2} />
      <LineChartOverview />
      <AreaChartOverview mt={3} />
      <BarChartOverview mt={3} />
    </>
  );
}
