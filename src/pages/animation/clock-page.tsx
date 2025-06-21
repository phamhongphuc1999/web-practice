import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import ReactSeo from 'src/components/ReactSeo';
import { ClockLoaderBox } from 'src/components/animation-component/ClockLoader';
import { ROUTE } from 'src/configs/layout';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import Item from './item';

export default function ClockPage() {
  const { t } = useLocalTranslate();
  const { page } = useParams<{ page?: string }>();

  return (
    <>
      <ReactSeo title={`${t('animation')} | ${t('animationClock')}`} />
      <CssBreadcrumbs
        configs={[
          { label: t('animation'), link: `${ROUTE.ANIMATION}/${page}` },
          { label: t('animationClock') },
        ]}
      />
      <Box display="flex" flexWrap="wrap">
        <Item
          label="Clock Loader"
          Icon={<ClockLoaderBox className="mt-2" iconProps={{ size: '150px' }} />}
        />
        <Item
          label="Reverse Clock Loader"
          Icon={<ClockLoaderBox className="mt-2" iconProps={{ size: '150px', isReverse: true }} />}
        />
      </Box>
    </>
  );
}
