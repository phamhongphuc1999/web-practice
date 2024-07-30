import { useWallet, WalletName } from '@aptos-labs/wallet-adapter-react';
import { Box, Button, Typography } from '@mui/material';
import { formatAddress } from 'src/services';
import ChangeNetwork from './change-network';
import SignAptosTransaction from './sign-aptos-transaction';
import SignVerifyMessage from './sign-verify-message';

export default function AptosPage() {
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
      <Typography>Aptos Wallet Connection</Typography>
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
