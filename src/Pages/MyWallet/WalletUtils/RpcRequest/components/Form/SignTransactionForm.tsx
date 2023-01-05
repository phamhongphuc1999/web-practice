import { Box, Button, Collapse, TextField, TextFieldProps, Typography } from '@mui/material';
import { useState } from 'react';
import EthQuery from 'src/blockchain-interaction/eth-query';
import { RawTransaction } from 'src/blockchain-interaction/type';
import ArrowAnimationIcon from 'src/components/Icons/ArrowAnimationIcon';
import { CssForm } from 'src/components/utils';
import useTranslate from 'src/hooks/useTranslate';
import { useImmer } from 'use-immer';
import PropertiesList from '../PropertiesList';

function SignTransactionProperties() {
  return (
    <PropertiesList
      data={[
        { name: 'type', type: 'string', example: '0x1' },
        { name: 'nonce', type: 'string', example: '0x0' },
        { name: 'to', type: 'string', example: '0x9A85752B25Cb26a1E42f8E095588e4647859Bc36' },
        { name: 'from', type: 'string', example: '0x9A85752B25Cb26a1E42f8E095588e4647859Bc36' },
      ]}
    />
  );
}

function CssTextField({ props }: { props: TextFieldProps }) {
  return <TextField {...props} size="small" fullWidth sx={{ mt: 1 }} />;
}

interface Props {
  ethQuery: EthQuery | undefined;
}

export default function SignTransactionForm({ ethQuery }: Props) {
  const { t } = useTranslate();
  const [open, setOpen] = useState(false);
  const [params, setParams] = useImmer<{ [key: string]: string }>({});
  const [result, setResult] = useState('');

  async function onSignTransactionClick() {
    if (ethQuery && params) {
      const _result = await ethQuery.signTransaction(params as RawTransaction);
      if (_result) setResult(_result);
    }
  }

  function onParamChange(name: string, param: string) {
    setParams((draft) => {
      draft[name] = param;
    });
  }

  return (
    <Box sx={{ borderTop: '1px solid', pt: 1, mt: 1 }}>
      <Box display="flex" justifyContent="space-between" sx={{ cursor: 'pointer' }} onClick={() => setOpen(!open)}>
        <Typography variant="h4">eth_signTransaction</Typography>
        <ArrowAnimationIcon isTransform={open} />
      </Box>
      <Collapse in={open}>
        <SignTransactionProperties />
        <CssForm>
          <CssTextField
            props={{ placeholder: 'type', onChange: (event) => onParamChange('type', event.target.value) }}
          />
          <CssTextField
            props={{ placeholder: 'nonce', onChange: (event) => onParamChange('nonce', event.target.value) }}
          />
          <CssTextField props={{ placeholder: 'to', onChange: (event) => onParamChange('to', event.target.value) }} />
          <CssTextField
            props={{ placeholder: 'from', onChange: (event) => onParamChange('from', event.target.value) }}
          />
          <CssTextField props={{ placeholder: 'gas', onChange: (event) => onParamChange('gas', event.target.value) }} />
          <CssTextField
            props={{ placeholder: 'value', onChange: (event) => onParamChange('value', event.target.value) }}
          />
          <CssTextField
            props={{ placeholder: 'input', onChange: (event) => onParamChange('input', event.target.value) }}
          />
          <CssTextField
            props={{ placeholder: 'gasPrice', onChange: (event) => onParamChange('gasPrice', event.target.value) }}
          />
          <CssTextField
            props={{
              placeholder: 'maxPriorityPerGas',
              onChange: (event) => onParamChange('maxPriorityPerGas', event.target.value),
            }}
          />
          <CssTextField
            props={{
              placeholder: 'maxFeePerGas',
              onChange: (event) => onParamChange('maxFeePerGas', event.target.value),
            }}
          />
          <CssTextField
            props={{ placeholder: 'accessList', onChange: (event) => onParamChange('accessList', event.target.value) }}
          />
          <CssTextField
            props={{ placeholder: 'chainId', onChange: (event) => onParamChange('chainId', event.target.value) }}
          />
        </CssForm>
        <Box display="flex" alignItems="center">
          <Button sx={{ mt: 1, mr: 1 }} variant="outlined" onClick={() => onSignTransactionClick()}>
            {t('submit')}
          </Button>
          <Button sx={{ mt: 1, mr: 1 }} variant="contained" color="error" onClick={() => setResult('')}>
            {t('delete')}
          </Button>
          {result && result.length > 0 && <Typography>{`${t('result')}: ${result}`}</Typography>}
        </Box>
      </Collapse>
    </Box>
  );
}
