import { Button, ButtonProps } from '@mui/material';
import { isAddress } from 'ethers';
import { useState } from 'react';
import { ConnectedWalletIcon, DisconnectedWalletIcon } from 'src/components/Icons';
import { useAppSelector } from 'src/redux/store';
import { formatAddress } from 'src/services';
import { useWalletAction } from 'src/WalletConnection/wagmi-connection/wallet-action';
import ConnectedDialog from './connected-dialog';
import ConnectionDialog from './connection-dialog';

export default function ConnectionButton(props: ButtonProps) {
  const [connectionOpen, setConnectionOpen] = useState(false);
  const [connectedOpen, setConnectedOpen] = useState(false);
  const { accountAddress } = useAppSelector((state) => state.user);
  const { connect, disconnect } = useWalletAction();

  function onClick() {
    if (isAddress(accountAddress)) setConnectedOpen(true);
    else setConnectionOpen(true);
  }

  return (
    <>
      <Button
        {...props}
        variant="contained"
        color="primary"
        onClick={onClick}
        startIcon={accountAddress ? <ConnectedWalletIcon /> : <DisconnectedWalletIcon />}
      >
        {accountAddress.length > 0 ? formatAddress(accountAddress, 4) : 'Connect Wallet'}
      </Button>
      <ConnectionDialog
        open={connectionOpen}
        connect={connect}
        onClose={() => setConnectionOpen(false)}
      />
      <ConnectedDialog
        open={connectedOpen}
        disconnect={disconnect}
        onClose={() => setConnectedOpen(false)}
      />
    </>
  );
}
