import { Box, Pagination, Theme, Typography, useTheme } from '@mui/material';
import { ReactElement } from 'react';
import { BlockLoaderBox } from 'src/components/AnimationComponent/BlockLoader';
import { BounceLoaderBox } from 'src/components/AnimationComponent/BounceLoader';
import { CircleLoaderBox } from 'src/components/AnimationComponent/CircleLoader';
import { ClockLoaderBox } from 'src/components/AnimationComponent/ClockLoader';
import { EllipsisLoaderBox } from 'src/components/AnimationComponent/EllipsisLoader';
import { FadeLoaderBox } from 'src/components/AnimationComponent/FadeLoader';
import { ColorfulGooeyBox, GooeyBox } from 'src/components/AnimationComponent/Gooey';
import { GridLoaderBox } from 'src/components/AnimationComponent/GridLoader';
import { PuffLoaderBox } from 'src/components/AnimationComponent/PuffLoader';
import { ZCircleLoaderBox } from 'src/components/AnimationComponent/ZCircleLoader';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import usePagination from 'src/hooks/usePagination';

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
  { label: '3D Circle Loader', icon: <ZCircleLoaderBox props={{ mt: 2 }} /> },
  { label: 'Ellipsis Loader', icon: <EllipsisLoaderBox props={{ mt: 2 }} /> },
  { label: 'Circle Loader', icon: <CircleLoaderBox props={{ mt: 2 }} /> },
  { label: 'Bounce Loader', icon: <BounceLoaderBox props={{ mt: 2 }} /> },
  { label: 'Fade Loader', icon: <FadeLoaderBox props={{ mt: 2 }} /> },
  { label: 'Clock Loader', icon: <ClockLoaderBox props={{ mt: 2 }} /> },
  { label: 'Grid Loader', icon: <GridLoaderBox props={{ mt: 2 }} /> },
  { label: 'Puff Loader', icon: <PuffLoaderBox props={{ mt: 2 }} /> },
  { label: 'Gooey', icon: <GooeyBox props={{ mt: 2 }} iconProps={{ opposite: false }} /> },
  { label: 'Contained gooey', icon: <GooeyBox type="contained" props={{ mt: 2 }} /> },
  { label: 'Colorful gooey', icon: <ColorfulGooeyBox props={{ mt: 2 }} /> },
  { label: 'Opposite gooey', icon: <GooeyBox props={{ mt: 2 }} iconProps={{ opposite: true }} /> },
  { label: 'Opposite colorful gooey', icon: <ColorfulGooeyBox props={{ mt: 2 }} iconProps={{ opposite: true }} /> },
  { label: 'Blocks', icon: <BlockLoaderBox props={{ mt: 2 }} /> },
];

export default function AnimationPage() {
  const { data, jump, maxPage, currentPage } = usePagination(ComponentList);

  function onPageChange(page: number) {
    jump(page);
  }

  return (
    <>
      <CssBreadcrumbs configs={[{ label: 'animation' }]} props={{ mb: 2 }} />
      <Box display="flex" flexWrap="wrap">
        {data.map((item, index) => {
          return <Item key={index} label={item.label} Icon={item.icon} />;
        })}
      </Box>
      <Pagination
        page={currentPage}
        count={maxPage}
        showFirstButton
        showLastButton
        onChange={(_, page) => onPageChange(page)}
      />
    </>
  );
}
