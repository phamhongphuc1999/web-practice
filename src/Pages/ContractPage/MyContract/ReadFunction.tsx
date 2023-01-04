/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Collapse, Paper, TextField, Typography } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import Contract from 'src/blockchain-interaction/contract-handler/contract';
import { FunctionFragment } from 'src/blockchain-interaction/contract-handler/type';
import ArrowAnimationIcon from 'src/components/Icons/ArrowAnimationIcon';
import useTranslate from 'src/hooks/useTranslate';

interface FunctionProps {
  contract: Contract;
  signature: string;
  data: FunctionFragment;
  isOpen?: boolean;
}

export default function ReadFunction({ contract, signature, data, isOpen }: FunctionProps) {
  const { t } = useTranslate();
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [params, setParams] = useState<{ [key: number]: any }>({});

  useEffect(() => {
    if (isOpen) setOpen(isOpen);
    else setOpen(false);
  }, [isOpen]);

  async function callNoneParamFunction() {
    if (data.inputs.length == 0) {
      const _result = await contract.viewFunction(data.name);
      setResult(_result.toString());
    }
  }

  useEffect(() => {
    callNoneParamFunction();
  }, [contract]);

  function onParamsChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) {
    const _params = params;
    _params[index] = event.target.value;
    setParams(_params);
  }

  async function onSubmitClick() {
    const realParam = Object.values(params);
    const _result = await contract.viewFunction(data.name, realParam);
    setResult(_result.toString());
  }

  return (
    <Box>
      <Paper onClick={() => setOpen(!open)} sx={{ cursor: 'pointer' }}>
        <Box mb={1} p="1rem" display="flex" alignItems="center" justifyContent="space-between">
          <Typography>{`${t('name')}: ${data.name}, ${t('signature')}: ${signature}`}</Typography>
          {data.inputs.length > 0 ? <ArrowAnimationIcon isTransform={open} /> : <Typography>{result}</Typography>}
        </Box>
      </Paper>
      {data.inputs.length > 0 && (
        <Collapse in={open}>
          <Box mb={1}>
            {data.inputs.map((input, index) => {
              return (
                <Box key={index} my={1}>
                  <TextField
                    label={`${input.name}(${input.type})`}
                    size="small"
                    fullWidth
                    onChange={(event) => onParamsChange(event, index)}
                  />
                </Box>
              );
            })}
            <Button variant="contained" onClick={() => onSubmitClick()}>
              {t('submit')}
            </Button>
            {result.length > 0 && <Typography>{result}</Typography>}
          </Box>
        </Collapse>
      )}
    </Box>
  );
}
