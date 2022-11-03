import { Box, Button, Collapse, Paper, TextField, Typography } from '@mui/material';
import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import { isAddress } from 'ethers/lib/utils';
import { useState } from 'react';
import ArrowAnimationIcon from 'src/components/Icons/ArrowAnimationIcon';

interface Props {
  decimal: number;
  contract: ethers.Contract | undefined;
}

export default function ReadMethods({ decimal, contract }: Props) {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [addressTextHelper, setAddressTextHelper] = useState<string | undefined>(undefined);

  function onAddressChange(value: string) {
    setAddress(value);
    if (isAddress(value)) setAddressTextHelper('');
    else setAddressTextHelper('Address is invalid');
  }

  async function onQueryClick() {
    if (contract) {
      const balance = await contract.balanceOf(address);
      setBalance(BigNumber(balance._hex).div(BigNumber('10').pow(decimal)).toFixed());
    }
  }

  return (
    <Box>
      <Box mb={1}>
        <Button variant="outlined">Expand all</Button>
        <Button sx={{ marginLeft: '1rem' }} variant="outlined">
          Reset
        </Button>
      </Box>
      <Paper onClick={() => setOpen(!open)} sx={{ cursor: 'pointer' }}>
        <Box mb={1} p="1rem" display="flex" alignItems="center" justifyContent="space-between">
          <Typography>1. balanceOf</Typography>
          <ArrowAnimationIcon isTransform={open} />
        </Box>
      </Paper>
      <Collapse in={open}>
        <Typography sx={{ marginBottom: '0.25rem' }}>account(address)</Typography>
        <Typography color="secondary" sx={{ fontSize: '12px', marginBottom: '4px' }}>
          Example: 0x68a6c841040B05D60434d81000f523Bf6355b31D
        </Typography>
        <TextField
          size="small"
          placeholder="contract address"
          value={address}
          onChange={(e) => onAddressChange(e.target.value)}
          error={Boolean(addressTextHelper)}
          helperText={addressTextHelper}
          sx={{ width: '100%' }}
        />
        <Button
          sx={{ marginTop: '0.5rem' }}
          variant="contained"
          disabled={addressTextHelper != ''}
          onClick={onQueryClick}
        >
          Query
        </Button>
        {balance.length > 0 && <Typography>Balance: {balance}</Typography>}
      </Collapse>
    </Box>
  );
}
