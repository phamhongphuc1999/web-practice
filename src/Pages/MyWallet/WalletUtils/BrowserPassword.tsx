import * as encryptor from '@metamask/browser-passworder';
import { Box, Button, TextField, Typography } from '@mui/material';
import { FormEvent, useState } from 'react';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import { CssForm } from 'src/components/utils';
import { ROUTE } from 'src/configs/constance';
import useTranslate from 'src/hooks/useTranslate';

export default function BrowserPassword() {
  const { t } = useTranslate();
  const [encryptionKey, setEncryptionKey] = useState('');
  const [encryptedVault, setEnCryptedVault] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const parsedEncryptedVault = JSON.parse(encryptedVault.toString());
    const key = await encryptor.importKey(encryptionKey);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const vault = await encryptor.decryptWithKey(key, parsedEncryptedVault);
  }

  return (
    <>
      <CssBreadcrumbs
        configs={[
          { label: t('wallet'), link: ROUTE.WALLET_OVERVIEW },
          { label: t('walletUtils'), link: ROUTE.WALLET_UTILS },
          { label: 'Wallet browser password' },
        ]}
        props={{ mb: 2 }}
      />
      <Box>
        <Box sx={{ p: 2, my: 1, border: '1px solid' }}>
          <Typography>Decrypt With Key</Typography>
          <CssForm onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
            <TextField
              placeholder="Enter your encryption key"
              name="encryptionKey"
              onChange={(event) => setEncryptionKey(event.target.value)}
            />
            <TextField
              placeholder="Enter your encrypted vault"
              name="encryptedVault"
              onChange={(event) => setEnCryptedVault(event.target.value)}
              sx={{ mt: 1 }}
            />
            <Button variant="contained" type="submit" sx={{ mt: 1 }}>
              See result
            </Button>
          </CssForm>
        </Box>
      </Box>
    </>
  );
}
