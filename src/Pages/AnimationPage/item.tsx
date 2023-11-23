import { Box, Theme, Typography, useTheme } from '@mui/material';
import { ReactNode } from 'react';

function useStyle(theme: Theme) {
  return {
    box: {
      display: 'flex',
      flexDirection: 'column',
      width: '33.333%',
      padding: '2rem 0rem',
      [theme.breakpoints.only('sm')]: {
        width: '50%',
      },
      [theme.breakpoints.only('xs')]: {
        width: '100%',
      },
    },
    itemBox: {
      height: '100%',
      margin: '0rem 2rem',
      padding: '0.5rem',
      border: '1px solid',
      borderRadius: '10px',
    },
  };
}

interface Props {
  label: string;
  Icon: ReactNode;
  Component?: {
    start?: ReactNode;
    end?: ReactNode;
  };
}

export default function Item({ label, Icon, Component }: Props) {
  const theme = useTheme();
  const cls = useStyle(theme);

  return (
    <Box sx={cls.box}>
      <Box sx={cls.itemBox}>
        <Typography sx={{ textAlign: 'center' }}>{label}</Typography>
        <Box>{Component?.start}</Box>
        <Box mt={5} mb={2}>
          {Icon}
        </Box>
        <Box>{Component?.end}</Box>
      </Box>
    </Box>
  );
}
