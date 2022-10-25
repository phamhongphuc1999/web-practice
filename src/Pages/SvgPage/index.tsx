import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';

export default function SvgPage() {
  return (
    <>
      <CssBreadcrumbs configs={[{ label: 'Svg' }]} props={{ mb: 2 }} />
    </>
  );
}
