import { CSSProperties } from 'react';
import { AnimationComponentDivProps, AnimationComponentProps } from 'src/global';
import { cn } from 'src/lib/utils';

interface ClockLoaderProps extends AnimationComponentProps {
  isReverse?: boolean;
}

export default function ClockLoader({
  color = 'var(--primary-main)',
  size = 80,
  isReverse = false,
}: ClockLoaderProps) {
  return (
    <div
      className="ClockLoader_root relative inline-block rounded-[50%] border-[1px] perspective-[800]"
      style={
        {
          width: size,
          height: size,
          '--color': color,
          animationDirection: isReverse ? 'reverse' : 'normal',
        } as CSSProperties
      }
    >
      <div
        className="ClockLoader_item ClockLoader top-[5%] right-[50%] h-[45%]"
        style={
          {
            '--animation-time': '2s',
            '--color': color,
            animationDirection: isReverse ? 'reverse' : 'normal',
          } as CSSProperties
        }
      />
      <div
        className="ClockLoader_item ClockLoader top-[15%] right-[50%] h-[35%]"
        style={
          {
            '--animation-time': '10s',
            '--color': color,
            animationDirection: isReverse ? 'reverse' : 'normal',
          } as CSSProperties
        }
      />
      <div
        className="ClockLoader_item ClockLoader top-[25%] right-[50%] h-[25%]"
        style={{ '--animation-time': '20s', '--color': color } as CSSProperties}
      />
    </div>
  );
}

export function ClockLoaderBox({
  iconProps,
  ...props
}: AnimationComponentDivProps<ClockLoaderProps>) {
  return (
    <div {...props} className={cn('flex justify-center', props.className)}>
      <ClockLoader {...iconProps} />
    </div>
  );
}
