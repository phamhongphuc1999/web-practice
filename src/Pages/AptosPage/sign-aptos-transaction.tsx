import { AccountAddress, Aptos, AptosConfig, Network, U64 } from '@aptos-labs/ts-sdk';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Box, Button, Typography } from '@mui/material';

const config = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(config);

export default function SignAptosTransaction() {
  const { account, signAndSubmitTransaction } = useWallet();

  async function onSignAndSubmitTransaction() {
    if (account == null) throw new Error('Unable to find account to sign transaction');
    const response = await signAndSubmitTransaction({
      sender: account.address,
      data: {
        function: '0x1::aptos_account::transfer',
        functionArguments: [account.address, 1],
      },
    });
    // if you want to wait for transaction
    try {
      await aptos.waitForTransaction({ transactionHash: response.hash });
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
      await aptos.waitForTransaction({ transactionHash: response.hash });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box>
      <Typography>Sign transaction</Typography>
      <Button variant="outlined" onClick={onSignAndSubmitTransaction}>
        Sign and submit transaction
      </Button>
      <Button variant="contained" onClick={onSignAndSubmitBCSTransaction}>
        Sign and submit BCS transaction
      </Button>
    </Box>
  );
}
