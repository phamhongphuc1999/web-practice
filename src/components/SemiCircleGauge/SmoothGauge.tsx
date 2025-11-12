import { ComponentProps, useEffect, useRef } from 'react';
import { cn } from 'src/lib/utils';

const fullLength = 471;
const strokeWidth = 30;

interface Props extends ComponentProps<'svg'> {
  size?: number;
  percent: number;
}

export default function SmoothGauge({ percent, size = 150, ...props }: Props) {
  const arcRef = useRef<SVGPathElement>(null);
  const arcBlurRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!arcRef.current) return;
    const offset = fullLength * (1 - percent);
    arcRef.current.style.strokeDashoffset = `${offset}`;
  }, [percent]);

  useEffect(() => {
    if (!arcBlurRef.current) return;
    const offset = fullLength * (1 - percent);
    arcBlurRef.current.style.strokeDashoffset = `${offset}`;
  }, [percent]);

  return (
    <svg
      {...props}
      width={size * 1.6}
      height={size}
      viewBox="0 0 400 250"
      className={cn('overflow-visible', props.className)}
    >
      <path
        d="M50,200 A150,150 0 0,1 350,200"
        fill="none"
        stroke="#ffffff"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeOpacity={0.04}
      />
      <path
        ref={arcBlurRef}
        d="M50,200 A150,150 0 0,1 350,200"
        fill="none"
        stroke="url(#gradient)"
        filter="url(#glowFilter)"
        opacity="0.6"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={fullLength}
        strokeDashoffset={fullLength}
        style={{
          transition: 'stroke-dashoffset 0.8s ease-in-out',
          transformOrigin: 'center',
        }}
      />
      <path
        ref={arcRef}
        d="M50,200 A150,150 0 0,1 350,200"
        fill="none"
        stroke="url(#gradient)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={fullLength}
        strokeDashoffset={fullLength}
        style={{
          transition: 'stroke-dashoffset 0.8s ease-in-out',
          transformOrigin: 'center',
        }}
      />
      <defs>
        <linearGradient
          id="gradient"
          gradientUnits="userSpaceOnUse"
          x1="50"
          y1="200"
          x2="350"
          y2="200"
        >
          <stop offset="0%" stopColor="#EAFDFE" />
          <stop offset="100%" stopColor="#AF4AF3" />
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
  );
}
