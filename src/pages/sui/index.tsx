import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import SuiConnectionButton from 'src/components/Button/ConnectionButton/sui/sui-connection-button';
import ReactSeo from 'src/components/ReactSeo';
import useLocalTranslate from 'src/hooks/useLocalTranslate';

export default function Sui() {
  const { t } = useLocalTranslate();

  return (
    <>
      <ReactSeo title="SUI Network" />
      <CssBreadcrumbs configs={[{ label: t('sui') }]} mb={2} />
      <SuiConnectionButton />
    </>
  );
}
