import { useMemo } from 'react';

interface Props {
  percent: number;
  scoreText?: string;
}

export default function SemiCircleGauge({ percent, scoreText }: Props) {
  const { y1, y2 } = useMemo(() => {
    const _alpha = percent * Math.PI;
    const offset = Math.tan(_alpha - Math.PI / 2) * 100;
    const y1 = 100 - offset;
    const y2 = 100 + offset;
    return { y1, y2 };
  }, [percent]);

  return (
    <div className="relative h-[150px] w-[300px]">
      <svg
        width={300}
        height={150}
        viewBox="0 0 185 93"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(-10px 10px 15px rgba(175, 74, 243, 0.4)) ' }}
      >
        <path
          d="M175.33 92.5C180.439 92.5 184.628 88.3484 184.118 83.2653C183.217 74.286 181.005 65.4699 177.539 57.1018C172.89 45.8792 166.077 35.682 157.487 27.0926C148.898 18.5032 138.701 11.6897 127.478 7.04114C116.256 2.39258 104.227 -5.30974e-07 92.08 0C79.9327 5.30974e-07 67.9044 2.39258 56.6818 7.04115C45.4592 11.6897 35.2621 18.5032 26.6726 27.0926C18.0832 35.682 11.2697 45.8792 6.62116 57.1018C3.15498 65.4699 0.94309 74.286 0.0421393 83.2653C-0.467879 88.3485 3.72139 92.5 8.83002 92.5C13.9387 92.5 18.0205 88.3428 18.6574 83.274C19.4802 76.7262 21.1769 70.304 23.7129 64.1814C27.4318 55.2033 32.8826 47.0456 39.7541 40.1741C46.6257 33.3026 54.7833 27.8518 63.7614 24.1329C72.7395 20.4141 82.3622 18.5 92.08 18.5C101.798 18.5 111.421 20.4141 120.399 24.1329C129.377 27.8518 137.534 33.3026 144.406 40.1741C151.277 47.0456 156.728 55.2033 160.447 64.1814C162.983 70.3039 164.68 76.7262 165.503 83.274C166.14 88.3428 170.221 92.5 175.33 92.5Z"
          fill="url(#paint0_linear_25300_120269)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_25300_120269"
            x1="0%"
            y1={`${y1}%`}
            x2="100%"
            y2={`${y2}%`}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.4} stopColor="#AF4AF3" />
            <stop offset={0.6} stopColor="#EAFDFE" />
            <stop offset="100%" stopColor="#EAFDFE" />
          </linearGradient>
        </defs>
      </svg>
      {scoreText && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <p className="text-xl font-bold">{scoreText}</p>
        </div>
      )}
    </div>
  );
}
