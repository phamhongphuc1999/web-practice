import { CSSProperties } from 'react';
import { AnimationComponentDivProps, AnimationComponentProps } from 'src/global';
import { cn } from 'src/lib/utils';

export default function EllipsisLoader({
  color = 'var(--primary-main)',
  size = 80,
}: AnimationComponentProps) {
  return (
    <div className="relative box-border inline-block" style={{ width: size, height: size }}>
      <div
        className="EllipsisLoader_Ellipsis EllipsisLoader_ellipsis1"
        style={{ '--color': color } as CSSProperties}
      />
      <div
        className="EllipsisLoader_Ellipsis EllipsisLoader_ellipsis2"
        style={{ '--color': color } as CSSProperties}
      />
      <div
        className="EllipsisLoader_Ellipsis EllipsisLoader_ellipsis3"
        style={{ '--color': color } as CSSProperties}
      />
      <div
        className="EllipsisLoader_Ellipsis EllipsisLoader_ellipsis4"
        style={{ '--color': color } as CSSProperties}
      />
    </div>
  );
}

export function EllipsisLoaderBox({ iconProps, ...props }: AnimationComponentDivProps) {
  return (
    <div {...props} className={cn('flex justify-center', props.className)}>
      <EllipsisLoader {...iconProps} />
    </div>
  );
}
