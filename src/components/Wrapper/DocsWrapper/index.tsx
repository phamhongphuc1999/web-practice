import { Box, Container } from '@mui/material';
import ScrollToTop from 'src/components/ScrollToTop';
import useLayoutStyle, { LayoutProps } from '../useLayoutStyle';
import Header from './Header';

export default function DocsWrapper({ children }: LayoutProps) {
  const cls = useLayoutStyle();

  return (
    <Box position="relative" sx={cls.root}>
      <Header />
      <Box sx={cls.container}>
        <Box display="flex" justifyContent="space-between" flexDirection="column" sx={cls.mainContainer}>
          <Container>{children}</Container>
        </Box>
      </Box>
      <ScrollToTop />
    </Box>
  );
}
