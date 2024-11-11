import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import CopyIcon from 'src/components/Icons/CopyIcon';
import TitleTypography from 'src/components/typography/TitleTypography';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import { formatAddress } from 'src/services';
import { generatePoseidonHash } from 'src/services/circom-utils';

export default function HashFunction() {
  const { t } = useLocalTranslate();
  const [message, setMessage] = useState('');
  const [poseidonHash, setPoseidonHash] = useState('');

  async function generate() {
    if (message.length > 0) {
      const _poseidonHash = await generatePoseidonHash(message);
      setPoseidonHash(_poseidonHash);
    }
  }

  return (
    <Box sx={{ width: { md: '60%', sm: '90%', xs: '100%' } }}>
      <TitleTypography title={t('message')}>
        <TextField
          fullWidth
          size="small"
          placeholder="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  sx={{ width: '115px' }}
                  onClick={generate}
                >
                  {t('createHash')}
                </Button>
              ),
            },
          }}
        />
      </TitleTypography>
      {poseidonHash.length > 0 && (
        <TitleTypography title="Poseidon" className="mt-5">
          <TextField
            fullWidth
            size="small"
            placeholder="Poseidon hash"
            slotProps={{
              input: { readOnly: true, endAdornment: <CopyIcon copyText={poseidonHash} /> },
            }}
            value={formatAddress(poseidonHash, 6)}
          />
        </TitleTypography>
      )}
    </Box>
  );
}
