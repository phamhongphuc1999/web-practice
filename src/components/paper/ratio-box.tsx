 
import { Box, BoxProps } from '@mui/material';
import { ReactNode } from 'react';
import { mergeSx } from 'src/services';

interface Props extends BoxProps {
  ratio?: number;
  children: ReactNode;
  rootProps?: BoxProps;
}

export default function RatioBox({ ratio = 100, children, rootProps, ...props }: Props) {
  return ratio > 0 ? (
    <Box sx={mergeSx([{ position: 'relative', paddingTop: `${ratio}%` }, rootProps?.sx])}>
      <Box
        sx={mergeSx([{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }, props?.sx])}
      >
        {children}
      </Box>
    </Box>
  ) : (
    <Box {...rootProps}>{children}</Box>
  );
}
