import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import ReactSeo from 'src/components/ReactSeo';

export default function ShadcnUi() {
  return (
    <>
      <ReactSeo title="shadcn/ui" />
      <CssBreadcrumbs configs={[{ label: 'shadcn/ui' }]} mb={2} />
    </>
  );
}
