import { Box, Theme, keyframes, styled } from '@mui/material';
import { SystemStyleObject } from '@mui/system';
import { AnimationComponentBoxProps, AnimationComponentProps } from 'src/global';

const rotate = keyframes`
  0% { border-radius: 50%; transform: translate(-50%, -50%) rotate(0deg); }
  50% { border-radius: 5%; transform: translate(-50%, -50%) rotate(180deg); }
  100% { border-radius: 50%; transform:translate(-50%, -50%) rotate(360deg); }
`;

const Circle = styled('div')`
  position: absolute;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(0deg);
`;

function getStyle(
  size: string | number | undefined,
  min: number,
  numberOfItems: number,
  opposite?: boolean
) {
  if (numberOfItems <= 1) numberOfItems = 2;
  if (min <= 0 || min > 0.25) min = 0.25;
  const offset = (1 - min) / (numberOfItems - 1);
  const result: Array<SystemStyleObject<Theme>> = [
    { width: size, height: size, animation: `${rotate} 2s linear infinite` },
  ];
  let counter = 1;
  let _size = 1 - offset;
  while (counter < numberOfItems) {
    result.push({
      width: `calc(${size} * ${_size})`,
      height: `calc(${size} * ${_size})`,
      animationDirection: opposite && counter % 2 == 1 ? 'reverse' : 'normal',
    });
    _size -= offset;
    counter++;
  }
  return result;
}

interface Props extends AnimationComponentProps {
  numberOfItems?: number;
  min?: number;
  opposite?: boolean;
}

export default function Gooey({
  color,
  size,
  numberOfItems = 4,
  min = 0.25,
  opposite = false,
}: Props) {
  return (
    <Box sx={{ display: 'inline-block', width: size, height: size, perspective: 800 }}>
      {getStyle(size, min, numberOfItems, opposite).map((data, index) => {
        return (
          <Circle
            key={index}
            sx={[{ borderColor: color, animation: `${rotate} 2s linear infinite` }, data]}
          />
        );
      })}
    </Box>
  );
}

Gooey.defaultProps = {
  size: 80,
  color: 'primary.main',
  numberOfItems: 4,
  opposite: false,
};

export function GooeyBox({ iconProps, props }: AnimationComponentBoxProps<Props>) {
  return (
    <Box display="flex" justifyContent="center" {...props}>
      <Gooey {...iconProps} />
    </Box>
  );
}
