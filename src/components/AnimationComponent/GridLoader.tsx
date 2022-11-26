import { Box, keyframes, styled } from '@mui/material';
import { AnimationComponentBoxProps, AnimationComponentProps } from 'src/global';

const point1 = keyframes`
  0% { width: 15%; height: 15%; top: 5%; left: 5%; }
  50% { width: 25%; height: 25%; top: 0; left: 0; }
  100% { width: 15%; height: 15%; top: 5%; left: 5%; }
`;
const point2 = keyframes`
  0% { width: 15%; height: 15%; top: 5%; }
  50% { width: 25%; height: 25%; top: 0; }
  100% { width: 15%; height: 15%; top: 5%; }
`;
const point3 = keyframes`
  0% { width: 15%; height: 15%; top: 5%; right: 5%; }
  50% { width: 25%; height: 25%; top: 0; right: 0; }
  100% { width: 15%; height: 15%; top: 5%; right: 5%; }
`;
const point4 = keyframes`
  0% { width: 15%; height: 15%; left: 5%; }
  50% { width: 25%; height: 25%; left: 0; }
  100% { width: 15%; height: 15%; left: 5%; }
`;
const point5 = keyframes`
  0% { width: 15%; height: 15%; }
  50% { width: 25%; height: 25%; }
  100% { width: 15%; height: 15%; }
`;
const point6 = keyframes`
  0% { width: 15%; height: 15%; right: 5%; }
  50% { width: 25%; height: 25%; right: 0; }
  100% { width: 15%; height: 15%; right: 5%; }
`;
const point7 = keyframes`
  0% { width: 15%; height: 15%; bottom: 5%; left: 5%; }
  50% { width: 25%; height: 25%; bottom: 0; left: 0; }
  100% { width: 15%; height: 15%; bottom: 5%; left: 5%; }
`;
const point8 = keyframes`
  0% { width: 15%; height: 15%; bottom: 5%; }
  50% { width: 25%; height: 25%; bottom: 0; }
  100% { width: 15%; height: 15%; bottom: 5%; }
`;
const point9 = keyframes`
  0% { width: 15%; height: 15%; bottom: 5%; right: 5%; }
  50% { width: 25%; height: 25%; bottom: 0; right: 0; }
  100% { width: 15%; height: 15%; bottom: 5%; right: 5%; }
`;

const Point = styled('div')`
  position: absolute;
  box-sizing: border-box;
  border-radius: 50%;
  width: 15%;
  height: 15%;
`;

export default function GridLoader({ color, size }: AnimationComponentProps) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-block', boxSizing: 'border-box', height: size, width: size }}>
      <Point sx={{ backgroundColor: color, animation: `${point1} 1s linear infinite`, top: '5%', left: '5%' }} />
      <Point
        sx={{
          backgroundColor: color,
          transform: 'translate(-50%)',
          animation: `${point2} 1.1s linear infinite`,
          left: '50%',
          top: '5%',
        }}
      />
      <Point sx={{ backgroundColor: color, animation: `${point3} 1.2s linear infinite`, top: '5%', right: '5%' }} />
      <Point
        sx={{
          backgroundColor: color,
          transform: 'translateY(-50%)',
          animation: `${point4} 1.3s linear infinite`,
          top: '50%',
          left: '5%',
        }}
      />
      <Point
        sx={{
          backgroundColor: color,
          top: '50%',
          left: '50%',
          transform: 'translateX(-50%) translateY(-50%)',
          animation: `${point5} 1.4s linear infinite`,
        }}
      />
      <Point
        sx={{
          backgroundColor: color,
          top: '50%',
          right: '5%',
          transform: 'translateY(-50%)',
          animation: `${point6} 1.5s linear infinite`,
        }}
      />
      <Point sx={{ backgroundColor: color, bottom: '5%', left: '5%', animation: `${point7} 1.6s linear infinite` }} />
      <Point
        sx={{
          backgroundColor: color,
          bottom: '5%',
          left: '50%',
          transform: 'translate(-50%)',
          animation: `${point8} 1.7s linear infinite`,
        }}
      />
      <Point sx={{ backgroundColor: color, bottom: '5%', right: '5%', animation: `${point9} 1.8s linear infinite` }} />
    </Box>
  );
}

GridLoader.defaultProps = {
  size: 80,
  color: 'primary.main',
};

export function GridLoaderBox({ iconProps, props }: AnimationComponentBoxProps) {
  return (
    <Box display="flex" justifyContent="center" {...props}>
      <GridLoader {...iconProps} />
    </Box>
  );
}
