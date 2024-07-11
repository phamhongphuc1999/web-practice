/* eslint-disable react/prop-types */
import { Box, BoxProps, CircularProgress } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import { useAppSelector } from 'src/redux/hook';
import { mergeSx } from 'src/services';

interface Props {
  children: ReactNode;
  props?: BoxProps;
}

export default function BaseChart({ children, props }: Props) {
  const [loading, setLoading] = useState(false);
  const { theme } = useAppSelector((state) => state.userConfig);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [theme]);

  return loading ? (
    <Box
      {...props}
      sx={mergeSx([
        {
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        props?.sx,
      ])}
    >
      <CircularProgress />
    </Box>
  ) : (
    <Box {...props} sx={mergeSx([{ width: '100%' }, props?.sx])}>
      {children}
    </Box>
  );
}
