import { Box, BoxProps, keyframes, styled } from '@mui/material';
import { AnimationComponentProps } from 'src/global';

const circle1 = keyframes`

`;

const Circle = styled('div')`
  position: absolute;
  box-sizing: border-box;
  border-radius: 50%;
`;

export default function CircleLoader({ color, size }: AnimationComponentProps) {
  return (
    <Box sx={{ display: 'inline-block', width: size, height: size, borderRadius: '50%', perspective: 800 }}>
      <Circle sx={{ borderColor: color, animation: `${circle1} 1.2s linear infinite` }} />
    </Box>
  );
}

CircleLoader.defaultProps = {
  size: 80,
  color: 'primary.main',
};

interface CircleLoaderBoxProps {
  iconProps?: AnimationComponentProps;
  props?: BoxProps;
}

export function CircleLoaderBox({ iconProps, props }: CircleLoaderBoxProps) {
  return (
    <Box display="flex" justifyContent="center" {...props}>
      <CircleLoader {...iconProps} />
    </Box>
  );
}
