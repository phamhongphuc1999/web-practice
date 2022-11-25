import { Box, styled } from '@mui/material';
import { AnimationComponentBoxProps, AnimationComponentProps } from 'src/global';

const Rise = styled('div')`
  position: absolute;
  box-sizing: border-box;
  border-radius: 50%;
`;

export default function RiseLoader({ color, size }: AnimationComponentProps) {
  const _sx = { backgroundColor: color, width: '15%', height: '15%', top: '50%' };

  return (
    <Box sx={{ display: 'inline-block', width: size, height: size, borderRadius: '50%', perspective: 800 }}>
      <Rise sx={[_sx, { left: 0, transform: 'translateY(-50%)' }]} />
      <Rise sx={[_sx, { left: '28.75%', transform: 'translateX(-50%) translateY(-50%)' }]} />
      <Rise sx={[_sx, { left: '50%', transform: 'translateX(-50%) translateY(-50%)' }]} />
      <Rise sx={[_sx, { left: '71.25%', transform: 'translateX(-50%) translateY(-50%)' }]} />
      <Rise sx={[_sx, { right: 0, transform: 'translateY(-50%)' }]} />
    </Box>
  );
}

RiseLoader.defaultProps = {
  size: 80,
  color: 'primary.main',
};

export function RiseLoaderBox({ iconProps, props }: AnimationComponentBoxProps) {
  return (
    <Box display="flex" justifyContent="center" {...props}>
      <RiseLoader {...iconProps} />
    </Box>
  );
}
