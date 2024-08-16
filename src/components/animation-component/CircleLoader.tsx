import { Box, keyframes, styled } from '@mui/material';
import { AnimationComponentBoxProps, AnimationComponentProps } from 'src/global';

const circle = keyframes`
  0% { transform: rotateX(0deg) rotateY(-15deg) rotateZ(0deg); }
  100% { transform: rotateX(0deg) rotateY(-15deg) rotateZ(360deg); }
`;

const Circle = styled('div')`
  position: absolute;
  box-sizing: border-box;
  border-radius: 50%;
`;

export default function CircleLoader({ color, size }: AnimationComponentProps) {
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
      <Circle
        sx={{
          width: '100%',
          height: '100%',
          animation: `${circle} 1.2s linear infinite`,
          borderBottom: '1px solid',
          borderColor: color,
        }}
      />
      <Circle
        sx={{
          width: '80%',
          height: '80%',
          animation: `${circle} 1.2s linear infinite`,
          borderRight: '1px solid',
          borderColor: color,
          right: '10%',
        }}
      />
      <Circle
        sx={{
          width: '60%',
          height: '60%',
          animation: `${circle} 1.2s linear infinite`,
          borderTop: '1px solid',
          borderColor: color,
          right: '25%',
        }}
      />
      <Circle
        sx={{
          width: '40%',
          height: '40%',
          animation: `${circle} 1.4s linear infinite`,
          borderLeft: '1px solid',
          borderColor: color,
          right: '35%',
        }}
      />
    </Box>
  );
}

CircleLoader.defaultProps = {
  size: 80,
  color: 'primary.main',
};

export function CircleLoaderBox({ iconProps, ...props }: AnimationComponentBoxProps) {
  return (
    <Box display="flex" justifyContent="center" {...props}>
      <CircleLoader {...iconProps} />
    </Box>
  );
}
