import { Box, Typography } from '@mui/material';
import { TextCopy } from 'src/components/Icons/CopyIcon';
import useTranslate from 'src/hooks/useTranslate';
import { useAppSelector } from 'src/redux/hook';
import { formatAddress } from 'src/services';

export default function LoginWallet() {
  const { t } = useTranslate();
  const { accounts } = useAppSelector((state) => state.myWalletStateSlice.account);

  return (
    <>
      <Typography>{t('loginWallet')}</Typography>
      {accounts && (
        <Box mt={2}>
          <Typography>{t('walletInfo')}</Typography>
          <TextCopy
            title={`${t('accountAddress')}: ${formatAddress(accounts[0])}`}
            iconProps={{ copyText: accounts[0] }}
          />
        </Box>
      )}
    </>
  );
}
