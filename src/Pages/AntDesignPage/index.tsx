import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import useTranslate from 'src/hooks/useTranslate';
import TailwindOnly from './TailwindOnly';
import ScrollComponent from './ScrollComponent';

export default function AntDesignPage() {
  const { t } = useTranslate();

  return (
    <>
      <CssBreadcrumbs configs={[{ label: t('ant-design') }]} mb={2} />
      <TailwindOnly />
      <ScrollComponent />
    </>
  );
}
