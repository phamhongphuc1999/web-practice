import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import useTranslate from 'src/hooks/useTranslate';
import AreaChartOverview from './AreaChartOverview';
import BarChartOverview from './BarChartOverview';
import LineChartOverview from './LineChartOverview';

export default function Overview() {
  const { t } = useTranslate();

  return (
    <>
      <CssBreadcrumbs configs={[{ label: t('chart') }]} mb={2} />
      <LineChartOverview />
      <AreaChartOverview mt={3} />
      <BarChartOverview mt={3} />
    </>
  );
}
