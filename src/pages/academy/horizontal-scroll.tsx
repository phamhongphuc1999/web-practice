import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import { ROUTE } from 'src/configs/layout';
import useLocalTranslate from 'src/hooks/useLocalTranslate';

export default function HorizontalScroll() {
  const { t } = useLocalTranslate();

  return (
    <>
      <CssBreadcrumbs
        configs={[
          { label: t('academy'), link: ROUTE.ACADEMY },
          { label: t('academy-item.horizontal-scroll'), isRemain: true },
        ]}
      />
    </>
  );
}
