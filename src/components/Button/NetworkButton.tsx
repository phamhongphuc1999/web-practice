import {
  Box,
  Button,
  ButtonProps,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { CHAINS } from 'src/configs/networkConfig';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import BSC from 'src/assets/images/BSC.svg';
import ETH from 'src/assets/images/ETH.png';
import FTM from 'src/assets/images/FTM.svg';
import { switchNetwork } from 'src/wallet-connection/action';
import { useSnackbar } from 'notistack';

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

const chainConfig = [
  { chainId: 56, image: BSC, name: 'BSC Mainnet', width: '60px' },
  { chainId: 250, image: FTM, name: 'FTM Mainnet', width: '50px' },
  { chainId: 1, image: ETH, name: 'ETH Mainnet', width: '60px' },
  { chainId: 97, image: BSC, name: 'BSC Testnet', width: '60px' },
];

interface Props {
  butProps?: ButtonProps;
}

export default function NetworkButton({ butProps }: Props) {
  const theme = useTheme();
  const cls = useStyle(theme);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const { chainId } = useAppSelector((state) => state.walletSlice);

  async function changeNetwork(chainId: string) {
    const isSuccess = await switchNetwork(dispatch, enqueueSnackbar, chainId);
    if (isSuccess) setOpen(false);
  }

  return (
    <>
      <Button
        color="primary"
        variant="outlined"
        {...butProps}
        style={{ minWidth: '150px', ...butProps?.style }}
        onClick={() => setOpen(true)}
      >
        {CHAINS?.[chainId]?.name}
      </Button>
      <Dialog
        PaperProps={{ elevation: 0, style: { maxWidth: 550, padding: '0px' } }}
        fullWidth
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle sx={cls.title}>
          <Typography variant="h4">Select Network</Typography>
        </DialogTitle>
        <DialogContent sx={cls.content}>
          <List sx={{ display: 'flex' }} disablePadding>
            {chainConfig.map((item) => (
              <ListItem
                key={item.chainId}
                button
                sx={cls.listItem}
                onClick={() => changeNetwork(item.chainId.toString())}
              >
                <Box height={70}>
                  <img src={item.image} height={50} alt={item.name} />
                </Box>
                <Typography noWrap variant="subtitle2">
                  {item.name}
                </Typography>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
}
