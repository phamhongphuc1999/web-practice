import { Box } from '@mui/material';
import { keyframes, styled } from '@mui/system';
import { AnimationComponentBoxProps, AnimationComponentProps } from 'src/global';

const rotate1 = keyframes`
  0% { transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg); }
  100% { transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg); }
`;
const rotate2 = keyframes`
  0% { transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg); }
  100% { transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg); }
`;
const rotate3 = keyframes`
  0% { transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg); }
  100% { transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg); }
`;

const Inner = styled('div')`
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

export default function ZCircleLoader({ color, size }: AnimationComponentProps) {
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
      <Inner
        sx={{
          left: '0%',
          top: '0%',
          animation: `${rotate1} 1.2s linear infinite`,
          borderBottom: '3px solid',
          borderColor: color,
        }}
      />
      <Inner
        sx={{
          right: '0%',
          top: '0%',
          animation: `${rotate2} 1.2s linear infinite`,
          borderRight: '3px solid',
          borderColor: color,
        }}
      />
      <Inner
        sx={{
          right: '0%',
          bottom: '0%',
          animation: `${rotate3} 1.2s linear infinite`,
          borderTop: '3px solid',
          borderColor: color,
        }}
      />
    </Box>
  );
}

ZCircleLoader.defaultProps = {
  size: 80,
  color: 'primary.main',
};

export function ZCircleLoaderBox({ iconProps, ...props }: AnimationComponentBoxProps) {
  return (
    <Box display="flex" justifyContent="center" {...props}>
      <ZCircleLoader {...iconProps} />
    </Box>
  );
}
