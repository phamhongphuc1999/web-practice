import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import { BounceLoaderBox } from 'src/components/animation-component/BounceLoader';
import { ROUTE } from 'src/configs/constance';
import useTranslate from 'src/hooks/useTranslate';
import Item from './item';

export default function BouncePage() {
  const { t } = useTranslate();
  const { page } = useParams<{ page?: string }>();

  return (
    <>
      <CssBreadcrumbs
        configs={[
          { label: t('animation'), link: `${ROUTE.ANIMATION}/${page}` },
          { label: t('animationBounce') },
        ]}
      />
      <Box display="flex" flexWrap="wrap">
        <Item
          label="Bounce Loader"
          Icon={<BounceLoaderBox mt={2} iconProps={{ size: '150px' }} />}
        />
        <Item
          label="Square Bounce Loader"
          Icon={<BounceLoaderBox mt={2} iconProps={{ size: '150px', mode: 'square' }} />}
        />
        <Item
          label="Dynamic Bounce Loader"
          Icon={<BounceLoaderBox mt={2} iconProps={{ size: '150px', mode: 'dynamic' }} />}
        />
      </Box>
    </>
  );
}
