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
          Create mnemonic
        </Button>
        <Button variant="contained" onClick={() => history.push(ROUTE.WALLET_BROWSER_PASSWORD)}>
          Browser password
        </Button>
      </Box>
    </>
  );
}
