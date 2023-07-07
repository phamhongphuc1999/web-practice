import { Box, Button, Typography } from '@mui/material';
import { TextCopy } from 'src/components/Icons/CopyIcon';
import useTranslate from 'src/hooks/useTranslate';
import { useAppDispatch } from 'src/redux/hook';
import { updateStatus } from 'src/redux/my-wallet/myWalletSlice';
import { formatAddress } from 'src/services';

interface Props {
  accounts: Array<string>;
}

export default function SuccessCreateWallet({ accounts }: Props) {
  const { t } = useTranslate();
  const dispatch = useAppDispatch();

  return (
    <Box>
      <Typography>{`${t('step')} 4: ${t('successCreateWallet')}`}</Typography>
      <TextCopy
        title={`${t('accountAddress')}: ${formatAddress(accounts[0])}`}
        iconProps={{
          copyText: accounts[0],
          defaultText: t('copyAddress'),
          successText: t('copiedAddress'),
        }}
      />
      <Button
        variant="contained"
        type="submit"
        sx={{ mt: 1 }}
        onClick={() => dispatch(updateStatus('login'))}
      >
        {t('next')}
      </Button>
    </Box>
  );
}
