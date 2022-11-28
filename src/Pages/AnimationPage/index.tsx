import { Box, Theme, Typography, useTheme } from '@mui/material';
import { ReactElement } from 'react';
import { BounceLoaderBox } from 'src/components/AnimationComponent/BounceLoader';
import { CircleLoaderBox } from 'src/components/AnimationComponent/CircleLoader';
import { ClockLoaderBox } from 'src/components/AnimationComponent/ClockLoader';
import { EllipsisLoaderBox } from 'src/components/AnimationComponent/EllipsisLoader';
import { FadeLoaderBox } from 'src/components/AnimationComponent/FadeLoader';
import { GridLoaderBox } from 'src/components/AnimationComponent/GridLoader';
import { PuffLoaderBox } from 'src/components/AnimationComponent/PuffLoader';
import { ZCircleLoaderBox } from 'src/components/AnimationComponent/ZCircleLoader';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';

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
}

function Item({ label, Icon }: ItemProps) {
  const theme = useTheme();
  const cls = useStyle(theme);

  return (
    <Box sx={cls.box}>
      <Box sx={cls.itemBox}>
        <Typography sx={{ textAlign: 'center' }}>{label}</Typography>
        <Box mt={5} mb={2}>
          {Icon}
        </Box>
      </Box>
    </Box>
  );
}

export default function AnimationPage() {
  return (
    <>
      <CssBreadcrumbs configs={[{ label: 'animation' }]} props={{ mb: 2 }} />
      <Box display="flex" flexWrap="wrap">
        <Item label="3D Circle Loader" Icon={<ZCircleLoaderBox props={{ mt: 2 }} />} />
        <Item label="Ellipsis Loader" Icon={<EllipsisLoaderBox props={{ mt: 2 }} />} />
        <Item label="Bounce Loader" Icon={<BounceLoaderBox props={{ mt: 2 }} />} />
        <Item label="Circle Loader" Icon={<CircleLoaderBox props={{ mt: 2 }} />} />
        <Item label="Fade Loader" Icon={<FadeLoaderBox props={{ mt: 2 }} />} />
        <Item label="Clock Loader" Icon={<ClockLoaderBox props={{ mt: 2 }} />} />
        <Item label="Grid Loader" Icon={<GridLoaderBox props={{ mt: 2 }} />} />
        <Item label="Puff Loader" Icon={<PuffLoaderBox props={{ mt: 2 }} />} />
      </Box>
    </>
  );
}
