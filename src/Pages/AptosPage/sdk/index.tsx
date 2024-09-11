import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import ReactSeo from 'src/components/ReactSeo';
import { ROUTE } from 'src/configs/constance';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import Information from './Information';
import MoveContract from './move-contract';

export default function SDK() {
  const { t } = useLocalTranslate();

  return (
    <div>
      <ReactSeo title={t('title.aptosSdk')} />
      <CssBreadcrumbs
        configs={[{ label: t('aptos'), link: ROUTE.APTOS }, { label: 'Aptos SDK' }]}
        mb={2}
      />
      <MoveContract />
      <Information />
    </div>
  );
}
