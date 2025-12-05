import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import ReactSeo from 'src/components/ReactSeo';
import { ROUTE } from 'src/configs/layout';
import useLocalTranslate from 'src/hooks/useLocalTranslate';

export default function GlowingCard() {
  const { t } = useLocalTranslate();

  return (
    <>
      <ReactSeo title={t('glowingCard')} />
      <CssBreadcrumbs
        configs={[{ label: t('utils'), link: ROUTE.UTILS }, { label: t('glowingCard') }]}
        mb={2}
      />
    </>
  );
}
