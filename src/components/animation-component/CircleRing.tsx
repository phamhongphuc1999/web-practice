import { Keyframes } from '@emotion/react';
import { Box, keyframes, styled } from '@mui/material';
import { AnimationComponentDivProps, AnimationComponentProps, DivProps } from 'src/global';
import { cn } from 'src/lib/utils';
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

function Line({ size, color, mode, ...props }: Omit<Props, 'numberOfItems'> & DivProps) {
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
      ])}
    >
      <div className="relative h-full">
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
      </div>
    </Box>
  );
}

export default function CircleRing({
  size = 80,
  color = 'var(--primary-main)',
  mode,
  numberOfItems = 4,
}: Props) {
  return (
    <div
      className="relative box-border inline-block rounded-[50%] perspective-[800]"
      style={{ height: size, width: size }}
    >
      {getConfig(numberOfItems).map((item, index) => {
        return (
          <Line
            key={index}
            size={size}
            color={color}
            mode={mode}
            style={{
              animation: `${item.rotate} 4.5s linear infinite`,
              transform: `translateX(50%) rotate(${item.deg}deg)`,
            }}
          />
        );
      })}
    </div>
  );
}

export function CircleRingBox({ iconProps, ...props }: AnimationComponentDivProps<Props>) {
  return (
    <div {...props} className={cn('flex justify-center', props.className)}>
      <CircleRing {...iconProps} />
    </div>
  );
}
