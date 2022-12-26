import { Box, Typography } from '@mui/material';
import NetworkSelector from 'src/components/Selector/NetworkSelector';
import useTranslate from 'src/hooks/useTranslate';
import { useAppSelector } from 'src/redux/hook';

export default function NetworkConfig() {
  const { t } = useTranslate();
  const { currentNetwork } = useAppSelector((state) => state.myWalletStateSlice);

  return (
    <Box mt={1} sx={{ borderTop: '1px solid', pt: 1 }}>
      <Box display="flex" alignItems="center">
        <Typography>{t('network')}</Typography>
        <NetworkSelector />
      </Box>
      {currentNetwork && (
        <Box mt={1}>
          <Typography variant="h5">{`${t('type')}: ${currentNetwork.provider.type}`}</Typography>
          <Typography variant="h5">{`Chain id: ${currentNetwork.chainId}`}</Typography>
          <Typography variant="h5">{`RPC: ${currentNetwork.provider.rpcUrl}`}</Typography>
        </Box>
      )}
    </Box>
  );
}
