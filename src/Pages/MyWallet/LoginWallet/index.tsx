import { Box, Button, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import CopyIcon, { TextCopy } from 'src/components/Icons/CopyIcon';
import { ROUTE } from 'src/configs/constance';
import useTranslate from 'src/hooks/useTranslate';
import { useAppSelector } from 'src/redux/hook';
import { formatAddress, numberWithCommas } from 'src/services';

export default function LoginWallet() {
  const { t } = useTranslate();
  const history = useHistory();
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
            <Box key={index} display="flex" alignItems="center">
              <Typography>{`${numberWithCommas(token.balance.raw)} ${
                token.baseData.symbol
              }(${numberWithCommas(token.balance.usd)} USD)`}</Typography>
              {token.baseData.address.length > 0 && <CopyIcon copyText={token.baseData.address} />}
            </Box>
          );
        })}
      </Box>
      <Button
        sx={{ mt: 1 }}
        variant="outlined"
        onClick={() => history.push(ROUTE.WALLET_ADD_TOKEN)}
      >
        {t('importToken')}
      </Button>
    </>
  );
}
