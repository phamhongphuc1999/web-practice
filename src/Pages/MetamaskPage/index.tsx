import { Box, Typography } from '@mui/material';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import ConnectedButton from 'src/components/Button/ConnectedButton';
import CopyIcon from 'src/components/Icons/CopyIcon';
import useTranslate from 'src/hooks/useTranslate';
import { useAppSelector } from 'src/redux/hook';
import { walletInitialState } from 'src/redux/walletSlice';
import { formatAddress } from 'src/services';

export default function MetamaskPage() {
  const { chainId, hexChainId, accountAddress } = useAppSelector<walletInitialState>((state) => state.walletSlice);
  const { t } = useTranslate();

  return (
    <>
      <CssBreadcrumbs configs={[{ label: 'metamask' }]} props={{ mb: 2 }} />
      <ConnectedButton props={{ variant: 'contained' }} />
      <Box mt={2}>
        <Typography>{t('data')}</Typography>
        <Box display="flex" alignItems="center" flexWrap="wrap">
          <Typography>Chain id: {hexChainId},</Typography>
          <Typography>
            {t('network')}: {chainId},
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography>
              {t('accountAddress')}: {formatAddress(accountAddress, 5)}
            </Typography>
            <CopyIcon copyText={accountAddress} defaultText={t('copyAddress')} successText={t('copiedAddress')} />
          </Box>
        </Box>
      </Box>
    </>
  );
}