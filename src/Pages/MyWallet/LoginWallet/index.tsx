import { Box, Typography } from '@mui/material';
import { TextCopy } from 'src/components/Icons/CopyIcon';
import useTranslate from 'src/hooks/useTranslate';
import { useAppSelector } from 'src/redux/hook';
import { formatAddress } from 'src/services';

export default function LoginWallet() {
  const { t } = useTranslate();
  const { account, tokens } = useAppSelector((state) => state.myWalletStateSlice);
  const { accounts } = account;

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
      <Box sx={{ border: '1px solid', p: 1, borderRadius: '5px' }}>
        <Typography variant="body3" sx={{ mb: 1 }}>
          {t('tokens')}
        </Typography>
        {tokens.map((token, index) => {
          return (
            <Box key={index}>
              <Typography>{`${token.balance.raw} ${token.baseData.symbol}`}</Typography>
            </Box>
          );
        })}
      </Box>
    </>
  );
}
