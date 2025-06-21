import { CSSProperties } from 'react';
import { AnimationComponentDivProps, AnimationComponentProps } from 'src/global';
import { cn } from 'src/lib/utils';

export default function PuffLoader({
  color = 'var(--primary-main)',
  size = 80,
}: AnimationComponentProps) {
  return (
    <div
      className="box-border flex items-center justify-center"
      style={{ height: size, width: size }}
    >
      <div className="PuffLoader_item" style={{ '--color': color } as CSSProperties} />
    </div>
  );
}

export function PuffLoaderBox({ iconProps, ...props }: AnimationComponentDivProps) {
  return (
    <div {...props} className={cn('flex justify-center', props.className)}>
      <PuffLoader {...iconProps} />
    </div>
  );
}
