/* eslint-disable react/prop-types */
import { Box, BoxProps, darken } from '@mui/material';
import { ReactNode } from 'react';
import { mergeSx } from 'src/services/merge-sx';

interface Props {
  children: ReactNode;
  scrollProps?: BoxProps;
  props?: BoxProps;
}

export default function ScrollPaper({ children, scrollProps, props }: Props) {
  return (
    <Box
      {...props}
      sx={mergeSx([
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
      ])}
    >
      <Box
        {...scrollProps}
        sx={mergeSx([{ width: 'calc(100% - 8px)', height: 'calc(100% - 8px)' }, scrollProps?.sx])}
      >
        {children}
      </Box>
    </Box>
  );
}
