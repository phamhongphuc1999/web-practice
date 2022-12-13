import { Box, Theme, Typography, useTheme } from '@mui/material';
import { ReactElement } from 'react';

function useStyle(theme: Theme) {
  return {
    box: {
      display: 'flex',
      flexDirection: 'column',
      width: '50%',
      padding: '2rem 0rem',
      [theme.breakpoints.only('sm')]: {
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

interface ItemProps {
  label: string;
  Chart: ReactElement;
}

export function Item({ label, Chart }: ItemProps) {
  const theme = useTheme();
  const cls = useStyle(theme);

  return (
    <Box sx={cls.box}>
      <Box sx={cls.itemBox}>
        <Typography sx={{ textAlign: 'center' }}>{label}</Typography>
        <Box mt={5} mb={2}>
          {Chart}
        </Box>
      </Box>
    </Box>
  );
}
