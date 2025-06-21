import { AnimationComponentDivProps, AnimationComponentProps } from 'src/global';
import { cn } from 'src/lib/utils';

interface GridLoaderProps extends AnimationComponentProps {
  mode?: 'circle' | 'block' | 'gooey';
}

export default function GridLoader({
  color = 'var(--primary-main)',
  size = 80,
  mode = 'block',
}: GridLoaderProps) {
  let animation = 'GridLoader_keyframes_point 0.5s linear infinite alternate';
  if (mode === 'block') animation = 'GridLoader_keyframes_block 0.5s linear infinite alternate';
  else if (mode === 'gooey')
    animation = 'GridLoader_keyframes_gooeyBlock 0.5s linear infinite alternate';
  const _style = { backgroundColor: color, animation: animation };
  const _class = mode == 'block' || mode == 'gooey' ? 'GridLoader_block' : 'GridLoader_point';

  return (
    <div className="relative box-border inline-block" style={{ height: size, width: size }}>
      <div className={_class} style={{ ..._style, top: '5%', left: '5%' }} />
      <div
        className={_class}
        style={{ ..._style, top: '5%', left: '50%', animationDelay: '0.25s' }}
      />
      <div
        className={_class}
        style={{ ..._style, top: '5%', left: '95%', animationDelay: '0.5s' }}
      />
      <div
        className={_class}
        style={{ ..._style, top: '50%', left: '5%', animationDelay: '0.75s' }}
      />
      <div
        className={_class}
        style={{ ..._style, top: '50%', left: '50%', animationDelay: '1s' }}
      />
      <div
        className={_class}
        style={{ ..._style, top: '50%', left: '95%', animationDelay: '1.25s' }}
      />
      <div
        className={_class}
        style={{ ..._style, top: '95%', left: '5%', animationDelay: '1.5s' }}
      />
      <div
        className={_class}
        style={{ ..._style, top: '95%', left: '50%', animationDelay: '1.75s' }}
      />
      <div
        className={_class}
        style={{ ..._style, top: '95%', left: '95%', animationDelay: '2s' }}
      />
    </div>
  );
}

export function GridLoaderBox({
  iconProps,
  ...props
}: AnimationComponentDivProps<GridLoaderProps>) {
  return (
    <div {...props} className={cn('flex justify-center', props.className)}>
      <GridLoader {...iconProps} />
    </div>
  );
}
