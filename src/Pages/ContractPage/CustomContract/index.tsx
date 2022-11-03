import { Box, TextField } from '@mui/material';
import { ethers } from 'ethers';
import { useMemo, useState } from 'react';
import CssGroupButton from 'src/components/Button/CssGroupButton';
import { EtherFragment } from 'src/global';
import ReadFunction from './ReadFunction';
import WriteFunction from './WriteFunction';

export default function CustomContract() {
  const [active, setActive] = useState(0);
  const [abi, setAbi] = useState('');

  const fragments = useMemo(() => {
    if (abi.length > 0) {
      const _interface = new ethers.utils.Interface(abi);
      const readList = [];
      const writeList = [];
      const _data = _interface.fragments;
      for (const fragment of _data) {
        if ((fragment as EtherFragment).stateMutability == 'view') readList.push(fragment);
        else writeList.push(fragment);
      }
      return [readList, writeList];
    }
    return [undefined, undefined];
  }, [abi]);

  return (
    <Box mt={2}>
      <TextField
        fullWidth
        placeholder="enter your abi"
        multiline
        rows={6}
        maxRows={8}
        onChange={(e) => setAbi(e.target.value)}
      />
      <CssGroupButton
        config={['Read Function', 'Write Function']}
        onClick={(e, element, active) => setActive(active)}
      />
      {active == 0 ? <ReadFunction fragment={fragments[0]} /> : <WriteFunction fragment={fragments[1]} />}
    </Box>
  );
}
