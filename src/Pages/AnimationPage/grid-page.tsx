import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import { GridLoaderBox } from 'src/components/animation-component/GridLoader';
import { ROUTE } from 'src/configs/constance';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import Item from './item';

export default function GridPage() {
  const { t } = useLocalTranslate();
  const { page } = useParams<{ page?: string }>();

  return (
    <>
      <CssBreadcrumbs
        configs={[
          { label: t('animation'), link: `${ROUTE.ANIMATION}/${page}` },
          { label: t('animationGrid') },
        ]}
      />
      <Box display="flex" flexWrap="wrap">
        <Item
          label="Grid Circle Loader"
          Icon={<GridLoaderBox mt={2} iconProps={{ size: '150px' }} />}
        />
        <Item
          label="Grid Square Loader"
          Icon={<GridLoaderBox mt={2} iconProps={{ mode: 'block', size: '150px' }} />}
        />
        <Item
          label="Gird Gooey Loader"
          Icon={<GridLoaderBox mt={2} iconProps={{ mode: 'gooey', size: '150px' }} />}
        />
      </Box>
    </>
  );
}
