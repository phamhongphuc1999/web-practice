import { Box, Button, Pagination } from '@mui/material';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
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
import { CircleRingBox } from 'src/components/animation-component/circle-ring';
import { ROUTE } from 'src/configs/constance';
import usePagination from 'src/hooks/usePagination';
import useTranslate from 'src/hooks/useTranslate';
import Item from './item';

export default function AnimationPage() {
  const { t } = useTranslate();
  const history = useHistory();
  const { page } = useParams<{ page?: string }>();

  const ComponentList = [
    {
      label: '3D Circle Loader',
      icon: <ZCircleLoaderBox props={{ mt: 2 }} iconProps={{ size: '150px' }} />,
    },
    {
      label: 'Ellipsis Loader',
      icon: <EllipsisLoaderBox props={{ mt: 2 }} iconProps={{ size: '150px' }} />,
    },
    {
      label: 'Circle Loader',
      icon: <CircleLoaderBox props={{ mt: 2 }} iconProps={{ size: '150px' }} />,
    },
    {
      label: 'Bounce Loader',
      icon: <BounceLoaderBox props={{ mt: 2 }} iconProps={{ size: '150px' }} />,
    },
    {
      label: 'Fade Loader',
      icon: <FadeLoaderBox props={{ mt: 2 }} iconProps={{ size: '150px' }} />,
    },
    {
      label: 'Clock Loader',
      icon: <ClockLoaderBox props={{ mt: 2 }} iconProps={{ size: '150px' }} />,
    },
    {
      label: 'Grid Circle Loader',
      icon: <GridLoaderBox props={{ mt: 2 }} iconProps={{ size: '150px' }} />,
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
      icon: <PuffLoaderBox props={{ mt: 2 }} iconProps={{ size: '150px' }} />,
    },
    {
      label: 'Gooey',
      icon: <GooeyBox props={{ mt: 2 }} iconProps={{ opposite: false, size: '150px' }} />,
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
      icon: <CircleRingBox props={{ mt: 2 }} iconProps={{ size: '150px' }} />,
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
    { label: 'Blocks', icon: <BlockLoaderBox props={{ mt: 2 }} /> },
  ];
  const { data, jump, maxPage, currentPage } = usePagination(ComponentList, { rowPerPage: 6 });

  useEffect(() => {
    jump(Number(page));
  }, [page]);

  function onPageChange(page: number) {
    history.push(`${ROUTE.ANIMATION}/${page}`);
  }

  return (
    <>
      <CssBreadcrumbs configs={[{ label: t('animation') }]} props={{ mb: 2 }} />
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
