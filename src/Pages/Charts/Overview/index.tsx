import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import useTranslate from 'src/hooks/useTranslate';
import LineChartOverview from './LineChartOverview';

export default function Overview() {
  const { t } = useTranslate();

  return (
    <>
      <CssBreadcrumbs configs={[{ label: t('chart') }]} props={{ mb: 2 }} />
      <LineChartOverview />
    </>
  );
}
