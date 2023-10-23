/* eslint-disable react/prop-types */
import { Box, BoxProps, SxProps, Theme, darken } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  scrollProps?: BoxProps;
  props?: BoxProps;
}

export default function ScrollPaper({ children, scrollProps, props }: Props) {
  return (
    <Box
      {...props}
      sx={
        [
          {
            width: '100%',
            overflow: 'auto scroll',
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              width: '2px',
            },
            '&::-webkit-scrollbar:horizontal': {
              height: 2,
            },
            '&::-webkit-scrollbar-thumb, &::-webkit-scrollbar-corner': {
              backgroundColor: darken('#DADDE1', 0.4),
            },
          },
          props?.sx,
        ] as SxProps<Theme>
      }
    >
      <Box
        {...scrollProps}
        sx={
          [
            { width: 'calc(100% - 8px)', height: 'calc(100% - 8px)' },
            scrollProps?.sx,
          ] as SxProps<Theme>
        }
      >
        {children}
      </Box>
    </Box>
  );
}
