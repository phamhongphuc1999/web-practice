/* eslint-disable react/prop-types */
import { Box, BoxProps, keyframes, styled } from '@mui/material';
import { AnimationComponentBoxProps, AnimationComponentProps } from 'src/global';
import { mergeSx } from 'src/services/merge-sx';

const ratio = 0.05;

const ring = keyframes`
  0% { top: 0; }
  100% { top: 95%; }
`;
const Ring = styled(Box)`
  position: absolute;
  box-sizing: border-box;
  border-radius: 50%;
`;

interface Props {
  iconProps?: BoxProps;
  props?: BoxProps;
}

function Line({ iconProps, props }: Props) {
  return (
    <Box
      {...props}
      sx={mergeSx([
        { position: 'absolute', boxSizing: 'border-box', width: '1px', transformOrigin: 'bottom' },
        props?.sx,
      ])}
    >
      <Box sx={{ position: 'relative', height: '100%' }}>
        <Ring
          {...iconProps}
          sx={mergeSx([
            {
              position: 'absolute',
              right: '50%',
              transform: 'translateX(50%)',
              animation: `${ring} 2s linear infinite alternate`,
            },
            iconProps?.sx,
          ])}
        />
      </Box>
    </Box>
  );
}

export default function CircleRing({ size, color }: AnimationComponentProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-block',
        boxSizing: 'border-box',
        height: size,
        width: size,
        borderRadius: '50%',
        perspective: 800,
      }}
    >
      <Line
        iconProps={{
          sx: {
            backgroundColor: color,
            width: `calc(${ratio} * ${size})`,
            height: `calc(${ratio} * ${size})`,
            animationDelay: '-1.25s',
          },
        }}
        props={{
          sx: { height: `calc(${size} - 2px)`, top: 0, right: '50%', transform: 'translateX(50%)' },
        }}
      />
      <Line
        iconProps={{
          sx: {
            backgroundColor: color,
            width: `calc(${ratio} * ${size})`,
            height: `calc(${ratio} * ${size})`,
            animationDelay: '-1s',
          },
        }}
        props={{
          sx: {
            height: `calc(${size} - 2px)`,
            top: 0,
            right: '50%',
            transform: 'translateX(50%) rotate(30deg)',
            transformOrigin: 'center',
          },
        }}
      />
      <Line
        iconProps={{
          sx: {
            backgroundColor: color,
            width: `calc(${ratio} * ${size})`,
            height: `calc(${ratio} * ${size})`,
            animationDelay: '-0.75s',
          },
        }}
        props={{
          sx: {
            height: `calc(${size} - 2px)`,
            top: 0,
            right: '50%',
            transform: 'translateX(50%) rotate(60deg)',
            transformOrigin: 'center',
          },
        }}
      />
      <Line
        iconProps={{
          sx: {
            backgroundColor: color,
            width: `calc(${ratio} * ${size})`,
            height: `calc(${ratio} * ${size})`,
            animationDelay: '-0.5s',
          },
        }}
        props={{
          sx: {
            height: `calc(${size} - 2px)`,
            top: 0,
            right: '50%',
            transform: 'translateX(50%) rotate(90deg)',
            transformOrigin: 'center',
          },
        }}
      />
      <Line
        iconProps={{
          sx: {
            backgroundColor: color,
            width: `calc(${ratio} * ${size})`,
            height: `calc(${ratio} * ${size})`,
            animationDelay: '-0.25s',
          },
        }}
        props={{
          sx: {
            height: `calc(${size} - 2px)`,
            top: 0,
            right: '50%',
            transform: 'translateX(50%) rotate(120deg)',
            transformOrigin: 'center',
          },
        }}
      />
      <Line
        iconProps={{
          sx: {
            backgroundColor: color,
            width: `calc(${ratio} * ${size})`,
            height: `calc(${ratio} * ${size})`,
            animationDelay: '0s',
          },
        }}
        props={{
          sx: {
            height: `calc(${size} - 2px)`,
            top: 0,
            right: '50%',
            transform: 'translateX(50%) rotate(150deg)',
            transformOrigin: 'center',
          },
        }}
      />
    </Box>
  );
}

CircleRing.defaultProps = {
  size: '80px',
  color: 'primary.main',
};

export function CircleRingBox({ iconProps, props }: AnimationComponentBoxProps) {
  return (
    <Box display="flex" justifyContent="center" {...props}>
      <CircleRing {...iconProps} />
    </Box>
  );
}
