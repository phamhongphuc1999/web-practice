import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import TokenInformation from 'src/blockchain-interaction/token-information';
import { isAddress } from 'src/blockchain-interaction/utils';
import { CssForm } from 'src/components/utils';
import { ROUTE } from 'src/configs/constance';
import { EthToken } from 'src/global';
import useTranslate from 'src/hooks/useTranslate';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { updateTokens } from 'src/redux/my-wallet/myWalletStateSlice';
import { actionController } from 'src/WalletObject/background';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useHistory } from 'react-router-dom';

export default function AddToken() {
  const { t } = useTranslate();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [tokenAddress, setTokenAddress] = useState('');
  const [tokenAddressHelpText, setTokenAddressHelpText] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [tokenDecimal, setTokenDecimal] = useState('');
  const { currentNetwork } = useAppSelector((state) => state.myWalletStateSlice);

  function onChange(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const _token = event.target.value;
    setTokenAddress(event.target.value);
    if (isAddress(_token)) setTokenAddressHelpText('');
    else {
      setTokenAddressHelpText('Token address is invalid');
      setTokenDecimal('');
      setTokenSymbol('');
      setTokenName('');
    }
  }

  async function fetchTokenData() {
    if (currentNetwork && tokenAddressHelpText.length === 0) {
      const token = new TokenInformation(tokenAddress, currentNetwork.provider.rpcUrl);
      const _decimal = await token.decimals();
      const _symbol = await token.symbol();
      const _name = await token.name();
      setTokenDecimal(_decimal.toString());
      setTokenSymbol(_symbol);
      setTokenName(_name);
    }
  }

  async function importToken(event: FormEvent) {
    event.preventDefault();
    if (actionController) {
      const ethToken = {
        address: tokenAddress,
        name: tokenName,
        symbol: tokenSymbol,
        decimals: Number(tokenDecimal),
      } as EthToken;
      actionController.networkController.tokenController.importToken(ethToken);
      const tokens = actionController.networkController.tokenController.getTokens();
      dispatch(updateTokens(tokens)).then(() => history.push(ROUTE.WALLET_OVERVIEW));
    }
  }

  useEffect(() => {
    fetchTokenData();
  }, [tokenAddress]);

  return (
    <>
      <Box display="flex" alignItems="center">
        <IconButton sx={{ mr: 1 }} onClick={() => history.push(ROUTE.WALLET_OVERVIEW)}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography>{t('importToken')}</Typography>
      </Box>
      <CssForm sx={{ mt: 1 }} onSubmit={importToken}>
        <TextField
          size="small"
          label={t('address')}
          error={tokenAddressHelpText.length > 0}
          helperText={tokenAddressHelpText.length > 0 ? tokenAddressHelpText : null}
          fullWidth
          onChange={(event) => onChange(event)}
        />
        {tokenSymbol.length > 0 && (
          <Typography>
            {t('symbol')}: {tokenSymbol}
          </Typography>
        )}
        {tokenName.length > 0 && (
          <Typography>
            {t('name')}: {tokenName}
          </Typography>
        )}
        {tokenDecimal.length > 0 && <Typography>Decimal: {tokenDecimal}</Typography>}
        <Button
          type="submit"
          sx={{ mt: 1 }}
          disabled={tokenSymbol.length === 0 || tokenDecimal.length === 0}
          variant="contained"
        >
          {t('submit')}
        </Button>
      </CssForm>
    </>
  );
}
