import { CSSProperties } from 'react';
import { AnimationComponentDivProps, AnimationComponentProps } from 'src/global';
import { cn } from 'src/lib/utils';

export default function ZCircleLoader({
  color = 'var(--primary-main)',
  size = 80,
}: AnimationComponentProps) {
  return (
    <div
      className="perspective-[800] relative inline-block rounded-[50%]"
      style={{ width: size, height: size }}
    >
      <div
        className="ZCircleLoader_inner ZCircleLoader_rotate1"
        style={{ '--color': color } as CSSProperties}
      />
      <div
        className="ZCircleLoader_inner ZCircleLoader_rotate2"
        style={{ '--color': color } as CSSProperties}
      />
      <div
        className="ZCircleLoader_inner ZCircleLoader_rotate3"
        style={{ '--color': color } as CSSProperties}
      />
    </div>
  );
}

export function ZCircleLoaderBox({ iconProps, ...props }: AnimationComponentDivProps) {
  return (
    <div {...props} className={cn('flex justify-center', props.className)}>
      <ZCircleLoader {...iconProps} />
    </div>
  );
}
