import { CSSProperties } from 'react';
import { AnimationComponentDivProps, AnimationComponentProps } from 'src/global';
import { cn } from 'src/lib/utils';

export default function CircleLoader({
  color = 'var(--primary-main)',
  size = 80,
}: AnimationComponentProps) {
  return (
    <div
      className="relative inline-block rounded-[50%] perspective-[800]"
      style={{ width: size, height: size }}
    >
      <div
        className="CircleLoader_keyframes_circle h-full w-full border-b-[1px]"
        style={{ '--animation-time': '1.2s', '--color': color } as CSSProperties}
      />
      <div
        className="CircleLoader_keyframes_circle right-[10%] h-[80%] w-[80%] border-r-[1px]"
        style={{ '--animation-time': '1.2s', '--color': color } as CSSProperties}
      />
      <div
        className="CircleLoader_keyframes_circle right-[25%] h-[60%] w-[60%] border-t-[1px]"
        style={{ '--animation-time': '1.2s', '--color': color } as CSSProperties}
      />
      <div
        className="CircleLoader_keyframes_circle right-[35%] h-[40%] w-[40%] border-l-[1px]"
        style={{ '--animation-time': '1.4s', '--color': color } as CSSProperties}
      />
    </div>
  );
}

export function CircleLoaderBox({ iconProps, ...props }: AnimationComponentDivProps) {
  return (
    <div {...props} className={cn('flex justify-center', props.className)}>
      <CircleLoader {...iconProps} />
    </div>
  );
}
