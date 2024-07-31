import { useWallet, WalletName } from '@aptos-labs/wallet-adapter-react';
import { Box, Button, Typography } from '@mui/material';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import useTranslate from 'src/hooks/useTranslate';
import { formatAddress } from 'src/services';
import ChangeNetwork from './change-network';
import FetchData from './fetch-data';
import SignAptosTransaction from './sign-aptos-transaction';
import SignVerifyMessage from './sign-verify-message';

export default function AptosPage() {
  const { t } = useTranslate();
  const { connect, disconnect, account, connected } = useWallet();

  async function onConnect() {
    try {
      // Change below to the desired wallet name instead of "Petra"
      connect('Petra' as WalletName<'Petra'>);
      console.warn('Connected to wallet:', account);
    } catch (error) {
      console.error('Failed to connect to wallet:', error);
    }
  }

  async function onDisconnect() {
    try {
      await disconnect();
      console.warn('Disconnected from wallet');
    } catch (error) {
      console.error('Failed to disconnect from wallet:', error);
    }
  }

  return (
    <Box>
      <CssBreadcrumbs configs={[{ label: t('aptos') }]} props={{ mb: 2 }} />
      <Typography variant="h4">Aptos Wallet Connection</Typography>
      <Box>
        {connected ? (
          <Box>
            <Typography>Connected to: {formatAddress(account?.address ?? '', 6)}</Typography>
            <Button variant="outlined" onClick={onDisconnect}>
              Disconnect
            </Button>
            <SignAptosTransaction />
            <SignVerifyMessage />
            <ChangeNetwork />
            <FetchData />
          </Box>
        ) : (
          <Button variant="outlined" onClick={onConnect}>
            Connect Wallet
          </Button>
        )}
      </Box>
    </Box>
  );
}
