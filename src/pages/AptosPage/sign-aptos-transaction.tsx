import { AccountAddress, U64 } from '@aptos-labs/ts-sdk';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useAptosWalletContext } from 'src/WalletConnection/aptos-connection/AptosWalletContext';

export default function SignAptosTransaction() {
  const { account, signAndSubmitTransaction } = useWallet();
  const { aptos } = useAptosWalletContext();

  async function onSignAndSubmitTransaction() {
    if (account == null) throw new Error('Unable to find account to sign transaction');
    const response = await signAndSubmitTransaction({
      sender: account.address,
      data: { function: '0x1::aptos_account::transfer', functionArguments: [account.address, 1] },
    });
    // if you want to wait for transaction
    try {
      if (aptos) await aptos.waitForTransaction({ transactionHash: response.hash });
    } catch (error) {
      console.error(error);
    }
  }

  async function onSignAndSubmitBCSTransaction() {
    if (account == null) throw new Error('Unable to find account to sign transaction');
    const response = await signAndSubmitTransaction({
      sender: account.address,
      data: {
        function: '0x1::aptos_account::transfer',
        functionArguments: [AccountAddress.from(account.address), new U64(1)],
      },
    });
    // if you want to wait for transaction
    try {
      if (aptos) await aptos.waitForTransaction({ transactionHash: response.hash });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box>
      <Divider sx={{ marginY: 1 }} />
      <Typography variant="h4">Sign transaction</Typography>
      <Button sx={{ mr: 1 }} variant="outlined" onClick={onSignAndSubmitTransaction}>
        Sign and submit transaction
      </Button>
      <Button variant="contained" onClick={onSignAndSubmitBCSTransaction}>
        Sign and submit BCS transaction
      </Button>
    </Box>
  );
}
