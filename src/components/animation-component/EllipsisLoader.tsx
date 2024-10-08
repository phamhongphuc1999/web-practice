import { Box } from '@mui/material';
import { keyframes, styled } from '@mui/system';
import { AnimationComponentBoxProps, AnimationComponentProps } from 'src/global';

const ellipsis1 = keyframes`
  from { top: 50%; height: 0; width: 0; };
  to { top: 41.25%; height: 16.25%; width: 16.25%; };
`;
const ellipsis2 = keyframes`
  from { left: 10%; };
  to { left: 40%; };
`;
const ellipsis3 = keyframes`
  from { left: 40%; };
  to { left: 70%; };
`;
const ellipsis4 = keyframes`
  from { top: 41.25%; height: 16.25%; width: 16.25%; };
  to { top: 50%; height: 0; width: 0; };
`;

const Ellipsis = styled('div')`
  position: absolute;
  box-sizing: border-box;
  border-radius: 50%;
`;

export default function EllipsisLoader({ size, color }: AnimationComponentProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-block',
        boxSizing: 'border-box',
        height: size,
        width: size,
      }}
    >
      <Ellipsis
        sx={{ backgroundColor: color, left: '10%', animation: `${ellipsis1} 0.6s linear infinite` }}
      />
      <Ellipsis
        sx={{
          backgroundColor: color,
          top: '41.25%',
          height: '16.25%',
          width: '16.25%',
          animation: `${ellipsis2} 0.6s linear infinite`,
        }}
      />
      <Ellipsis
        sx={{
          backgroundColor: color,
          top: '41.25%',
          height: '16.25%',
          width: '16.25%',
          animation: `${ellipsis3} 0.6s linear infinite`,
        }}
      />
      <Ellipsis
        sx={{ backgroundColor: color, left: '70%', animation: `${ellipsis4} 0.6s linear infinite` }}
      />
    </Box>
  );
}

EllipsisLoader.defaultProps = {
  size: 80,
  color: 'primary.main',
};

export function EllipsisLoaderBox({ iconProps, ...props }: AnimationComponentBoxProps) {
  return (
    <Box display="flex" justifyContent="center" {...props}>
      <EllipsisLoader {...iconProps} />
    </Box>
  );
}
