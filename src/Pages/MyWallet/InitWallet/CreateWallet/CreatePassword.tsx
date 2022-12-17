import { Box, Button, styled, TextField, Typography } from '@mui/material';
import { useState, FormEvent, ChangeEvent } from 'react';
import useTranslate from 'src/hooks/useTranslate';

interface Props {
  setStep: (step: number) => void;
  password: string | undefined;
  setPassword: (password: string | undefined) => void;
}

const CssForm = styled('form')(() => ({}));

export default function CreatePassword({ setStep, password, setPassword }: Props) {
  const [confirm, setConfirm] = useState(false);
  const { t } = useTranslate();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStep(2);
  }

  function onPasswordChange(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function onConfirmChange(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const _value = event.target.value;
    if (_value === password) setConfirm(true);
    else setConfirm(false);
  }

  return (
    <Box>
      <Typography>{`${t('step')} 1: ${t('createPassword')}`}</Typography>
      <CssForm onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
        <TextField
          type="password"
          placeholder={t('enterPassword')}
          name="password"
          onChange={(event) => onPasswordChange(event)}
        />
        <TextField
          type="password"
          placeholder={t('confirmPassword')}
          name="confirm"
          onChange={(event) => onConfirmChange(event)}
          sx={{ mt: 1 }}
        />
        <Button disabled={!confirm} variant="contained" type="submit" sx={{ mt: 1 }}>
          {t('next')}
        </Button>
      </CssForm>
    </Box>
  );
}
