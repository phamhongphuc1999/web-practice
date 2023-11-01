import { Box, Pagination, Theme, Typography, useTheme } from '@mui/material';
import { ReactElement, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { BlockLoaderBox } from 'src/components/animation-component/BlockLoader';
import { BounceLoaderBox } from 'src/components/animation-component/BounceLoader';
import { CircleRingBox } from 'src/components/animation-component/circle-ring';
import { CircleLoaderBox } from 'src/components/animation-component/CircleLoader';
import { ClockLoaderBox } from 'src/components/animation-component/ClockLoader';
import { EllipsisLoaderBox } from 'src/components/animation-component/EllipsisLoader';
import { FadeLoaderBox } from 'src/components/animation-component/FadeLoader';
import { ColorfulGooeyBox, GooeyBox } from 'src/components/animation-component/Gooey';
import { GridLoaderBox } from 'src/components/animation-component/GridLoader';
import { PuffLoaderBox } from 'src/components/animation-component/PuffLoader';
import { ZCircleLoaderBox } from 'src/components/animation-component/ZCircleLoader';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import { ROUTE } from 'src/configs/constance';
import usePagination from 'src/hooks/usePagination';
import useTranslate from 'src/hooks/useTranslate';

function useStyle(theme: Theme) {
  return {
    box: {
      display: 'flex',
      flexDirection: 'column',
      width: '33.333%',
      padding: '2rem 0rem',
      [theme.breakpoints.only('sm')]: {
        width: '50%',
      },
      [theme.breakpoints.only('xs')]: {
        width: '100%',
      },
    },
    itemBox: {
      height: '100%',
      margin: '0rem 2rem',
      padding: '0.5rem',
      border: '1px solid',
      borderRadius: '10px',
    },
  };
}

interface ItemProps {
  label: string;
  Icon: ReactElement;
  Component?: {
    start?: ReactElement;
    end?: ReactElement;
  };
}

function Item({ label, Icon, Component }: ItemProps) {
  const theme = useTheme();
  const cls = useStyle(theme);

  return (
    <Box sx={cls.box}>
      <Box sx={cls.itemBox}>
        <Typography sx={{ textAlign: 'center' }}>{label}</Typography>
        <Box>{Component?.start}</Box>
        <Box mt={5} mb={2}>
          {Icon}
        </Box>
        <Box>{Component?.end}</Box>
      </Box>
    </Box>
  );
}

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
  { label: 'Fade Loader', icon: <FadeLoaderBox props={{ mt: 2 }} iconProps={{ size: '150px' }} /> },
  {
    label: 'Clock Loader',
    icon: <ClockLoaderBox props={{ mt: 2 }} iconProps={{ size: '150px' }} />,
  },
  {
    label: 'Grid Circle Loader',
    icon: <GridLoaderBox props={{ mt: 2 }} iconProps={{ size: '150px' }} />,
  },
  {
    label: 'Grid Square Loader',
    icon: <GridLoaderBox props={{ mt: 2 }} iconProps={{ mode: 'block', size: '150px' }} />,
  },
  {
    label: 'Gird Gooey Loader',
    icon: <GridLoaderBox props={{ mt: 2 }} iconProps={{ mode: 'gooey', size: '150px' }} />,
  },
  { label: 'Puff Loader', icon: <PuffLoaderBox props={{ mt: 2 }} iconProps={{ size: '150px' }} /> },
  {
    label: 'Gooey',
    icon: <GooeyBox props={{ mt: 2 }} iconProps={{ opposite: false, size: '150px' }} />,
  },
  {
    label: 'Contained gooey',
    icon: <GooeyBox type="contained" props={{ mt: 2 }} iconProps={{ size: '150px' }} />,
  },
  {
    label: 'Colorful gooey',
    icon: <ColorfulGooeyBox props={{ mt: 2 }} iconProps={{ size: '150px' }} />,
  },
  {
    label: 'Opposite gooey',
    icon: <GooeyBox props={{ mt: 2 }} iconProps={{ opposite: true, size: '150px' }} />,
  },
  {
    label: 'Opposite colorful gooey',
    icon: <ColorfulGooeyBox props={{ mt: 2 }} iconProps={{ opposite: true, size: '150px' }} />,
  },
  { label: 'Blocks', icon: <BlockLoaderBox props={{ mt: 2 }} /> },
  { label: 'Ring', icon: <CircleRingBox props={{ mt: 2 }} iconProps={{ size: '150px' }} /> },
];

export default function AnimationPage() {
  const { t } = useTranslate();
  const history = useHistory();
  const { page } = useParams<{ page?: string }>();
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
          return <Item key={index} label={item.label} Icon={item.icon} />;
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
