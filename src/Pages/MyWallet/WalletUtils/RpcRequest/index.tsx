import { Box, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import CopyIcon from 'src/components/Icons/CopyIcon';
import { ROUTE } from 'src/configs/constance';
import useTranslate from 'src/hooks/useTranslate';
import { EthQuery } from 'src/packages/network-interaction/eth-query';
import { EthBlock } from 'src/packages/network-interaction/type';
import BlockResult from './components/BlockResult';
import RpcForm from './RpcForm';

const defaultAddressParam = { name: 'address', type: 'string', example: '0x871DBcE2b9923A35716e7E83ee402B535298538E' };
const defaultBlockParam = {
  name: 'block',
  type: 'string or earliest | finalized | safe | latest | pending',
  example: 'latest',
};
const defaultBlockHashParam = {
  name: 'Block hash',
  type: 'string',
  example: '0x8cd1a03b8c66629026515d500467b54c3c0f0fba5e5db35dbcc871f449f1e511',
};

export default function RpcRequest() {
  const { t } = useTranslate();
  const [rpcUrl, setRpcUrl] = useState<string | undefined>(undefined);
  const isDisable = rpcUrl === undefined || rpcUrl.length == 0;

  //eth_getBlockByHash
  const [blockByHashParam, setBlockByHashParam] = useState('');
  const [blockByHashResult, setBlockByHashResult] = useState<EthBlock | null>(null);

  //eth_getBlockByNumber
  const [blockByNumberParam, setBlockByNumberParam] = useState('');
  const [blockByNumberResult, setBlockByNumberResult] = useState<EthBlock | null>(null);

  //eth_getBlockTransactionCountByHash
  const [blockTransactionCountByHashParam, setBlockTransactionCountByHashParam] = useState('');
  const [blockTransactionCountByHashResult, setBlockTransactionCountByHashResult] = useState('');

  //eth_getBalance
  const [balanceParam, setBalanceParam] = useState('');
  const [balanceResult, setBalanceResult] = useState('');

  //eth_getTransactionCount
  const [transactionCountParam, setTransactionCountParam] = useState('');
  const [transactionCountResult, setTransactionCountResult] = useState('');

  const ethQuery = useMemo(() => {
    if (rpcUrl) {
      try {
        const _ethQuery = new EthQuery(rpcUrl);
        _ethQuery.addRequestMiddleware((request) => {
          return { request };
        });
        return _ethQuery;
      } catch (_) {
        return undefined;
      }
    } else return undefined;
  }, [rpcUrl]);

  async function onBlockByHashClick() {
    const _blockByHash = blockByHashParam.split(',') as [string, string];
    if (ethQuery) {
      const _result = await ethQuery.getBlockByHash(_blockByHash[0], Boolean(_blockByHash[1]));
      setBlockByHashResult(_result);
    }
  }

  async function onBlockTransactionCountByHashClick() {
    if (ethQuery) {
      const _result = await ethQuery.getBlockTransactionCountByHash(blockTransactionCountByHashParam);
      if (_result) setBlockTransactionCountByHashResult(_result);
    }
  }

  async function onBlockByNumberClick() {
    const _blockByNumber = blockByNumberParam.split(',') as [string, string];
    if (ethQuery) {
      const _result = await ethQuery.getBlockByNumber(_blockByNumber[0], Boolean(_blockByNumber[1]));
      setBlockByHashResult(_result);
    }
  }

  async function onBalanceClick() {
    const _balance = balanceParam.split(',') as Array<string>;
    if (ethQuery) {
      let _result: string | null = null;
      if (_balance.length == 1) _result = await ethQuery.getBalance(_balance[0]);
      else if (_balance.length > 1) _result = await ethQuery.getBalance(_balance[0], _balance[1]);
      if (_result) setBalanceResult(_result);
    }
  }

  async function onTransactionCountClick() {
    const _transactionCount = transactionCountParam.split(',') as [string, string];
    if (ethQuery) {
      const _result = await ethQuery.getTransactionCount(_transactionCount[0]);
      if (_result) setTransactionCountResult(_result);
    }
  }

  return (
    <>
      <CssBreadcrumbs
        configs={[
          { label: t('wallet'), link: ROUTE.WALLET_OVERVIEW },
          { label: t('walletUtils'), link: ROUTE.WALLET_UTILS },
          { label: t('rpcRequest') },
        ]}
      />
      <Box display="flex" alignItems="center" mt={1}>
        <Box sx={{ width: '10%' }}>
          <Typography>RPC URL</Typography>
        </Box>
        <Box sx={{ width: '90%' }}>
          <TextField fullWidth onChange={(e) => setRpcUrl(e.target.value)} />
          <Box display="flex" alignItems="center">
            <Typography color="secondary" sx={{ fontSize: '12px' }}>{`${t(
              'example'
            )}: https://bsc-dataseed.binance.org`}</Typography>
            <CopyIcon
              copyText="https://bsc-dataseed.binance.org"
              iconProps={{ color: 'secondary', fontSize: 'small' }}
            />
          </Box>
        </Box>
      </Box>
      <Box mt={1}>
        <RpcForm
          requestName="getBlockByHash"
          isSubmitDisable={isDisable}
          listProps={{
            data: [defaultBlockHashParam, { name: 'Hydrated transactions', type: 'boolean' }],
          }}
          events={{
            onChange: (value) => setBlockByHashParam(value),
            onSubmitClick: onBlockByHashClick,
            onDeleteClick: () => setBlockByHashResult(null),
          }}
          Components={{ ResultComponent: <BlockResult blockData={blockByHashResult} /> }}
        />
        <RpcForm
          requestName="getBlockByNumber"
          isSubmitDisable={isDisable}
          listProps={{
            data: [defaultBlockParam, { name: 'Hydrated transactions', type: 'boolean' }],
          }}
          events={{
            onChange: (value) => setBlockByNumberParam(value),
            onSubmitClick: onBlockByNumberClick,
            onDeleteClick: () => setBlockByNumberResult(null),
          }}
          Components={{ ResultComponent: <BlockResult blockData={blockByNumberResult} /> }}
        />
        <RpcForm
          requestName="getBlockTransactionCountByHash"
          isSubmitDisable={isDisable}
          listProps={{ data: [defaultBlockHashParam] }}
          events={{
            onChange: (value) => setBlockTransactionCountByHashParam(value),
            onSubmitClick: onBlockTransactionCountByHashClick,
            onDeleteClick: () => setBlockTransactionCountByHashResult(''),
          }}
          result={blockTransactionCountByHashResult}
        />
        <RpcForm
          requestName="getBalance"
          isSubmitDisable={isDisable}
          listProps={{ data: [defaultAddressParam, defaultBlockParam] }}
          events={{
            onChange: (value) => setBalanceParam(value),
            onSubmitClick: onBalanceClick,
            onDeleteClick: () => setBalanceResult(''),
          }}
          result={balanceResult}
        />
        <RpcForm
          requestName="getTransactionCount"
          isSubmitDisable={isDisable}
          listProps={{ data: [defaultAddressParam, defaultBlockParam] }}
          events={{
            onChange: (value) => setTransactionCountParam(value),
            onSubmitClick: onTransactionCountClick,
            onDeleteClick: () => setTransactionCountResult(''),
          }}
          result={transactionCountResult}
        />
      </Box>
    </>
  );
}
