import { alpha, Box, Button } from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import ThemeButton from 'src/components/Button/ThemeButton';
import { ROUTE } from 'src/configs/constance';
import { useAppSelector } from 'src/redux/hook';

export default function Header() {
  const history = useHistory();
  const location = useLocation();
  const { status } = useAppSelector((state) => state.myWalletSlice);

  return (
    <Box
      position="fixed"
      sx={(theme) => ({
        background: theme.palette.background.paper,
        zIndex: 1205,
        width: '100%',
        height: 55,
        borderBottom: `1px solid ${alpha(theme.palette.mode === 'dark' ? '#fff' : '#000', 0.12)}`,
        padding: theme.spacing(0, 2),
      })}
    >
      <Box display="flex" alignItems="center" height="100%">
        <ThemeButton />
        {location.pathname === '/my-wallet' && status === 'init' && (
          <Button variant="outlined" onClick={() => history.push(ROUTE.WALLET_UTILS)}>
            Test wallet utils
          </Button>
        )}
      </Box>
    </Box>
  );
}
