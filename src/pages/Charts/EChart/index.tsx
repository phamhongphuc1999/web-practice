import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import ReactSeo from 'src/components/ReactSeo';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import LineChart from './LineChart';

export default function EChart() {
  const { t } = useLocalTranslate();

  return (
    <div className="min-w-screen min-h-screen bg-[#000000]">
      <ReactSeo title={t('eChart')} />
      <CssBreadcrumbs configs={[{ label: t('eChart') }]} mb={2} />
      <LineChart />
    </div>
  );
}
