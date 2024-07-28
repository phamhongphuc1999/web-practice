import { Button, ButtonProps } from '@mui/material';
import { useSnackbar } from 'notistack';
import useTranslate from 'src/hooks/useTranslate';
import { useAppDispatch, useAppSelector } from 'src/redux/store';
import { connectMetamask, disconnect } from 'src/wallet-connection/action';
import { ConnectedWalletIcon, DisconnectedWalletIcon } from '../Icons';

interface Props {
  props?: ButtonProps;
}

export default function ConnectedButton({ props }: Props) {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslate();
  const accountAddress = useAppSelector((state) => state.wallet.accountAddress);

  function onClick() {
    if (accountAddress) disconnect(dispatch);
    else connectMetamask(dispatch, enqueueSnackbar);
  }

  return (
    <Button
      {...props}
      onClick={() => onClick()}
      startIcon={accountAddress ? <ConnectedWalletIcon /> : <DisconnectedWalletIcon />}
    >
      {accountAddress ? t('disconnect') : t('connect')}
    </Button>
  );
}
