import { Box } from '@mui/system';
import { ReactNode } from 'react';
import Header from '../Header';

interface Props {
  children: ReactNode;
}

export default function LayoutWrapper({ children }: Props) {
  return (
    <Box>
      <Header />
      <Box>{children}</Box>
    </Box>
  );
}
