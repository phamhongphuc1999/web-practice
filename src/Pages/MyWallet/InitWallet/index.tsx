import { Box, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import useTranslate from 'src/hooks/useTranslate';
import { useAppSelector } from 'src/redux/hook';
import { updateStatus } from 'src/redux/my-wallet/myWalletSlice';
import CreateWallet from './CreateWallet';
import ImportWallet from './ImportWallet';

export default function InitWallet() {
  const dispatch = useDispatch();
  const { status } = useAppSelector((state) => state.myWalletSlice);
  const { t } = useTranslate();

  return (
    <Box mb={2}>
      {status === 'init' && (
        <>
          <Typography>{t('walletOverview')}</Typography>
          <Box display="flex" alignItems="center">
            <Button variant="contained" onClick={() => dispatch(updateStatus('create_wallet'))}>
              {t('createWallet')}
            </Button>
            <Typography sx={{ ml: 1, mr: 1 }}>{t('or')}</Typography>
            <Button variant="outlined" onClick={() => dispatch(updateStatus('import_wallet'))}>
              {t('importWallet')}
            </Button>
          </Box>
        </>
      )}
      {status === 'create_wallet' && <CreateWallet />}
      {status === 'import_wallet' && <ImportWallet />}
    </Box>
  );
}
