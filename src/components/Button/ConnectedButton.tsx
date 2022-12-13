import { Button, ButtonProps } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hook';
import { connectMetamask, disconnect } from 'src/wallet-connection/action';

interface Props {
  props?: ButtonProps;
}

export default function ConnectedButton({ props }: Props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const accountAddress = useAppSelector<string>((state) => state.walletSlice.accountAddress);

  function onClick() {
    if (accountAddress) disconnect(dispatch);
    else connectMetamask(dispatch, enqueueSnackbar);
  }

  return (
    <Button {...props} onClick={() => onClick()}>
      {accountAddress ? 'Disconnect' : 'Connect'}
    </Button>
  );
}
