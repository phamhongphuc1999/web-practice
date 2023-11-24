import { Box, keyframes, styled } from '@mui/material';
import { AnimationComponentBoxProps, AnimationComponentProps } from 'src/global';

const bounce = keyframes`
  from {width: 100%; height: 100%; opacity: 0.1;};
  to {width: 0%; height: 0%; opacity: 1;};
`;

const bounce1 = keyframes`
  0% {border-radius: 50%; width: 100%; height: 100%; opacity: 0.1;};
  50% {border-radius: 0%; width: 50%; height: 50%; opacity: 0.5;};
  100% {border-radius: 50%; width: 0%; height: 0%; opacity: 1;};
`;

const Inner = styled('div')`
  position: absolute;
  box-sizing: border-box;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

interface Props extends AnimationComponentProps {
  mode?: 'normal' | 'square' | 'dynamic';
}

export default function BounceLoader({ color, size, mode }: Props) {
  const _sx =
    mode == 'dynamic'
      ? { backgroundColor: color, animation: `${bounce1} 1.2s linear infinite` }
      : { backgroundColor: color, animation: `${bounce} 1.2s linear infinite` };

  return (
    <Box sx={{ display: 'inline-block', width: size, height: size, perspective: 800 }}>
      <Inner
        sx={[
          _sx,
          mode == 'square' && { borderRadius: 0 },
          { width: '100%', height: '100%', opacity: 0.1 },
        ]}
      />
      <Inner
        sx={[
          _sx,
          mode == 'square' && { borderRadius: 0 },
          { width: '0%', height: '0%', opacity: 1, animationDirection: 'reverse' },
        ]}
      />
    </Box>
  );
}

BounceLoader.defaultProps = {
  size: 80,
  color: 'primary.main',
};

export function BounceLoaderBox({ iconProps, props }: AnimationComponentBoxProps<Props>) {
  return (
    <Box display="flex" justifyContent="center" {...props}>
      <BounceLoader {...iconProps} />
    </Box>
  );
}
