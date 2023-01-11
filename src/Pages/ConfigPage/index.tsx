import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import useTranslate from 'src/hooks/useTranslate';

export default function ConfigPage() {
  const { t } = useTranslate();

  return (
    <>
      <CssBreadcrumbs configs={[{ label: t('config') }]} props={{ mb: 2 }} />
    </>
  );
}
