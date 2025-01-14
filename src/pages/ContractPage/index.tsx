import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import GroupButton from 'src/components/Button/group-button';
import ReactSeo from 'src/components/ReactSeo';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import useQueryUrl from 'src/hooks/useQueryUrl';
import Bep20Contract from './Bep20Contract';
import CustomContract from './CustomContract';

export default function ContractPage() {
  const { action } = useQueryUrl();
  const navigate = useNavigate();
  const { t } = useLocalTranslate();

  const defaultActive =
    action == t('custom') ? 1 : action == undefined || action == 'bep20' ? 0 : 2;

  function onClick(id: string) {
    let _action = 'bep20';
    if (id == 'custom') _action = t('custom');
    navigate(`/contract?action=${_action}`);
  }

  return (
    <>
      <ReactSeo title={t('contract')} />
      <CssBreadcrumbs configs={[{ label: t('contract') }]} mb={2} />
      <Box display="flex" alignItems="center">
        <GroupButton
          options={[
            { id: 'bep20', content: 'Bep20' },
            { id: 'custom', content: t('custom') },
          ]}
          selectedId="bep20"
          events={{ onOptionChange: onClick }}
        />
      </Box>
      {defaultActive == 0 ? <Bep20Contract /> : <CustomContract />}
    </>
  );
}
