import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import { isAddress } from 'ethers/lib/utils';
import { useMemo, useState } from 'react';
import Bep20 from 'src/assets/abis/BEP20.json';
import CopyIcon from 'src/components/Icons/CopyIcon';
import ExploreIcon from 'src/components/Icons/ExploreIcon';
import CssSelector, { CssSelectItem } from 'src/components/Selector/CssSelector';
import { CHAINS, CHAIN_ALIASES } from 'src/configs/networkConfig';
import useTranslate from 'src/hooks/useTranslate';
import { formatAddress, numberWithCommas } from 'src/services';
import { useImmer } from 'use-immer';
import ReadMethods from './ReadMethods';

interface ExtendItem extends CssSelectItem {
  chainId: number;
  url: string;
}

export default function Bep20Contract() {
  const [addressTextHelper, setAddressTextHelper] = useState<string | undefined>(undefined);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [tokenData, setTokenData] = useImmer({
    name: '',
    symbol: '',
    decimal: 0,
    owner: '',
    totalSupply: '',
  });
  const { t } = useTranslate();

  const NetworkList = Object.values(CHAIN_ALIASES).map((element, _) => ({
    id: element.toString(),
    chainId: element,
    label: CHAINS[element].name,
    url: CHAINS[element].urls[0],
  }));
  const [network, setNetwork] = useState(NetworkList[0]);

  const contract = useMemo(() => {
    if (network.url && isAddress(address))
      return new ethers.Contract(address, Bep20, new ethers.providers.JsonRpcProvider(network.url));
    return undefined;
  }, [network.url, address]);

  function onAddressChange(value: string) {
    setAddress(value);
    if (isAddress(value)) setAddressTextHelper('');
    else setAddressTextHelper('Address is invalid');
  }

  function onChooseItem(_: React.MouseEvent<HTMLDivElement, MouseEvent>, item: ExtendItem) {
    setNetwork(item);
  }

  async function onConfirmClick() {
    setLoading(true);
    if (contract) {
      const [name, symbol, decimal, owner, totalSupply] = await Promise.all([
        await contract.name(),
        await contract.symbol(),
        await contract.decimals(),
        await contract.getOwner(),
        await contract.totalSupply(),
      ]);
      setTokenData((draft) => {
        draft.name = name;
        draft.symbol = symbol;
        draft.decimal = decimal;
        draft.owner = owner;
        draft.totalSupply = BigNumber(totalSupply._hex).div(BigNumber('10').pow(decimal)).toFixed();
      });
    }
    setLoading(false);
  }

  return (
    <>
      <Box display="flex" alignItems="center" mt={2} mb={1}>
        <Box display="flex" alignItems="center" width="60%">
          <Typography sx={{ pr: 2 }}>{t('address')}</Typography>
          <TextField
            size="small"
            placeholder={t('contractAddress')}
            value={address}
            onChange={(e) => onAddressChange(e.target.value)}
            error={Boolean(addressTextHelper)}
            helperText={addressTextHelper}
            sx={{ width: '100%' }}
          />
        </Box>
        <CssSelector<ExtendItem>
          items={NetworkList}
          value={network.label}
          events={{ onChooseItem: onChooseItem }}
          props={{ ml: 1 }}
        />
        <Button
          sx={{ marginLeft: '1rem' }}
          disabled={addressTextHelper != ''}
          variant="outlined"
          onClick={onConfirmClick}
        >
          {t('confirm')}
        </Button>
      </Box>
      <Typography color="secondary" sx={{ fontSize: '12px', marginBottom: '4px' }}>
        {t('example')}: 0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3
      </Typography>
      {loading && <CircularProgress />}
      {addressTextHelper == '' && (
        <>
          <Box display="flex" alignItems="center">
            <Typography>Address: {formatAddress(address)}</Typography>
            <CopyIcon copyText={address} />
            <ExploreIcon hash={address} config={{ chainId: network.chainId }} />
          </Box>
          <Box>
            <Typography>{`${t('name')}: ${tokenData.name}, ${t('symbol')}: ${tokenData.symbol}, Decimal: ${
              tokenData.decimal
            }, ${t('totalSupply')}: ${numberWithCommas(tokenData.totalSupply, 2)}`}</Typography>
            <Box display="flex" alignItems="center">
              <Typography>Owner: {formatAddress(tokenData.owner)}</Typography>
              <CopyIcon copyText={tokenData.owner} />
              <ExploreIcon hash={tokenData.owner} config={{ chainId: network.chainId }} />
            </Box>
          </Box>
          {tokenData.decimal > 0 && <ReadMethods decimal={tokenData.decimal} contract={contract} />}
        </>
      )}
    </>
  );
}
