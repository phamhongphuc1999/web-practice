import { Box, Button, Typography } from '@mui/material';
import InfoIcon from 'src/components/Icons/InfoIcon';
import useTranslate from 'src/hooks/useTranslate';

interface Props {
  setStep: (step: number) => void;
  mnemonic: string;
}

export default function CreateMnemonic({ setStep, mnemonic }: Props) {
  const { t } = useTranslate();

  return (
    <Box>
      <Typography>{`${t('step')} 2: ${t('saveYourMnemonic')}`}</Typography>
      <Box mt={2} display="flex" justifyContent="space-between" sx={{ border: '1px solid', p: 2, borderRadius: '5px' }}>
        <Typography>{mnemonic}</Typography>
        <InfoIcon info={t('saveMnemonic')} />
      </Box>
      <Button fullWidth variant="contained" type="submit" sx={{ mt: 1 }} onClick={() => setStep(3)}>
        {t('next')}
      </Button>
    </Box>
  );
}
