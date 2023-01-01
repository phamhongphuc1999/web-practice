import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Box, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import useTranslate from 'src/hooks/useTranslate';
import { useAppDispatch } from 'src/redux/hook';
import { updateStatus } from 'src/redux/my-wallet/myWalletSlice';
import CreatePassword from './CreatePassword';
import ShowMnemonic from './ShowMnemonic';
import SuccessCreateWallet from './SuccessCreateWallet';
import VerifyMnemonic from './VerifyMnemonic';

export default function CreateWallet() {
  const dispatch = useAppDispatch();
  const { t } = useTranslate();
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [mnemonic, setMnemonic] = useState('');

  return (
    <>
      <Box display="flex" alignItems="center">
        <IconButton onClick={() => dispatch(updateStatus('init'))} sx={{ mr: 1 }}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography>{t('createWallet')}</Typography>
      </Box>
      {step === 1 && (
        <CreatePassword
          setStep={setStep}
          password={password}
          setPassword={setPassword}
          setAccounts={setAccounts}
          setMnemonic={setMnemonic}
        />
      )}
      {step === 2 && <ShowMnemonic setStep={setStep} mnemonic={mnemonic} />}
      {step === 3 && <VerifyMnemonic setStep={setStep} mnemonic={mnemonic} />}
      {step === 4 && <SuccessCreateWallet accounts={accounts} />}
    </>
  );
}
