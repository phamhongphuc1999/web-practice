import { Typography } from '@mui/material';
import useTranslate from 'src/hooks/useTranslate';

export default function LoginWallet() {
  const { t } = useTranslate();

  return (
    <>
      <Typography>{t('loginWallet')}</Typography>
    </>
  );
}
