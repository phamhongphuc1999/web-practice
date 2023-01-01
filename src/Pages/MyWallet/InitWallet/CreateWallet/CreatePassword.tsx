import { Box, Button, Typography } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import PasswordTextField from 'src/components/TextField/PasswordTextField';
import { CssForm } from 'src/components/utils';
import useTranslate from 'src/hooks/useTranslate';
import { useAppDispatch } from 'src/redux/hook';
import { savePassword } from 'src/redux/my-wallet/myWalletSlice';
import { actionController } from 'src/WalletObject/background';

interface Props {
  setStep: (step: number) => void;
  password: string | undefined;
  setPassword: (password: string | undefined) => void;
  setAccounts: (accounts: string[]) => void;
  setMnemonic: (mnemonic: string) => void;
}

export default function CreatePassword({ setStep, password, setPassword, setAccounts, setMnemonic }: Props) {
  const dispatch = useAppDispatch();
  const [confirm, setConfirm] = useState(false);
  const { t } = useTranslate();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (actionController && password) {
      dispatch(savePassword(password));
      const vault = await actionController.createNewVaultAndKeychain(password);
      if (vault) setAccounts(vault.keyrings.map((item) => item.accounts).reduce((result, data) => result.concat(data)));
      const _mnemonic = await actionController.verifySeedPhrase();
      if (_mnemonic) setMnemonic(_mnemonic);
    }
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
        <PasswordTextField
          props={{ placeholder: t('enterPassword'), name: 'password', onChange: (event) => onPasswordChange(event) }}
        />
        <PasswordTextField
          props={{
            placeholder: t('confirmPassword'),
            name: 'confirm',
            onChange: (event) => onConfirmChange(event),
            sx: { mt: 2 },
          }}
        />
        <Button disabled={!confirm} variant="contained" type="submit" sx={{ mt: 1 }}>
          {t('next')}
        </Button>
      </CssForm>
    </Box>
  );
}
