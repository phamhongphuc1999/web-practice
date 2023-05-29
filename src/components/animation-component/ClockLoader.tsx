import { Box, keyframes, styled } from '@mui/material';
import { AnimationComponentBoxProps, AnimationComponentProps } from 'src/global';

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Clock = styled('div')`
  position: absolute;
  box-sizing: border-box;
  width: 1px;
  transform-origin: bottom;
`;

interface ClockLoaderProps extends AnimationComponentProps {
  isReverse?: boolean;
}

export default function ClockLoader({ color, size, isReverse }: ClockLoaderProps) {
  const _sx = { backgroundColor: color, animationDirection: isReverse ? 'reverse' : 'normal' };

  return (
    <Box
      sx={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: '50%',
        border: '1px solid',
        borderColor: color,
        perspective: 800,
      }}
    >
      <Clock sx={[{ animation: `${rotate} 2s linear infinite`, height: '45%', top: '5%', right: '50%' }, _sx]} />
      <Clock sx={[{ animation: `${rotate} 10s linear infinite`, height: '35%', top: '15%', right: '50%' }, _sx]} />
      <Clock sx={[{ animation: `${rotate} 20s linear infinite`, height: '25%', top: '25%', right: '50%' }, _sx]} />
    </Box>
  );
}

ClockLoader.defaultProps = {
  size: 80,
  color: 'primary.main',
  isReverse: false,
};

export function ClockLoaderBox({ iconProps, props }: AnimationComponentBoxProps<ClockLoaderProps>) {
  return (
    <Box display="flex" justifyContent="center" {...props}>
      <ClockLoader {...iconProps} />
    </Box>
  );
}
