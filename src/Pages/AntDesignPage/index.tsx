import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import useTranslate from 'src/hooks/useTranslate';
import TailwindOnly from './tailwind-only';

export default function AntDesignPage() {
  const { t } = useTranslate();

  return (
    <>
      <CssBreadcrumbs configs={[{ label: t('ant-design') }]} props={{ mb: 2 }} />
      <TailwindOnly />
    </>
  );
}
