import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import TailwindOnly from './TailwindOnly';

export default function AntDesignPage() {
  const { t } = useLocalTranslate();

  return (
    <>
      <CssBreadcrumbs configs={[{ label: t('ant-design') }]} mb={2} />
      <TailwindOnly />
    </>
  );
}
