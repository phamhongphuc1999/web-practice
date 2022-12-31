import { Box, Button, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import CopyIcon from 'src/components/Icons/CopyIcon';
import InfoIcon from 'src/components/Icons/InfoIcon';
import { ROUTE } from 'src/configs/constance';
import useTranslate from 'src/hooks/useTranslate';
import { formatAddress } from 'src/services';
import HDKeyring from 'src/WalletObject/keyring-object/hd-keyring';

export default function CreateMnemonic() {
  const { t } = useTranslate();
  const [mnemonic, setMnemonic] = useState('');
  const [firstAccount, setFirstAccount] = useState('');
  const [privateKey, setPrivateKey] = useState<string | undefined>(undefined);

  const hdWallet = useMemo(() => {
    return new HDKeyring();
  }, []);

  async function onMnemonicClick() {
    try {
      if (hdWallet) {
        hdWallet.generateRandomMnemonic();
        const [account] = hdWallet.addAccounts();
        setFirstAccount(account);
        const serialized = await hdWallet.serialize();
        if (serialized?.mnemonic) setMnemonic(serialized?.mnemonic);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function onExportAccountClick() {
    if (hdWallet) {
      const _data = hdWallet.exportAccount(firstAccount);
      setPrivateKey(_data);
    }
  }

  return (
    <>
      <CssBreadcrumbs
        configs={[
          { label: t('wallet'), link: ROUTE.WALLET_OVERVIEW },
          { label: t('walletUtils'), link: ROUTE.WALLET_UTILS },
          { label: 'mnemonic' },
        ]}
        props={{ mb: 2 }}
      />
      <Box mb={2}>
        <Button variant="contained" onClick={() => onMnemonicClick()}>
          {t('createMnemonic')}
        </Button>
      </Box>
      {mnemonic.length > 0 && (
        <Box sx={{ borderTop: '0.5px solid', mt: 1, pt: 1 }}>
          <Box display="flex" mb={1}>
            <Typography variant="subtitle1">{t('yourMnemonic')}</Typography>
            <InfoIcon info={t('saveMnemonic')} iconProps={{ sx: { ml: 0.25 } }} />
          </Box>
          <TextField value={mnemonic} fullWidth multiline />
        </Box>
      )}
      {firstAccount.length > 0 && (
        <>
          <Box mt={2} display="flex" alignItems="center">
            <Typography variant="subtitle1">{`${t('accountAddress')}: `}</Typography>
            <Typography sx={{ marginLeft: 0.5 }}>{formatAddress(firstAccount, 5)}</Typography>
            <CopyIcon copyText={firstAccount} defaultText={t('copyAddress')} successText={t('copiedAddress')} />
            <Button variant="outlined" onClick={() => onExportAccountClick()}>
              Export account
            </Button>
          </Box>
          {privateKey && (
            <Box mt={2} display="flex" alignItems="center">
              <TextField value={privateKey} fullWidth multiline />
              <CopyIcon copyText={privateKey} defaultText={t('copyPrivateKey')} successText={t('copiedPrivateKey')} />
            </Box>
          )}
        </>
      )}
    </>
  );
}
