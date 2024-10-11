import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import ReactSeo from 'src/components/ReactSeo';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import TailwindOnly from './TailwindOnly';

export default function AntDesignPage() {
  const { t } = useLocalTranslate();

  return (
    <>
      <ReactSeo title="Ant Design" />
      <CssBreadcrumbs configs={[{ label: t('ant-design') }]} mb={2} />
      <TailwindOnly />
    </>
  );
}
