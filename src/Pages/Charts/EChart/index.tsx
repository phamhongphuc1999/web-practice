import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import LineChart from './LineChart';

export default function EChart() {
  const { t } = useLocalTranslate();

  return (
    <div className="min-h-screen min-w-screen bg-[#000000]">
      <CssBreadcrumbs configs={[{ label: t('eChart') }]} mb={2} />
      <LineChart />
    </div>
  );
}
