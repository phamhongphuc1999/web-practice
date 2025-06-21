import { CSSProperties } from 'react';
import { AnimationComponentDivProps, AnimationComponentProps } from 'src/global';
import { cn } from 'src/lib/utils';

interface Props extends AnimationComponentProps {
  mode?: 'normal' | 'square' | 'dynamic';
}

export default function BounceLoader({
  color = 'var(--primary-main)',
  size = 80,
  mode = 'normal',
}: Props) {
  return (
    <div className="perspective-[800] relative inline-block" style={{ width: size, height: size }}>
      <div
        className={cn(
          mode == 'dynamic' ? 'BounceLoader1' : 'BounceLoader2',
          mode == 'square' && 'rounded-0',
          'BounceLoader h-full w-full opacity-10'
        )}
        style={{ '--color': color } as CSSProperties}
      />
      <div
        className={cn(
          mode == 'dynamic' ? 'BounceLoader1' : 'BounceLoader2',
          mode == 'square' && 'rounded-0',
          'BounceLoader h-0 w-0 opacity-100'
        )}
        style={{ animationDirection: 'reverse', '--color': color } as CSSProperties}
      />
    </div>
  );
}

export function BounceLoaderBox({ iconProps, ...props }: AnimationComponentDivProps<Props>) {
  return (
    <div {...props} className={cn('flex justify-center', props.className)}>
      <BounceLoader {...iconProps} />
    </div>
  );
}
