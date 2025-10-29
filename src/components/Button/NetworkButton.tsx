import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  ButtonProps,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import { isAddress } from 'ethers';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ChainConfig } from 'src/configs/constance';
import { CHAINS } from 'src/configs/network-config';
import { useAppSelector } from 'src/redux/store';
import { useWalletAction } from 'src/WalletConnection/wagmi-connection/wallet-action';

const useStyle = (theme: Theme) => ({
  title: {
    padding: '10px 20px 10px 20px',
    background: theme.palette.mode === 'dark' ? '#00244D' : '#F2F4F7',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    borderRadius: 10,
  },
  content: {
    padding: '20px',
  },
});

interface Props {
  butProps?: ButtonProps;
}

export default function NetworkButton({ butProps }: Props) {
  const theme = useTheme();
  const cls = useStyle(theme);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { chainId } = useAppSelector((state) => state.config);
  const { accountAddress } = useAppSelector((state) => state.user);
  const { switchNetwork } = useWalletAction();

  async function changeNetwork(chainId: number) {
    setOpen(false);
    setLoading(true);
    const data = await switchNetwork(chainId);
    if (data.status == 'fail') toast.error(data.error);
    setLoading(false);
  }

  return (
    <>
      <Button
        color="primary"
        variant="outlined"
        {...butProps}
        style={{ minWidth: '150px', ...butProps?.style }}
        onClick={() => setOpen(true)}
        startIcon={loading ? <CircularProgress size="14px" /> : <></>}
        disabled={loading}
      >
        {isAddress(accountAddress) ? CHAINS?.[chainId]?.name : 'Network'}
      </Button>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{ paper: { elevation: 0, className: 'p-0 rounded-[8px]' } }}
      >
        <DialogTitle sx={cls.title}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h5">Select Network</Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon sx={{ fontSize: '16px' }} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 4, mt: 2 }}>
            {ChainConfig.map((item) => (
              <Box
                key={item.chainId}
                onClick={() => changeNetwork(item.chainId)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    opacity: 0.8,
                  },
                }}
              >
                <img src={item.image} alt={item.name} className="mb-2 h-10 rounded-[50%]" />
                <Typography noWrap color="text.disabled" variant="body3">
                  {item.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
