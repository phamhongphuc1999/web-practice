/* eslint-disable react/prop-types */
import { Box, BoxProps, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  ratio?: number;
  children: ReactNode;
  rootProps?: BoxProps;
  props?: BoxProps;
}

export default function RatioBox({ ratio = 100, children, rootProps, props }: Props) {
  return ratio > 0 ? (
    <Box sx={[{ position: 'relative', paddingTop: `${ratio}%` }, rootProps?.sx] as SxProps<Theme>}>
      <Box
        sx={
          [
            { position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 },
            props?.sx,
          ] as SxProps<Theme>
        }
      >
        {children}
      </Box>
    </Box>
  ) : (
    <Box {...rootProps}>{children}</Box>
  );
}
