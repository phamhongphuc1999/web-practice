import { Box, Typography } from '@mui/material';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import ConnectedButton from 'src/components/Button/ConnectedButton';
import CopyIcon from 'src/components/Icons/CopyIcon';
import { useAppSelector } from 'src/redux/hook';
import { walletInitialState } from 'src/redux/walletSlice';
import { formatAddress } from 'src/services';

export default function MetamaskPage() {
  const { chainId, hexChainId, accountAddress } = useAppSelector<walletInitialState>((state) => state.walletSlice);

  return (
    <>
      <CssBreadcrumbs configs={[{ label: 'metamask' }]} props={{ mb: 2 }} />
      <ConnectedButton props={{ variant: 'contained' }} />
      <Box mt={2}>
        <Typography>Data</Typography>
        <Box display="flex" alignItems="center" flexWrap="wrap">
          <Typography>ChainId: {hexChainId},</Typography>
          <Typography>Network: {chainId},</Typography>
          <Box display="flex" alignItems="center">
            <Typography>Account address: {formatAddress(accountAddress, 5)}</Typography>
            <CopyIcon copyText={accountAddress} defaultText="Copy address" successText="Copied address!" />
          </Box>
        </Box>
      </Box>
    </>
  );
}
