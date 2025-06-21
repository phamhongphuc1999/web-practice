import { CSSProperties } from 'react';
import { AnimationComponentDivProps, AnimationComponentProps } from 'src/global';
import { cn } from 'src/lib/utils';

export default function FadeLoader({
  color = 'var(--primary-main)',
  size = 80,
}: AnimationComponentProps) {
  return (
    <div
      className="perspective-[800] relative inline-block rounded-[50%]"
      style={{ width: size, height: size }}
    >
      <div
        className="FadeLoader_column FadeLoader_item"
        style={
          {
            top: 0,
            right: '50%',
            opacity: 0.7,
            '--color': color,
            '--animation': 'FadeLoader_keyframes1',
          } as CSSProperties
        }
      />
      <div
        className="FadeLoader_column FadeLoader_item"
        style={
          {
            top: '10%',
            right: '20%',
            transform: 'rotate(45deg)',
            opacity: 0.8,
            '--color': color,
            '--animation': 'FadeLoader_keyframes2',
          } as CSSProperties
        }
      />
      <div
        className="FadeLoader_row FadeLoader_item"
        style={
          {
            right: 0,
            top: '50%',
            opacity: 0.9,
            '--color': color,
            '--animation': 'FadeLoader_keyframes3',
          } as CSSProperties
        }
      />
      <div
        className="FadeLoader_column FadeLoader_item"
        style={
          {
            right: '20%',
            bottom: '10%',
            transform: 'rotate(135deg)',
            '--color': color,
            '--animation': 'FadeLoader_keyframes4',
          } as CSSProperties
        }
      />
      <div
        className="FadeLoader_column FadeLoader_item"
        style={
          {
            bottom: 0,
            right: '50%',
            opacity: 0.9,
            '--color': color,
            '--animation': 'FadeLoader_keyframes5',
          } as CSSProperties
        }
      />
      <div
        className="FadeLoader_column FadeLoader_item"
        style={
          {
            bottom: '10%',
            left: '20%',
            transform: 'rotate(-135deg)',
            opacity: 0.8,
            '--color': color,
            '--animation': 'FadeLoader_keyframes6',
          } as CSSProperties
        }
      />
      <div
        className="FadeLoader_row FadeLoader_item"
        style={
          {
            left: 0,
            top: '50%',
            opacity: 0.7,
            '--color': color,
            '--animation': 'FadeLoader_keyframes7',
          } as CSSProperties
        }
      />
      <div
        className="FadeLoader_column FadeLoader_item"
        style={
          {
            top: '10%',
            left: '20%',
            transform: 'rotate(-45deg)',
            opacity: 0.2,
            '--color': color,
            '--animation': 'FadeLoader_keyframes7',
          } as CSSProperties
        }
      />
    </div>
  );
}

export function FadeLoaderBox({ iconProps, ...props }: AnimationComponentDivProps) {
  return (
    <div {...props} className={cn('flex justify-center', props.className)}>
      <FadeLoader {...iconProps} />
    </div>
  );
}
