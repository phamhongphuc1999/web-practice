import { Box, Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import bep20 from 'src/assets/abis/BEP20.json';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import CopyIcon from 'src/components/Icons/CopyIcon';
import { ROUTE } from 'src/configs/constance';
import useTranslate from 'src/hooks/useTranslate';
import { formatAddress } from 'src/services';
import USeContract from './UseContract';

export default function MyContract() {
  const { t } = useTranslate();
  const [autoMode, setAutoMode] = useState(true);
  const [abi, setAbi] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [provider, setProvider] = useState('');

  useEffect(() => {
    if (autoMode) {
      setAbi(JSON.stringify(bep20));
      setContractAddress('0xA7E240b473D15E65A2114227C841ABf69DDC6Cd3');
      setProvider('https://data-seed-prebsc-1-s1.binance.org:8545/');
    } else {
      setAbi('');
      setContractAddress('');
      setProvider('');
    }
  }, [autoMode]);

  return (
    <>
      <CssBreadcrumbs
        configs={[{ label: t('contract'), link: ROUTE.CONTRACT }, { label: t('myContract') }]}
        props={{ mb: 2 }}
      />
      {!autoMode && (
        <Box mt={2}>
          <TextField
            fullWidth
            placeholder={t('enterYourAbi')}
            multiline
            rows={6}
            maxRows={8}
            onChange={(e) => setAbi(e.target.value)}
          />
          <TextField
            sx={{ mt: 1 }}
            fullWidth
            placeholder={t('contractAddress')}
            onChange={(e) => setContractAddress(e.target.value)}
          />
          <TextField
            sx={{ mt: 1 }}
            fullWidth
            placeholder={t('provider')}
            onChange={(e) => setProvider(e.target.value)}
          />
          <Typography sx={{ mt: 1 }}>{t('orUseBep20Default')}</Typography>
        </Box>
      )}
      <Box display="flex" alignItems="center">
        <Button
          variant="outlined"
          sx={{ mt: 1 }}
          onClick={() => {
            if (autoMode) setAutoMode(false);
            else setAutoMode(true);
          }}
        >
          {autoMode ? t('useCustom') : t('useBep20')}
        </Button>
        {autoMode && (
          <>
            <Typography sx={{ ml: 1 }}>{formatAddress(contractAddress, 5)}</Typography>
            <CopyIcon copyText={contractAddress} />
          </>
        )}
      </Box>
      <USeContract abi={abi} contractAddress={contractAddress} provider={provider} />
    </>
  );
}
