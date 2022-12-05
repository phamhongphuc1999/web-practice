import { Box, keyframes, styled } from '@mui/material';
import { AnimationComponentBoxProps, AnimationComponentProps } from 'src/global';

const rotate = keyframes`
  0% { border-radius: 50%; transform: translate(-50%, -50%) rotate(0deg); }
  50% { border-radius: 5%; transform: translate(-50%, -50%) rotate(180deg); }
  100% { border-radius: 50%; transform:translate(-50%, -50%) rotate(360deg); }
`;

const oppositeRotate = keyframes`
  0% { border-radius: 50%; transform: translate(-50%, -50%) rotate(0deg); }
  50% { border-radius: 5%; transform: translate(-50%, -50%) rotate(-180deg); }
  100% { border-radius: 50%; transform:translate(-50%, -50%) rotate(-360deg); }
`;

const Circle = styled('div')`
  position: absolute;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(0deg);
`;

interface GooeyProps extends AnimationComponentProps {
  opposite?: boolean;
}

export default function Gooey({ color, size, opposite }: GooeyProps) {
  return (
    <Box sx={{ display: 'inline-block', width: size, height: size, perspective: 800 }}>
      <Circle sx={{ borderColor: color, width: size, height: size, animation: `${rotate} 2s linear infinite` }} />
      <Circle
        sx={{
          borderColor: color,
          width: '75%',
          height: '75%',
          animation: opposite ? `${oppositeRotate} 2s linear infinite` : `${rotate} 2s linear infinite`,
        }}
      />
      <Circle sx={{ borderColor: color, width: '50%', height: '50%', animation: `${rotate} 2s linear infinite` }} />
      <Circle
        sx={{
          borderColor: color,
          width: '25%',
          height: '25%',
          animation: opposite ? `${oppositeRotate} 2s linear infinite` : `${rotate} 2s linear infinite`,
        }}
      />
    </Box>
  );
}

Gooey.defaultProps = {
  size: 80,
  color: 'primary.main',
  opposite: false,
};

export function ContainedGooey({ color, size, opposite }: GooeyProps) {
  const borderSize = Number(size);

  return (
    <Box sx={{ display: 'inline-block', width: size, height: size, perspective: 800 }}>
      <Circle
        sx={{
          border: `${borderSize * 0.125}px solid`,
          borderColor: color,
          width: size,
          height: size,
          animation: `${rotate} 2s linear infinite`,
        }}
      />
      <Circle
        sx={{
          border: `${borderSize * 0.125}px solid`,
          borderColor: color,
          width: '50%',
          height: '50%',
          animation: opposite ? `${oppositeRotate} 2s linear infinite` : `${rotate} 2s linear infinite`,
        }}
      />
    </Box>
  );
}

ContainedGooey.defaultProps = {
  size: 80,
  color: 'primary.main',
  opposite: false,
};

interface GooeyBoxProps extends AnimationComponentBoxProps<GooeyProps> {
  type?: 'normal' | 'contained';
}

export function GooeyBox({ type, iconProps, props }: GooeyBoxProps) {
  return (
    <Box display="flex" justifyContent="center" {...props}>
      {type == 'contained' ? <ContainedGooey {...iconProps} /> : <Gooey {...iconProps} />}
    </Box>
  );
}

interface ColorfulGooeyProps {
  size?: number | string;
  color?: [string, string, string, string];
  opposite?: boolean;
}

export function ColorfulGooey({ size, color, opposite }: ColorfulGooeyProps) {
  return (
    <Box sx={{ display: 'inline-block', width: size, height: size, perspective: 800 }}>
      <Circle
        sx={{
          borderColor: color?.[0],
          backgroundColor: color?.[0],
          width: size,
          height: size,
          animation: `${rotate} 2s linear infinite`,
        }}
      />
      <Circle
        sx={{
          borderColor: color?.[1],
          backgroundColor: color?.[1],
          width: '75%',
          height: '75%',
          animation: opposite ? `${oppositeRotate} 2s linear infinite` : `${rotate} 2s linear infinite`,
        }}
      />
      <Circle
        sx={{
          borderColor: color?.[2],
          backgroundColor: color?.[2],
          width: '50%',
          height: '50%',
          animation: `${rotate} 2s linear infinite`,
        }}
      />
      <Circle
        sx={{
          borderColor: color?.[3],
          backgroundColor: color?.[3],
          width: '25%',
          height: '25%',
          animation: opposite ? `${oppositeRotate} 2s linear infinite` : `${rotate} 2s linear infinite`,
        }}
      />
    </Box>
  );
}

ColorfulGooey.defaultProps = {
  size: 80,
  color: ['primary.main', 'secondary.main', 'error.main', 'success.main'],
  opposite: false,
};

export function ColorfulGooeyBox({ iconProps, props }: AnimationComponentBoxProps<ColorfulGooeyProps>) {
  return (
    <Box display="flex" justifyContent="center" {...props}>
      <ColorfulGooey {...iconProps} />
    </Box>
  );
}
