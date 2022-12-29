import { Box, Button, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { Contract } from 'src/blockchain-interaction/contract-handler/contract';
import { Interface } from 'src/blockchain-interaction/contract-handler/interface';

export default function MyContract() {
  const [abi, setAbi] = useState('');

  const inter = useMemo(() => {
    try {
      return new Interface(abi);
    } catch {
      return undefined;
    }
  }, [abi]);

  const contract = useMemo(() => {
    try {
      return new Contract('0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', abi, 'https://bsc-dataseed.binance.org');
    } catch {
      return undefined;
    }
  }, [abi]);

  async function onClick() {
    // if (contract) {
    //   const abc = await contract.viewFunction('balanceOf', ['0x871DBcE2b9923A35716e7E83ee402B535298538E']);
    // }
  }

  return (
    <Box mt={2}>
      <TextField
        fullWidth
        placeholder="enter your abi"
        multiline
        rows={6}
        maxRows={8}
        onChange={(e) => setAbi(e.target.value)}
      />
      {inter && (
        <Box>
          <Typography variant="h4">Function</Typography>
          {inter.abi.functions.map((item, index) => {
            const funcString = inter.getFunctionFormat(item);
            const _sign = inter.getSignature(item);

            return <Typography key={index}>{`${funcString} - ${_sign}`}</Typography>;
          })}
        </Box>
      )}
      {contract && (
        <Button variant="contained" onClick={() => onClick()}>
          Test
        </Button>
      )}
    </Box>
  );
}
