import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useDispatch } from 'react-redux';
import { updateStatus } from 'src/redux/myWalletSlice';

export default function ImportWallet() {
  const dispatch = useDispatch();

  return (
    <>
      <Box display="flex" alignItems="center">
        <IconButton onClick={() => dispatch(updateStatus('init'))} sx={{ mr: 1 }}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography>Import your Wallet</Typography>
      </Box>
    </>
  );
}
