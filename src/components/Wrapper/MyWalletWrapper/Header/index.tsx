import SettingsIcon from '@mui/icons-material/Settings';
import { alpha, Box, Button, IconButton } from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import ThemeButton from 'src/components/Button/ThemeButton';
import NetworkSelector from 'src/components/Selector/NetworkSelector';
import { ROUTE } from 'src/configs/constance';
import useTranslate from 'src/hooks/useTranslate';
import { useAppSelector } from 'src/redux/hook';

export default function Header() {
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslate();
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
      })}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" height="100%">
        <Box>
          <ThemeButton />
          <NetworkSelector />
          {location.pathname === '/my-wallet' && status === 'init' && (
            <Button variant="outlined" onClick={() => history.push(ROUTE.WALLET_UTILS)}>
              {t('testWalletUtils')}
            </Button>
          )}
        </Box>
        <IconButton onClick={() => history.push(ROUTE.WALLET_SETTING)}>
          <SettingsIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
