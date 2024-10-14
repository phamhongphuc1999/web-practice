import { Keyframes } from '@emotion/react';
import { Box, BoxProps, keyframes, styled } from '@mui/material';
import { AnimationComponentBoxProps, AnimationComponentProps } from 'src/global';
import { mergeSx } from 'src/services';

function getRotate(beginDeg: number) {
  return keyframes`
  0% { transform: translateX(50%) rotate(${beginDeg}deg); }
  100% { transform: translateX(50%) rotate(${beginDeg + 360}deg); }
`;
}

const rotateItem = keyframes`
  0% { transform: translateX(50%) rotate(360deg); }
  100% { transform: translateX(50%) rotate(0deg); }
`;

const rotateItem1 = keyframes`
  0% { border-radius: 50%; transform: translateX(50%) rotate(360deg); }
  50% { border-radius: 0%; transform: translateX(50%) rotate(180deg); }
  100% { border-radius: 50%; transform: translateX(50%) rotate(0deg); }
`;

function getConfig(numberOfItems: number) {
  if (numberOfItems <= 0) numberOfItems = 1;
  const offset = 360 / numberOfItems;
  const result: Array<{ rotate: Keyframes; deg: number }> = [{ rotate: getRotate(0), deg: 0 }];
  let counter = 1;
  let deg = offset;
  while (counter < numberOfItems) {
    result.push({ rotate: getRotate(deg), deg });
    deg += offset;
    counter++;
  }
  return result;
}

const Wheel = styled(Box)(() => ({
  position: 'absolute',
  boxSizing: 'border-box',
  borderWidth: '1px',
  borderStyle: 'dashed',
}));

interface Props extends AnimationComponentProps {
  mode?: 'normal' | 'square' | 'dynamic';
  numberOfItems?: number;
}

function Line({ size, color, mode, ...props }: Omit<Props, 'numberOfItems'> & BoxProps) {
  return (
    <Box
      {...props}
      sx={mergeSx([
        {
          position: 'absolute',
          boxSizing: 'border-box',
          transformOrigin: 'bottom',
          right: '50%',
          top: `calc(${size} / 6)`,
          height: `calc(${size} / 3)`,
        },
        props?.sx,
      ])}
    >
      <Box sx={{ position: 'relative', height: '100%' }}>
        <Wheel
          sx={[
            {
              borderColor: color,
              right: '50%',
              top: '-50%',
              width: `calc(${size} / 3)`,
              height: `calc(${size} / 3)`,
            },
            mode == 'square' ? { borderStyle: 'solid' } : { borderRadius: '50%' },
            mode == 'dynamic'
              ? { animation: `${rotateItem1} 1.5s linear infinite`, borderStyle: 'solid' }
              : { animation: `${rotateItem} 1.5s linear infinite` },
          ]}
        />
      </Box>
    </Box>
  );
}

export default function CircleRing({ size, color, mode, numberOfItems = 4 }: Props) {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-block',
        boxSizing: 'border-box',
        height: size,
        width: size,
        borderRadius: '50%',
        perspective: 800,
      }}
    >
      {getConfig(numberOfItems).map((item, index) => {
        return (
          <Line
            key={index}
            size={size}
            color={color}
            mode={mode}
            sx={{
              animation: `${item.rotate} 4.5s linear infinite`,
              transform: `translateX(50%) rotate(${item.deg}deg)`,
            }}
          />
        );
      })}
    </Box>
  );
}

CircleRing.defaultProps = {
  size: '80px',
  color: 'primary.main',
};

export function CircleRingBox({ iconProps, ...props }: AnimationComponentBoxProps<Props>) {
  return (
    <Box display="flex" justifyContent="center" {...props}>
      <CircleRing {...iconProps} />
    </Box>
  );
}
