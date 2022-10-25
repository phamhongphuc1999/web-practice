import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import LineChartOverview from './LineChartOverview';

export default function Overview() {
  return (
    <>
      <CssBreadcrumbs configs={[{ label: 'chart' }]} props={{ mb: 2 }} />
      <LineChartOverview />
    </>
  );
}
