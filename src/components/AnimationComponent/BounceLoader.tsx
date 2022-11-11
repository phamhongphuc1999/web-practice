import { Box, BoxProps, keyframes, styled } from '@mui/material';
import { AnimationComponentProps } from 'src/global';

const bounce1 = keyframes`
  from {width: 100%; height: 100%; opacity: 0.1;};
  to {width: 0%; height: 0%; opacity: 1;};
`;

const bounce2 = keyframes`
  from {width: 0%; height: 0%; opacity: 1;}
  to {width: 100%; height: 100%; opacity: 0.1;}
`;

const Inner = styled('div')`
  position: absolute;
  box-sizing: border-box;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default function BounceLoader({ color, size }: AnimationComponentProps) {
  return (
    <Box sx={{ display: 'inline-block', width: size, height: size, borderRadius: '50%', perspective: 800 }}>
      <Inner
        sx={{
          backgroundColor: color,
          width: '100%',
          height: '100%',
          opacity: 0.1,
          animation: `${bounce1} 1.2s linear infinite`,
        }}
      />
      <Inner
        sx={{
          backgroundColor: color,
          width: '0%',
          height: '0%',
          opacity: 1,
          animation: `${bounce2} 1.2s linear infinite`,
        }}
      />
    </Box>
  );
}

BounceLoader.defaultProps = {
  size: 80,
  color: 'primary.main',
};

interface BounceLoaderBoxProps {
  iconProps?: AnimationComponentProps;
  props?: BoxProps;
}

export function BounceLoaderBox({ iconProps, props }: BounceLoaderBoxProps) {
  return (
    <Box display="flex" justifyContent="center" {...props}>
      <BounceLoader {...iconProps} />
    </Box>
  );
}
