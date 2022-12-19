import { Box, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import CopyIcon from 'src/components/Icons/CopyIcon';
import useTranslate from 'src/hooks/useTranslate';
import { updateStatus } from 'src/redux/myWalletSlice';
import { formatAddress } from 'src/services';

interface Props {
  accounts: Array<string>;
}

export default function SuccessCreateWallet({ accounts }: Props) {
  const { t } = useTranslate();
  const dispatch = useDispatch();

  return (
    <Box>
      <Typography>{`${t('step')} 4: ${t('successCreateWallet')}`}</Typography>
      <Box display="flex" alignItems="center">
        <Typography>{`${t('accountAddress')}: ${formatAddress(accounts[0])}`}</Typography>
        <CopyIcon copyText={accounts[0]} defaultText={t('copyAddress')} successText={t('copiedAddress')} />
      </Box>
      <Button variant="contained" type="submit" sx={{ mt: 1 }} onClick={() => dispatch(updateStatus('login'))}>
        {t('next')}
      </Button>
    </Box>
  );
}
