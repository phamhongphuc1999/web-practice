import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Box, Divider, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

const aptosConfig = new AptosConfig({ network: Network.DEVNET });
const aptos = new Aptos(aptosConfig);

export default function FetchData() {
  const { account } = useWallet();
  const [accountHasList, setAccountHasList] = useState<boolean>(false);

  const fetchList = useCallback(async () => {
    if (!account) return [];
    // change this to be your module account address
    const moduleAddress = '050ca9d4d15e9aae2d59f54f8081dddf493f7a67770c046c8e3001f69635235e';
    try {
      await aptos.getAccountResource({
        accountAddress: account?.address,
        resourceType: `${moduleAddress}::todolist::TodoList`,
      });
      setAccountHasList(true);
    } catch {
      setAccountHasList(false);
    }
  }, [account]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return (
    <Box>
      <Divider sx={{ marginY: 1 }} />
      <Typography variant="h4">Fetch data</Typography>
      {accountHasList && <Typography>Ok</Typography>}
    </Box>
  );
}
