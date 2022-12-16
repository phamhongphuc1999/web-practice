import { Box, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hook';
import { updateStatus } from 'src/redux/myWalletSlice';
import CreateWallet from './CreateWallet';
import ImportWallet from './ImportWallet';

export default function InitWallet() {
  const dispatch = useDispatch();
  const { status } = useAppSelector((state) => state.myWalletSlice);

  return (
    <Box mb={2}>
      {status === 'init' && (
        <>
          <Typography>Wallet overview</Typography>
          <Box display="flex" alignItems="center">
            <Button variant="contained" onClick={() => dispatch(updateStatus('create_wallet'))}>
              Create new Wallet
            </Button>
            <Typography sx={{ ml: 1, mr: 1 }}>OR</Typography>
            <Button variant="outlined" onClick={() => dispatch(updateStatus('import_wallet'))}>
              Import your Wallet
            </Button>
          </Box>
        </>
      )}
      {status === 'create_wallet' && <CreateWallet />}
      {status === 'import_wallet' && <ImportWallet />}
    </Box>
  );
}
