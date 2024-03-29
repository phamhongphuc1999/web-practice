import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextCopy } from 'src/components/Icons/CopyIcon';
import PasswordTextField from 'src/components/TextField/PasswordTextField';
import { CssForm } from 'src/components/utils';
import useTranslate from 'src/hooks/useTranslate';
import { useAppDispatch } from 'src/redux/hook';
import { savePassword, updateStatus } from 'src/redux/my-wallet/myWalletSlice';
import { formatAddress } from 'src/services';
import { actionController } from 'src/wallet-object/background';
import { initWallet } from 'src/wallet-object/RestoreWalletLogic';

export default function ImportWallet() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { t } = useTranslate();
  const [seedPhrase, setSeedPhrase] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accounts, setAccounts] = useState<Array<string>>([]);

  function onDataChange(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    event.preventDefault();
    setSeedPhrase(event.target.value);
  }

  function onPasswordChange(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    event.preventDefault();
    setPassword(event.target.value);
  }

  function onConfirmChange(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    event.preventDefault();
    setConfirmPassword(event.target.value);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (actionController && password.length > 0) {
      dispatch(savePassword(password));
      const vault = await actionController.createNewVaultAndRestore(password, seedPhrase);
      if (vault)
        setAccounts(
          vault.keyrings.map((item) => item.accounts).reduce((result, data) => result.concat(data))
        );
    }
  }

  async function nextClick() {
    await initWallet(password, dispatch, { history });
    dispatch(updateStatus('login'));
  }

  return (
    <>
      <Box display="flex" alignItems="center">
        <IconButton onClick={() => dispatch(updateStatus('init'))} sx={{ mr: 1 }}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography>{t('importWallet')}</Typography>
      </Box>
      {accounts.length == 0 ? (
        <CssForm onSubmit={handleSubmit}>
          <TextField
            fullWidth
            placeholder={t('enterMnemonic')}
            onChange={(event) => onDataChange(event)}
            multiline
            minRows={2}
          />
          <Typography sx={{ mt: 2 }}>{t('createPassword')}</Typography>
          <PasswordTextField
            props={{
              value: password,
              fullWidth: true,
              placeholder: t('enterPassword'),
              name: 'password',
              onChange: (event) => onPasswordChange(event),
            }}
          />
          <PasswordTextField
            props={{
              value: confirmPassword,
              fullWidth: true,
              placeholder: t('confirmPassword'),
              name: 'confirm',
              onChange: (event) => onConfirmChange(event),
              sx: { mt: 2 },
            }}
          />
          <Button
            fullWidth
            disabled={confirmPassword !== password || password.length === 0}
            variant="contained"
            type="submit"
            sx={{ mt: 1 }}
          >
            {t('confirm')}
          </Button>
        </CssForm>
      ) : (
        <>
          <TextCopy
            title={`${t('accountAddress')}: ${formatAddress(accounts[0])}`}
            iconProps={{
              copyText: accounts[0],
              defaultText: t('copyAddress'),
              successText: t('copiedAddress'),
            }}
          />
          <Button variant="contained" type="submit" sx={{ mt: 1 }} onClick={() => nextClick()}>
            {t('next')}
          </Button>
        </>
      )}
    </>
  );
}
