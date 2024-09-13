import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import ReactSeo from 'src/components/ReactSeo';
import { BounceLoaderBox } from 'src/components/animation-component/BounceLoader';
import { ROUTE } from 'src/configs/constance';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import Item from './item';

export default function BouncePage() {
  const { t } = useLocalTranslate();
  const { page } = useParams<{ page?: string }>();

  return (
    <>
      <ReactSeo title={`${t('animation')} | ${t('animationBounce')}`} />
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
