import { Box, Button, Pagination } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import ColorfulBox from 'src/components/Button/ColorfulBox';
import ReactSeo from 'src/components/ReactSeo';
import { BlockLoaderBox } from 'src/components/animation-component/BlockLoader';
import { BounceLoaderBox } from 'src/components/animation-component/BounceLoader';
import { CircleDotBox } from 'src/components/animation-component/CircleDotLoader';
import { CircleLoaderBox } from 'src/components/animation-component/CircleLoader';
import { CircleRingBox } from 'src/components/animation-component/CircleRing';
import { ClockLoaderBox } from 'src/components/animation-component/ClockLoader';
import { EllipsisLoaderBox } from 'src/components/animation-component/EllipsisLoader';
import { FadeLoaderBox } from 'src/components/animation-component/FadeLoader';
import { GooeyBox } from 'src/components/animation-component/Gooey';
import { GridLoaderBox } from 'src/components/animation-component/GridLoader';
import PieceDropAnimation from 'src/components/animation-component/PieceDropAnimation';
import { PuffLoaderBox } from 'src/components/animation-component/PuffLoader';
import { ZCircleLoaderBox } from 'src/components/animation-component/ZCircleLoader';
import { ROUTE } from 'src/configs/layout';
import { usePagination } from 'src/hooks/use-pagination';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import Item from './item';

export default function Animation() {
  const { t } = useLocalTranslate();
  const navigate = useNavigate();
  const { page } = useParams<{ page?: string }>();

  const ComponentList = [
    {
      label: '3D Circle Loader',
      icon: <ZCircleLoaderBox className="mt-2" iconProps={{ size: '150px' }} />,
    },
    {
      label: 'Ellipsis Loader',
      icon: <EllipsisLoaderBox className="mt-2" iconProps={{ size: '150px' }} />,
    },
    {
      label: 'Circle Loader',
      icon: <CircleLoaderBox className="mt-2" iconProps={{ size: '150px' }} />,
    },
    {
      label: 'Bounce Loader',
      icon: <BounceLoaderBox className="mt-2" iconProps={{ size: '150px' }} />,
      componentEnd: (
        <ColorfulBox onClick={() => navigate(`${ROUTE.ANIMATION}-bounce/${page}`)}>
          {t('seeMore')}
        </ColorfulBox>
      ),
    },
    {
      label: 'Fade Loader',
      icon: <FadeLoaderBox className="mt-2" iconProps={{ size: '150px' }} />,
    },
    {
      label: 'Clock Loader',
      icon: <ClockLoaderBox className="mt-2" iconProps={{ size: '150px' }} />,
      componentEnd: (
        <ColorfulBox color="gray" onClick={() => navigate(`${ROUTE.ANIMATION}-clock/${page}`)}>
          {t('seeMore')}
        </ColorfulBox>
      ),
    },
    {
      label: 'Grid Circle Loader',
      icon: <GridLoaderBox className="mt-2" iconProps={{ size: '150px' }} />,
      componentEnd: (
        <ColorfulBox color="orange" onClick={() => navigate(`${ROUTE.ANIMATION}-grid/${page}`)}>
          {t('seeMore')}
        </ColorfulBox>
      ),
    },
    {
      label: 'Puff Loader',
      icon: <PuffLoaderBox className="mt-2" iconProps={{ size: '150px' }} />,
    },
    {
      label: 'Gooey',
      icon: <GooeyBox className="mt-2" iconProps={{ opposite: false, size: '150px' }} />,
      componentEnd: (
        <ColorfulBox onClick={() => navigate(`${ROUTE.ANIMATION}-gooey/${page}`)}>
          {t('seeMore')}
        </ColorfulBox>
      ),
    },
    {
      label: 'Ring',
      icon: <CircleRingBox className="mt-2" iconProps={{ size: '150px' }} />,
      componentEnd: (
        <ColorfulBox color="gray" onClick={() => navigate(`${ROUTE.ANIMATION}-circle/${page}`)}>
          {t('seeMore')}
        </ColorfulBox>
      ),
    },
    {
      label: 'Blocks',
      icon: <BlockLoaderBox className="mt-2" iconProps={{ size: '150px' }} />,
    },
    {
      label: 'Circle Dot Loader',
      icon: <CircleDotBox className="mt-2" iconProps={{ size: '150px' }} />,
    },
    {
      label: 'Drop Animation',
      icon: <PieceDropAnimation sx={{ width: '100%', height: '150px' }} />,
      componentEnd: (
        <ColorfulBox
          color="orange"
          onClick={() => navigate(`${ROUTE.ANIMATION}-drop-animation/${page}`)}
        >
          {t('seeMore')}
        </ColorfulBox>
      ),
    },
  ];
  const { data, jump, maxPage, currentPage } = usePagination(ComponentList, { itemsPerPage: 6 });

  useEffect(() => {
    jump(Number(page));
  }, [page, jump]);

  function onPageChange(page: number) {
    navigate(`${ROUTE.ANIMATION}/${page}`);
  }

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center">
        <div className="relative h-full w-full">
          <div className="rotate-animation absolute top-[-100vw] right-[-100vh] bottom-[-100vw] left-[-100vh]" />
          <div className="rotate-animation1 absolute top-0 left-0 aspect-square w-full rounded-[50%]" />
        </div>
      </div>
      <ReactSeo title={t('animation')} />
      <CssBreadcrumbs configs={[{ label: t('animation') }]} mb={2} />
      <Button
        variant="contained"
        sx={{ width: '5rem' }}
        onClick={() => navigate(`${ROUTE.ANIMATION}-3d`)}
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
