import { Box, keyframes, styled } from '@mui/material';
import { AnimationComponentBoxProps, AnimationComponentProps } from 'src/global';

const animation = keyframes`
  0% { width: 0%; height: 0%; opacity: 1; }
  100% { width: 100%; height: 100%; opacity: 0.1; }
`;

const Circle = styled('div')`
  box-sizing: border-box;
  border-radius: 50%;
`;

export default function PuffLoader({ color, size }: AnimationComponentProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
        height: size,
        width: size,
      }}
    >
      <Circle
        sx={{
          height: '0%',
          width: '0%',
          border: '4px solid',
          borderColor: color,
          animation: `${animation} 2s ease-in infinite`,
        }}
      />
    </Box>
  );
}

PuffLoader.defaultProps = {
  size: 80,
  color: 'primary.main',
};

export function PuffLoaderBox({ iconProps, props }: AnimationComponentBoxProps) {
  return (
    <Box display="flex" justifyContent="center" {...props}>
      <PuffLoader {...iconProps} />
    </Box>
  );
}
