import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import { ClockLoaderBox } from 'src/components/animation-component/ClockLoader';
import { ROUTE } from 'src/configs/constance';
import useTranslate from 'src/hooks/useTranslate';
import Item from './item';

export default function ClockPage() {
  const { t } = useTranslate();
  const { page } = useParams<{ page?: string }>();

  return (
    <>
      <CssBreadcrumbs
        configs={[
          { label: t('animation'), link: `${ROUTE.ANIMATION}/${page}` },
          { label: t('animationClock') },
        ]}
      />
      <Box display="flex" flexWrap="wrap">
        <Item label="Clock Loader" Icon={<ClockLoaderBox mt={2} iconProps={{ size: '150px' }} />} />
        <Item
          label="Reverse Clock Loader"
          Icon={<ClockLoaderBox mt={2} iconProps={{ size: '150px', isReverse: true }} />}
        />
      </Box>
    </>
  );
}
