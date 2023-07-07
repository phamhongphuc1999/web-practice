import { Box, keyframes, styled } from '@mui/material';
import { AnimationComponentBoxProps, AnimationComponentProps } from 'src/global';

const bounce = keyframes`
  from {width: 100%; height: 100%; opacity: 0.1;};
  to {width: 0%; height: 0%; opacity: 1;};
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
  const _sx = { backgroundColor: color, animation: `${bounce} 1.2s linear infinite` };
  return (
    <Box
      sx={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: '50%',
        perspective: 800,
      }}
    >
      <Inner sx={[{ width: '100%', height: '100%', opacity: 0.1 }, _sx]} />
      <Inner sx={[_sx, { width: '0%', height: '0%', opacity: 1, animationDirection: 'reverse' }]} />
    </Box>
  );
}

BounceLoader.defaultProps = {
  size: 80,
  color: 'primary.main',
};

export function BounceLoaderBox({ iconProps, props }: AnimationComponentBoxProps) {
  return (
    <Box display="flex" justifyContent="center" {...props}>
      <BounceLoader {...iconProps} />
    </Box>
  );
}
