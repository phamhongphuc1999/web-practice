import { Box, keyframes, styled } from '@mui/material';
import { AnimationComponentBoxProps, AnimationComponentProps } from 'src/global';

const loader = keyframes`
  0% { background: #1C8CF3; }
  100% { background: rgba(28, 140, 243, 0.3); }
`;

const Dot = styled('div')`
  position: absolute;
  box-sizing: border-box;
  width: 12.5%;
  height: 12.5%;
  border-radius: 50%;
`;

export default function CircleDotLoader({ color, size }: AnimationComponentProps) {
  const _sx = { animation: `${loader} 2s linear infinite` };
  return (
    <Box
      sx={{
        display: 'inline-block',
        width: size,
        height: size,
        border: '1px solid',
        borderColor: color,
        borderRadius: '50%',
        position: 'relative',
      }}
    >
      <Dot sx={[_sx, { top: 0, left: '43.75%' }]} />
      <Dot sx={[_sx, { right: '12.5%', top: '12.5%', animationDelay: '0.2s' }]} />
      <Dot sx={[_sx, { top: '43.75%', right: 0, animationDelay: '0.4s' }]} />
      <Dot sx={[_sx, { right: '12.5%', bottom: '12.5%', animationDelay: '0.6s' }]} />
      <Dot sx={[_sx, { left: '43.75%', bottom: 0, animationDelay: '0.8s' }]} />
      <Dot sx={[_sx, { left: '12.5%', bottom: '12.5%', animationDelay: '1s' }]} />
      <Dot sx={[_sx, { top: '43.75%', left: 0, animationDelay: '1.2s' }]} />
      <Dot sx={[_sx, { left: '12.5%', top: '12.5%', animationDelay: '1.4s' }]} />
    </Box>
  );
}

CircleDotLoader.defaultProps = {
  size: 80,
  color: 'primary.main',
};

export function CircleDotBox({ iconProps, props }: AnimationComponentBoxProps) {
  return (
    <Box display="flex" justifyContent="center" {...props}>
      <CircleDotLoader {...iconProps} />
    </Box>
  );
}
