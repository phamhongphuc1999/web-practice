import { Button, DialogTitle } from '@mui/material';
import { ConnectModal, useDisconnectWallet } from '@mysten/dapp-kit';
import { useState } from 'react';
import CopyIcon from 'src/components/Icons/CopyIcon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from 'src/components/shadcn-ui/dialog';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import { useSuiWeb3 } from 'src/hooks/useSuiWeb3';
import { formatAddress } from 'src/services';

export default function SuiConnectionButton() {
  const [open, setOpen] = useState(false);
  const { t } = useLocalTranslate();
  const { address } = useSuiWeb3();
  const disconnectMutation = useDisconnectWallet();

  return address ? (
    <Dialog>
      <DialogTrigger>
        <Button variant="outlined" size="medium">
          {formatAddress(address, 4)}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connection wallet</DialogTitle>
          <DialogDescription>
            <p>{formatAddress(address, 4)}</p>
            <CopyIcon copyText={address} />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => disconnectMutation.mutate()}>Disconnect</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : (
    <ConnectModal
      trigger={
        <Button variant="contained" size="medium">
          {t('connect-sui')}
        </Button>
      }
      open={open}
      onOpenChange={(isOpen) => setOpen(isOpen)}
    />
  );
}
