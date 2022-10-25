import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';

export default function ConfigPage() {
  return (
    <>
      <CssBreadcrumbs configs={[{ label: 'config' }]} props={{ mb: 2 }} />
    </>
  );
}
