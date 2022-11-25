import { Box, keyframes, styled } from '@mui/material';
import { AnimationComponentBoxProps, AnimationComponentProps } from 'src/global';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const Clock = styled('div')`
  position: absolute;
  box-sizing: border-box;
  width: 1px;
  transform-origin: bottom;
`;

export default function ClockLoader({ color, size }: AnimationComponentProps) {
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
      <Clock
        sx={{
          animation: `${rotate} 2s linear infinite`,
          height: '45%',
          backgroundColor: color,
          top: '5%',
          right: '50%',
        }}
      />
      <Clock
        sx={{
          animation: `${rotate} 10s linear infinite`,
          height: '35%',
          backgroundColor: color,
          top: '15%',
          right: '50%',
        }}
      />
    </Box>
  );
}

ClockLoader.defaultProps = {
  size: 64,
  color: 'primary.main',
};

export function ClockLoaderBox({ iconProps, props }: AnimationComponentBoxProps) {
  return (
    <Box display="flex" justifyContent="center" {...props}>
      <ClockLoader {...iconProps} />
    </Box>
  );
}
