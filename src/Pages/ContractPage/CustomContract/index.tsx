import { Box, TextField } from '@mui/material';
import { ethers } from 'ethers';
import { useMemo, useState } from 'react';
import GroupButton from 'src/components/Button/group-button';
import { EtherFragment } from 'src/global';
import useTranslate from 'src/hooks/useTranslate';
import ReadFunction from './ReadFunction';
import WriteFunction from './WriteFunction';

export default function CustomContract() {
  const { t } = useTranslate();
  const [active, setActive] = useState('viewFunction');
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
        placeholder={t('enterYourAbi')}
        multiline
        rows={6}
        maxRows={8}
        onChange={(e) => setAbi(e.target.value)}
      />
      <GroupButton
        items={[
          { id: 'viewFunction', content: t('viewFunction') },
          { id: 'sendFunction', content: t('sendFunction') },
        ]}
        selectedId="viewFunction"
        events={{ onClick: (item) => setActive(item.id) }}
      />
      {active == 'viewFunction' ? (
        <ReadFunction fragment={fragments[0]} />
      ) : (
        <WriteFunction fragment={fragments[1]} />
      )}
    </Box>
  );
}
