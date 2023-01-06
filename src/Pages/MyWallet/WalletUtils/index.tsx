import { Box, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import { ROUTE } from 'src/configs/constance';
import useTranslate from 'src/hooks/useTranslate';

export default function WalletUtils() {
  const history = useHistory();
  const { t } = useTranslate();

  return (
    <>
      <CssBreadcrumbs
        configs={[{ label: t('wallet'), link: ROUTE.WALLET_OVERVIEW }, { label: t('walletUtils') }]}
        props={{ mb: 2 }}
      />
      <Box mt={2}>
        <Button variant="outlined" sx={{ mr: 1 }} onClick={() => history.push(ROUTE.WALLET_MNEMONIC)}>
          Mnemonic
        </Button>
        <Button variant="contained" sx={{ mr: 1 }} onClick={() => history.push(ROUTE.WALLET_BROWSER_PASSWORD)}>
          Wallet browser password
        </Button>
        <Button variant="contained" sx={{ mr: 1 }} color="error" onClick={() => history.push(ROUTE.WALLET_RPC)}>
          {t('rpcRequest')}
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => history.push(ROUTE.WALLET_SIGN_TRANSACTION)}>
          Sign Transaction
        </Button>
      </Box>
    </>
  );
}
