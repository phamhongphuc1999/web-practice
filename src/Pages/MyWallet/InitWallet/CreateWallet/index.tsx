import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useDispatch } from 'react-redux';
import { updateStatus } from 'src/redux/myWalletSlice';
import { useState } from 'react';
import CreatePassword from './CreatePassword';
import CreateMnemonic from './CreateMnemonic';

export default function CreateWallet() {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState<string | undefined>(undefined);

  return (
    <>
      <Box display="flex" alignItems="center">
        <IconButton onClick={() => dispatch(updateStatus('init'))} sx={{ mr: 1 }}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography>Create new Wallet</Typography>
      </Box>
      {step === 1 && <CreatePassword setStep={setStep} password={password} setPassword={setPassword} />}
      {step === 2 && <CreateMnemonic />}
    </>
  );
}
