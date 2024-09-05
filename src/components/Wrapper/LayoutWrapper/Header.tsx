import { alpha, Box, Button } from '@mui/material';
import AptosConnectButton from 'src/components/Button/AptosConnectButton';
import ThemeButton from 'src/components/Button/ThemeButton';
import LanguageSelector from 'src/components/Selector/LanguageSelector';
import useLocalTranslate from 'src/hooks/useLocalTranslate';

export default function Header() {
  const { t } = useLocalTranslate();

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
      <Box display="flex" alignItems="center" justifyContent="space-between" height="100%">
        <Box display="flex" alignItems="center">
          <ThemeButton />
          <Button
            variant="outlined"
            sx={{ ml: 1 }}
            onClick={() => window.open('/my-wallet', '_blank')}
          >
            {t('launchWallet')}
          </Button>
          <Button variant="outlined" sx={{ ml: 1 }} onClick={() => window.open('/docs', '_blank')}>
            {t('launchDocs')}
          </Button>
          {location.pathname.includes('/aptos') && <AptosConnectButton className="ml-[8px]" />}
        </Box>
        <LanguageSelector />
      </Box>
    </Box>
  );
}
