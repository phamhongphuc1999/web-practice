import { Theme } from '@mui/material';
import { SystemStyleObject } from '@mui/system';
import { CSSProperties } from 'react';
import { AnimationComponentDivProps, AnimationComponentProps } from 'src/global';
import { cn } from 'src/lib/utils';

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
    { width: size, height: size, animation: 'Gooey_keyframes 2s linear infinite' },
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
  color = 'var(--primary-main)',
  size = 80,
  numberOfItems = 4,
  min = 0.25,
  opposite = false,
}: Props) {
  return (
    <div className="perspective-[800] relative inline-block" style={{ width: size, height: size }}>
      {getStyle(size, min, numberOfItems, opposite).map((data, index) => {
        return (
          <div
            key={index}
            style={
              {
                ...data,
                borderColor: color,
                animation: 'Gooey_keyframes 2s linear infinite',
              } as CSSProperties
            }
            className="Gooey"
          />
        );
      })}
    </div>
  );
}

export function GooeyBox({ iconProps, ...props }: AnimationComponentDivProps<Props>) {
  return (
    <div {...props} className={cn('flex justify-center', props.className)}>
      <Gooey {...iconProps} />
    </div>
  );
}
