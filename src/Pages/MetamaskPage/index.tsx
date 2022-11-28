import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import ConnectedButton from 'src/components/Button/ConnectedButton';
import CopyIcon from 'src/components/Icons/CopyIcon';
import { RootState } from 'src/redux/store';
import { formatAddress } from 'src/services';

export default function MetamaskPage() {
  const { chainId, accountAddress } = useSelector<RootState, { chainId: string; accountAddress: string }>(
    (state) => state.walletSlice
  );
  return (
    <>
      <CssBreadcrumbs configs={[{ label: 'metamask' }]} props={{ mb: 2 }} />
      <ConnectedButton props={{ variant: 'contained' }} />
      <Box mt={2}>
        <Typography>Data</Typography>
        <Box display="flex" alignItems="center" flexWrap="wrap">
          <Typography>ChainId: {chainId}</Typography>
          <Box display="flex" alignItems="center">
            <Typography sx={{ marginLeft: '0.5rem' }}>Account address: {formatAddress(accountAddress, 5)}</Typography>
            <CopyIcon copyText={accountAddress} defaultText="Copy address" successText="Copied address!" />
          </Box>
        </Box>
      </Box>
    </>
  );
}
