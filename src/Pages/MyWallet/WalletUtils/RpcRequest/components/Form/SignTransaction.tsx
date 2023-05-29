import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import EthQuery from 'src/blockchain-interaction/eth-query';
import { TransactionSignReturn } from 'src/blockchain-interaction/transaction-module/type';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import CopyIcon from 'src/components/Icons/CopyIcon';
import { ROUTE } from 'src/configs/constance';
import useTranslate from 'src/hooks/useTranslate';
import { useAppSelector } from 'src/redux/hook';
import { formatAddress } from 'src/services';
import { actionController } from 'src/wallet-object/background';

const exampleTransaction = {
  gasPrice: '0x9184e72a000',
  to: '0x9A85752B25Cb26a1E42f8E095588e4647859Bc36',
  gasLimit: '0x5498',
  chainId: '0x61',
};

export default function SignTransaction() {
  const { t } = useTranslate();
  const { status } = useAppSelector((state) => state.myWalletStateSlice);
  const [result, setResult] = useState<TransactionSignReturn | undefined>(undefined);

  useEffect(() => {
    try {
      if (actionController && status === 'done') {
        const _result = actionController.signTransaction(exampleTransaction);
        setResult(_result);
      }
    } catch (error) {
      console.error(error);
    }
  }, [actionController, status]);

  async function sendRawTransaction() {
    const ethQuery = new EthQuery('https://data-seed-prebsc-1-s1.binance.org:8545/');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const transactionHash = await ethQuery.sendRawTransaction(
      '0xf865808609184e72a000825498949a85752b25cb26a1e42f8e095588e4647859bc36808026a0359142194243eb92d481c8072e9e4fca68e46cbc729600e59501f563236fc78ca04256e2f6fbe84f8e308121aadc3303cf7fa3add4d2d02aa3bfc4386648908121'
    );
  }

  return (
    <>
      <CssBreadcrumbs
        configs={[
          { label: t('wallet'), link: ROUTE.WALLET_OVERVIEW },
          { label: t('walletUtils'), link: ROUTE.WALLET_UTILS },
          { label: t('signTransaction') },
        ]}
      />
      {result && (
        <Box mt={2}>
          <Typography>{`messageHash: ${result.messageHash}`}</Typography>
          {result.v && <Typography>{`v: ${result.v}`}</Typography>}
          {result.r && <Typography>{`r: ${result.r}`}</Typography>}
          {result.s && <Typography>{`s: ${result.s}`}</Typography>}
          <Box display="flex" alignItems="center">
            <Typography>{`rawTransaction: ${formatAddress(result.rawTransaction, 10)}`}</Typography>
            <CopyIcon copyText={result.rawTransaction} />
          </Box>
          <Typography>{`transactionHash: ${result.transactionHash}`}</Typography>
          <Button variant="contained" onClick={() => sendRawTransaction()}>
            Click
          </Button>
        </Box>
      )}
    </>
  );
}
