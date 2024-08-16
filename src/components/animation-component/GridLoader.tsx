import { Box, keyframes, styled } from '@mui/material';
import { AnimationComponentBoxProps, AnimationComponentProps } from 'src/global';

const point = keyframes`
  0% { width: 15%; height: 15%; }
  100% { width: 25%; height: 25%; }
`;
const block = keyframes`
  0% { width: 33.333333%; height: 33.333333%; }
  100% { width: 15%; height: 15%; }
`;
const gooeyBlock = keyframes`
  0% { width: 33.333333%; height: 33.333333%; border-radius: 50%; }
  100% { width: 15%; height: 15%; border-radius: 5%; }
`;

const Point = styled('div')`
  position: absolute;
  box-sizing: border-box;
  border-radius: 50%;
  width: 15%;
  height: 15%;
  transform: translate(-50%, -50%);
`;

const Block = styled('div')`
  position: absolute;
  box-sizing: border-box;
  width: 33.333333%;
  height: 33.333333%;
  transform: translate(-50%, -50%);
`;

interface GridLoaderProps extends AnimationComponentProps {
  mode?: 'circle' | 'block' | 'gooey';
}

export default function GridLoader({ color, size, mode }: GridLoaderProps) {
  const Item = mode == 'block' || mode == 'gooey' ? Block : Point;
  let animation = `${point} 0.5s linear infinite alternate`;
  if (mode === 'block') animation = `${block} 0.5s linear infinite alternate`;
  else if (mode === 'gooey') animation = `${gooeyBlock} 0.5s linear infinite alternate`;
  const _sx = { backgroundColor: color, animation: animation };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-block',
        boxSizing: 'border-box',
        height: size,
        width: size,
      }}
    >
      <Item sx={[_sx, { top: '5%', left: '5%' }]} />
      <Item sx={[_sx, { top: '5%', left: '50%', animationDelay: '0.25s' }]} />
      <Item sx={[_sx, { top: '5%', left: '95%', animationDelay: '0.5s' }]} />
      <Item sx={[_sx, { top: '50%', left: '5%', animationDelay: '0.75s' }]} />
      <Item sx={[_sx, { top: '50%', left: '50%', animationDelay: '1s' }]} />
      <Item sx={[_sx, { top: '50%', left: '95%', animationDelay: '1.25s' }]} />
      <Item sx={[_sx, { top: '95%', left: '5%', animationDelay: '1.5s' }]} />
      <Item sx={[_sx, { top: '95%', left: '50%', animationDelay: '1.75s' }]} />
      <Item sx={[_sx, { top: '95%', left: '95%', animationDelay: '2s' }]} />
    </Box>
  );
}

GridLoader.defaultProps = {
  size: 80,
  color: 'primary.main',
  isBlock: false,
};

export function GridLoaderBox({
  iconProps,
  ...props
}: AnimationComponentBoxProps<GridLoaderProps>) {
  return (
    <Box display="flex" justifyContent="center" {...props}>
      <GridLoader {...iconProps} />
    </Box>
  );
}
