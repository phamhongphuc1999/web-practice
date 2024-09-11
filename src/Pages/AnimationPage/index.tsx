import { Box, Button, Pagination } from '@mui/material';
import { usePagination } from '@peter-present/react-hook-utils';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import ReactSeo from 'src/components/ReactSeo';
import { BlockLoaderBox } from 'src/components/animation-component/BlockLoader';
import { BounceLoaderBox } from 'src/components/animation-component/BounceLoader';
import { CircleLoaderBox } from 'src/components/animation-component/CircleLoader';
import { ClockLoaderBox } from 'src/components/animation-component/ClockLoader';
import { EllipsisLoaderBox } from 'src/components/animation-component/EllipsisLoader';
import { FadeLoaderBox } from 'src/components/animation-component/FadeLoader';
import { GooeyBox } from 'src/components/animation-component/Gooey';
import { GridLoaderBox } from 'src/components/animation-component/GridLoader';
import { PuffLoaderBox } from 'src/components/animation-component/PuffLoader';
import { ZCircleLoaderBox } from 'src/components/animation-component/ZCircleLoader';
import { CircleDotBox } from 'src/components/animation-component/circle-dot-loader';
import { CircleRingBox } from 'src/components/animation-component/circle-ring';
import PieceDropAnimation from 'src/components/animation-component/piece-drop-animation';
import { ROUTE } from 'src/configs/constance';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import Item from './item';

export default function AnimationPage() {
  const { t } = useLocalTranslate();
  const history = useHistory();
  const { page } = useParams<{ page?: string }>();

  const ComponentList = [
    {
      label: '3D Circle Loader',
      icon: <ZCircleLoaderBox mt={2} iconProps={{ size: '150px' }} />,
    },
    {
      label: 'Ellipsis Loader',
      icon: <EllipsisLoaderBox mt={2} iconProps={{ size: '150px' }} />,
    },
    {
      label: 'Circle Loader',
      icon: <CircleLoaderBox mt={2} iconProps={{ size: '150px' }} />,
    },
    {
      label: 'Bounce Loader',
      icon: <BounceLoaderBox mt={2} iconProps={{ size: '150px' }} />,
      componentEnd: (
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push(`${ROUTE.ANIMATION}-bounce/${page}`)}
        >
          see more
        </Button>
      ),
    },
    {
      label: 'Fade Loader',
      icon: <FadeLoaderBox mt={2} iconProps={{ size: '150px' }} />,
    },
    {
      label: 'Clock Loader',
      icon: <ClockLoaderBox mt={2} iconProps={{ size: '150px' }} />,
      componentEnd: (
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push(`${ROUTE.ANIMATION}-clock/${page}`)}
        >
          see more
        </Button>
      ),
    },
    {
      label: 'Grid Circle Loader',
      icon: <GridLoaderBox mt={2} iconProps={{ size: '150px' }} />,
      componentEnd: (
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push(`${ROUTE.ANIMATION}-grid/${page}`)}
        >
          see more
        </Button>
      ),
    },
    {
      label: 'Puff Loader',
      icon: <PuffLoaderBox mt={2} iconProps={{ size: '150px' }} />,
    },
    {
      label: 'Gooey',
      icon: <GooeyBox mt={2} iconProps={{ opposite: false, size: '150px' }} />,
      componentEnd: (
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push(`${ROUTE.ANIMATION}-gooey/${page}`)}
        >
          see more
        </Button>
      ),
    },
    {
      label: 'Ring',
      icon: <CircleRingBox mt={2} iconProps={{ size: '150px' }} />,
      componentEnd: (
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push(`${ROUTE.ANIMATION}-circle/${page}`)}
        >
          see more
        </Button>
      ),
    },
    { label: 'Blocks', icon: <BlockLoaderBox mt={2} /> },
    {
      label: 'Circle Dot Loader',
      icon: <CircleDotBox mt={2} iconProps={{ size: '150px' }} />,
    },
    {
      label: 'Drop Animation',
      icon: <PieceDropAnimation sx={{ width: '100%', height: '150px' }} />,
      componentEnd: (
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push(`${ROUTE.ANIMATION}-drop-animation/${page}`)}
        >
          see more
        </Button>
      ),
    },
  ];
  const { data, jump, maxPage, currentPage } = usePagination(ComponentList, { itemsPerPage: 6 });

  useEffect(() => {
    jump(Number(page));
  }, [page]);

  function onPageChange(page: number) {
    history.push(`${ROUTE.ANIMATION}/${page}`);
  }

  return (
    <>
      <ReactSeo title={t('animation')} />
      <CssBreadcrumbs configs={[{ label: t('animation') }]} mb={2} />
      <Button
        variant="contained"
        sx={{ width: '5rem' }}
        onClick={() => history.push(`${ROUTE.ANIMATION}-3d`)}
      >
        3D
      </Button>
      <Box display="flex" flexWrap="wrap">
        {data.map((item, index) => {
          return (
            <Item
              key={index}
              label={item.label}
              Icon={item.icon}
              Component={{ end: item?.componentEnd }}
            />
          );
        })}
      </Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Pagination
          page={currentPage}
          count={maxPage}
          showFirstButton
          showLastButton
          onChange={(_, page) => onPageChange(page)}
        />
      </Box>
    </>
  );
}
