import { Box, Button, TextField, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import useTranslate from 'src/hooks/useTranslate';

interface Props {
  setStep: (step: number) => void;
  mnemonic: string;
}

export default function VerifyMnemonic({ setStep, mnemonic }: Props) {
  const { t } = useTranslate();
  const [data, setData] = useState('');

  function onDataChange(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setData(event.target.value);
  }

  return (
    <Box>
      <Typography>{`${t('step')} 3: ${t('verifyYourMnemonic')}`}</Typography>
      <TextField fullWidth placeholder={t('enterMnemonic')} onChange={(event) => onDataChange(event)} />
      <Button
        fullWidth
        disabled={data !== mnemonic}
        variant="contained"
        type="submit"
        sx={{ mt: 1 }}
        onClick={() => setStep(4)}
      >
        {t('next')}
      </Button>
    </Box>
  );
}
