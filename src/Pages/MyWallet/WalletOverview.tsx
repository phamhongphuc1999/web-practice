import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';

export default function WalletOverview() {
  const history = useHistory();

  return (
    <>
      <CssBreadcrumbs configs={[{ label: 'Wallet Overview' }]} props={{ mb: 2 }} />
      <Button variant="outlined" onClick={() => history.push('/my-wallet/utils')}>
        Test utils
      </Button>
    </>
  );
}
