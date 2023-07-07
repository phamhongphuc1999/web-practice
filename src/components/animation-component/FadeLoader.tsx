import { Box, keyframes, styled } from '@mui/material';
import { AnimationComponentBoxProps, AnimationComponentProps } from 'src/global';

const fade1 = keyframes`
  0% { opacity: 0.7; }
  18.75% { opacity: 1; }
  68.75% { opacity: 0.2; }
  100% { opacity: 0.7; }
`;
const fade2 = keyframes`
  0% { opacity: 0.8; }
  12.5% { opacity: 1; }
  62.5% { opacity: 0.2; }
  100% { opacity: 0.8; }
`;
const fade3 = keyframes`
  0% { opacity: 0.9; }
  6.25% { opacity: 1; }
  56.25% { opacity: 0.2; }
  100% { opacity: 0.9; }
`;
const fade4 = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.2; }
  100% { opacity: 1; }
`;
const fade5 = keyframes`
  0% { opacity: 0.9; }
  43.75% { opacity: 0.2; }
  93.75% { opacity: 1; }
  100% { opacity: 0.9; }
`;
const fade6 = keyframes`
  0% { opacity: 0.8; }
  37.5% { opacity: 0.2; }
  87.5% { opacity: 1; }
  100% { opacity: 0.8; }
`;
const fade7 = keyframes`
  0% { opacity: 0.7; }
  31.25% { opacity: 0.2; }
  81.25% { opacity: 1; }
  100% { opacity: 0.7; }
`;
const fade8 = keyframes`
  0% { opacity: 0.6; }
  25% { opacity: 0.2; }
  75% { opacity: 1; }
  100% { opacity: 0.6; }
`;

const ColumnFade = styled('div')`
  position: absolute;
  box-sizing: border-box;
  width: 5px;
  height: 30%;
  border-radius: 5px;
`;

const RowFade = styled('div')`
  position: absolute;
  box-sizing: border-box;
  width: 30%;
  height: 5px;
  border-radius: 5px;
`;

export default function FadeLoader({ color, size }: AnimationComponentProps) {
  return (
    <Box
      sx={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: '50%',
        perspective: 800,
      }}
    >
      <ColumnFade
        sx={{
          animation: `${fade1} 1.2s linear infinite`,
          backgroundColor: color,
          top: 0,
          right: '50%',
          opacity: 0.7,
        }}
      />
      <ColumnFade
        sx={{
          animation: `${fade2} 1.2s linear infinite`,
          backgroundColor: color,
          top: '10%',
          right: '20%',
          transform: 'rotate(45deg)',
          opacity: 0.8,
        }}
      />
      <RowFade
        sx={{
          animation: `${fade3} 1.2s linear infinite`,
          backgroundColor: color,
          right: 0,
          top: '50%',
          opacity: 0.9,
        }}
      />
      <ColumnFade
        sx={{
          animation: `${fade4} 1.2s linear infinite`,
          backgroundColor: color,
          right: '20%',
          bottom: '10%',
          transform: 'rotate(135deg)',
        }}
      />
      <ColumnFade
        sx={{
          animation: `${fade5} 1.2s linear infinite`,
          backgroundColor: color,
          bottom: 0,
          right: '50%',
          opacity: 0.9,
        }}
      />
      <ColumnFade
        sx={{
          animation: `${fade6} 1.2s linear infinite`,
          backgroundColor: color,
          bottom: '10%',
          left: '20%',
          transform: 'rotate(-135deg)',
          opacity: 0.8,
        }}
      />
      <RowFade
        sx={{
          animation: `${fade7} 1.2s linear infinite`,
          backgroundColor: color,
          left: 0,
          top: '50%',
          opacity: 0.7,
        }}
      />
      <ColumnFade
        sx={{
          animation: `${fade8} 1.2s linear infinite`,
          backgroundColor: color,
          top: '10%',
          left: '20%',
          transform: 'rotate(-45deg)',
          opacity: 0.2,
        }}
      />
    </Box>
  );
}

FadeLoader.defaultProps = {
  size: 80,
  color: 'primary.main',
};

export function FadeLoaderBox({ iconProps, props }: AnimationComponentBoxProps) {
  return (
    <Box display="flex" justifyContent="center" {...props}>
      <FadeLoader {...iconProps} />
    </Box>
  );
}
