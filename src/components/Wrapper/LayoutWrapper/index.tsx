import { Theme, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import ScrollToTop from '../../ScrollToTop';
import useLayoutStyle, { LayoutProps } from '../useLayoutStyle';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

export default function LayoutWrapper({ children }: LayoutProps) {
  const cls = useLayoutStyle();
  const onlyXs = useMediaQuery<Theme>((theme) => theme.breakpoints.only('xs'));

  return (
    <Box position="relative" sx={cls.root}>
      <Header />
      <Box sx={cls.container}>
        {!onlyXs && <Sidebar />}
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
          sx={[cls.mainContainer, { marginLeft: '220px' }]}
        >
          <Box>{children}</Box>
          <Footer />
        </Box>
      </Box>
      <ScrollToTop />
    </Box>
  );
}
