import { ReactElement } from 'react';
import { Box, Theme, Typography, useTheme } from '@mui/material';
import { BounceLoaderBox } from 'src/components/AnimationComponent/BounceLoader';
import { CircleLoaderBox } from 'src/components/AnimationComponent/CircleLoader';
import { EllipsisIconBox } from 'src/components/AnimationComponent/EllipsisIcon';
import { FadeLoaderBox } from 'src/components/AnimationComponent/FadeLoader';
import { LoadingIconBox } from 'src/components/AnimationComponent/LoadingIcon';
import { ClockLoaderBox } from 'src/components/AnimationComponent/ClockLoader';
import { RiseLoaderBox } from 'src/components/AnimationComponent/RiseLoader';

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
        {Icon}
      </Box>
    </Box>
  );
}

export default function AnimationPage() {
  return (
    <Box display="flex" flexWrap="wrap">
      <Item label="Loading" Icon={<LoadingIconBox props={{ mt: 2 }} />} />
      <Item label="Ellipsis Icon" Icon={<EllipsisIconBox props={{ mt: 2 }} />} />
      <Item label="Bounce Loader" Icon={<BounceLoaderBox props={{ mt: 2 }} />} />
      <Item label="Circle Loader" Icon={<CircleLoaderBox props={{ mt: 2 }} />} />
      <Item label="Fade Loader" Icon={<FadeLoaderBox props={{ mt: 2 }} />} />
      <Item label="Clock Loader" Icon={<ClockLoaderBox props={{ mt: 2 }} />} />
      <Item label="Rise Loader" Icon={<RiseLoaderBox props={{ mt: 2 }} />} />
    </Box>
  );
}
