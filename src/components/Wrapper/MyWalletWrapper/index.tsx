import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { initWallet } from 'src/WalletObject/RestoreWalletLogic';
import ScrollToTop from 'src/components/ScrollToTop';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import useLayoutStyle, { LayoutProps } from '../useLayoutStyle';
import Header from './Header';

export default function MyWalletWrapper({ children }: LayoutProps) {
  const cls = useLayoutStyle();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { password } = useAppSelector((state) => state.myWalletSlice);

  useEffect(() => {
    initWallet(password, dispatch, { history });
  }, []);

  return (
    <Box position="relative" sx={cls.root}>
      <Header />
      <Box sx={cls.container}>
        <Box display="flex" justifyContent="space-between" flexDirection="column" sx={cls.mainContainer}>
          <Box>{children}</Box>
        </Box>
      </Box>
      <ScrollToTop />
    </Box>
  );
}
