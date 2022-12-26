import { Box, Button, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import { ROUTE } from 'src/configs/constance';
import useTranslate from 'src/hooks/useTranslate';
import { EthQuery } from 'src/packages/network-interaction/eth-query';
import PropertiesList from './PropertiesList';

export default function RpcRequest() {
  const { t } = useTranslate();
  const [rpcUrl, setRpcUrl] = useState<string | undefined>(undefined);
  const [balanceParam, setBalanceParam] = useState('');
  const [balanceResult, setBalanceResult] = useState('');

  const ethQuery = useMemo(() => {
    if (rpcUrl) return new EthQuery(rpcUrl);
    else return undefined;
  }, [rpcUrl]);

  async function onBalanceClick() {
    const _balance = balanceParam.split(',') as [string, string];
    if (ethQuery) {
      const _result = await ethQuery.getBalance(_balance[0]);
      if (_result) setBalanceResult(_result.toString());
    }
  }

  return (
    <>
      <CssBreadcrumbs
        configs={[
          { label: t('wallet'), link: ROUTE.WALLET_OVERVIEW },
          { label: t('walletUtils'), link: ROUTE.WALLET_UTILS },
          { label: t('rpcRequest') },
        ]}
      />
      <Box display="flex" alignItems="center" mt={1}>
        <Box sx={{ width: '10%' }}>
          <Typography>RPC URL</Typography>
        </Box>
        <Box sx={{ width: '90%' }}>
          <TextField fullWidth onChange={(e) => setRpcUrl(e.target.value)} />
          <Typography color="secondary" sx={{ fontSize: '12px' }}>{`${t(
            'example'
          )}: https://bsc-dataseed.binance.org`}</Typography>
        </Box>
      </Box>
      <Box mt={1}>
        <Box sx={{ borderTop: '1px solid', pt: 1 }}>
          <Typography variant="h4">getBalance</Typography>
          <PropertiesList
            data={[
              { name: 'address', type: 'string', example: '0x871DBcE2b9923A35716e7E83ee402B535298538E' },
              { name: 'block', type: 'string or earliest | finalized | safe | latest | pending', example: 'latest' },
            ]}
          />
          <TextField
            fullWidth
            placeholder="Enter balance param"
            onChange={(e) => setBalanceParam(e.currentTarget.value)}
          />
          <Box display="flex" alignItems="center">
            <Button sx={{ mt: 1, mr: 1 }} variant="outlined" onClick={() => onBalanceClick()}>
              {t('submit')}
            </Button>
            {balanceResult.length > 0 && <Typography>{`${t('result')}: ${balanceResult}`}</Typography>}
          </Box>
        </Box>
      </Box>
    </>
  );
}
