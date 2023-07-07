import { Box, Button, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import Contract from 'src/blockchain-interaction/contract-handler/contract';
import Interface from 'src/blockchain-interaction/contract-handler/interface';
import { isAddress } from 'src/blockchain-interaction/utils';
import useTranslate from 'src/hooks/useTranslate';
import ReadFunction from './ReadFunction';

interface Props {
  abi: string;
  contractAddress: string;
  provider: string;
}

export default function USeContract({ abi, contractAddress, provider }: Props) {
  const { t } = useTranslate();
  const [isOpen, setIsOpen] = useState(false);

  const inter = useMemo(() => {
    if (abi.length > 0) {
      try {
        return new Interface(abi);
      } catch {
        return undefined;
      }
    } else return undefined;
  }, [abi]);

  const contract = useMemo(() => {
    if (abi.length > 0 && isAddress(contractAddress)) {
      try {
        return new Contract(contractAddress, abi, provider);
      } catch {
        return undefined;
      }
    } else return undefined;
  }, [abi, contractAddress]);

  return (
    <Box>
      {inter && contract && (
        <Box mt={1}>
          <Typography>{t('viewFunction')}</Typography>
          <Button
            variant={isOpen ? 'outlined' : 'contained'}
            onClick={() => setIsOpen(!isOpen)}
            sx={{ my: 1 }}
          >
            {isOpen ? t('reset') : t('expandAll')}
          </Button>
          {inter
            .getFunctions('view')
            .slice(1, 2)
            .map((item, _) => {
              const signature = inter.getSignature(item.name);

              if (signature)
                return (
                  <ReadFunction
                    key={signature}
                    contract={contract}
                    signature={signature}
                    data={item}
                    isOpen={isOpen}
                  />
                );
            })}
        </Box>
      )}
    </Box>
  );
}
