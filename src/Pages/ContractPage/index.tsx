import { Box, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import CssGroupButton from 'src/components/Button/CssGroupButton';
import { ROUTE } from 'src/configs/constance';
import useQueryUrl from 'src/hooks/useQueryUrl';
import useTranslate from 'src/hooks/useTranslate';
import Bep20Contract from './Bep20Contract';
import CustomContract from './CustomContract';

export default function ContractPage() {
  const { action } = useQueryUrl();
  const history = useHistory();
  const { t } = useTranslate();

  const defaultActive = action == t('custom') ? 1 : action == undefined || action == 'bep20' ? 0 : 2;

  function onClick(event: React.MouseEvent, element: string, index: number) {
    let _action = 'bep20';
    if (index == 1) _action = t('custom');
    history.push(`/contract?action=${_action}`);
  }

  return (
    <>
      <CssBreadcrumbs configs={[{ label: t('contract') }]} props={{ mb: 2 }} />
      <Box display="flex" alignItems="center">
        <CssGroupButton config={['Bep20', t('custom')]} defaultActive={defaultActive} onClick={onClick} />
        <Button variant="outlined" sx={{ ml: 2 }} onClick={() => history.push(ROUTE.MY_CONTRACT)}>
          {t('myContract')}
        </Button>
      </Box>
      {defaultActive == 0 ? <Bep20Contract /> : <CustomContract />}
    </>
  );
}
