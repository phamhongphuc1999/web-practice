import { ComponentProps, useMemo } from 'react';
import { cn } from 'src/lib/utils';
import { toFixed } from 'src/services';
import { path } from './SemiCircleGauge';

interface Props extends ComponentProps<'div'> {
  size?: number;
  percent: number;
}

export default function GradientSemiCircleGauge({ size = 100, percent, ...props }: Props) {
  const { y1, y2 } = useMemo(() => {
    const _alpha = percent * Math.PI;
    const offset = Math.tan(_alpha - Math.PI / 2) * 100;
    const y1 = 100 - offset;
    const y2 = 100 + offset;
    return { y1, y2 };
  }, [percent]);

  return (
    <div
      {...props}
      className={cn('relative', props.className)}
      style={{ width: `${2 * size}px`, height: `${size}px` }}
    >
      <svg
        width={2 * size}
        height={size}
        viewBox="0 0 185 93"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <path d={path} fill="url(#gradient_gauge)" filter="url(#glowFilter)" opacity="0.9" />
        <path d={path} fill="url(#gradient_gauge)" />
        <defs>
          <linearGradient
            id="gradient_gauge"
            x1="0%"
            y1={`${y1}%`}
            x2="100%"
            y2={`${y2}%`}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.45} stopColor="#AF4AF3" />
            <stop offset={0.55} stopColor="#EAFDFE" stopOpacity={0.75} />
            <stop offset="100%" stopColor="#EAFDFE" stopOpacity={0.75} />
          </linearGradient>
          <filter id="glowFilter" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="12" result="blur1" />
            <feGaussianBlur stdDeviation="20" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <p className="text-xl font-bold">{toFixed(percent * 100, 2)}%</p>
      </div>
    </div>
  );
}
