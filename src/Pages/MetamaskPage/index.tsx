import { Box, Typography } from '@mui/material';
import { hexlify } from 'ethers';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import ConnectionButton from 'src/components/Button/ConnectionButton';
import NetworkButton from 'src/components/Button/NetworkButton';
import CopyIcon from 'src/components/Icons/CopyIcon';
import ReactSeo from 'src/components/ReactSeo';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import { useAppSelector } from 'src/redux/store';
import { formatAddress } from 'src/services';
import { useAccount } from 'wagmi';

export default function MetamaskPage() {
  const { chainId } = useAccount();
  const { accountAddress } = useAppSelector((state) => state.user);
  const { t } = useLocalTranslate();

  return (
    <>
      <ReactSeo title="Metamask" />
      <CssBreadcrumbs configs={[{ label: 'metamask' }]} mb={2} />
      <ConnectionButton variant={'contained'} />
      <NetworkButton butProps={{ sx: { ml: 1 } }} />
      <Box mt={2}>
        <Typography>{t('data')}</Typography>
        <Box display="flex" alignItems="center" flexWrap="wrap">
          <Typography>Chain id: {hexlify((chainId ?? '0x').toString())},</Typography>
          <Typography>
            {t('network')}: {chainId},
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography>
              {t('accountAddress')}: {formatAddress(accountAddress, 5)}
            </Typography>
            <CopyIcon
              copyText={accountAddress}
              defaultText={t('copyAddress')}
              successText={t('copiedAddress')}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
