import { Box } from '@mui/material';
import { useHistory } from 'react-router-dom';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import GroupButton, { GroupButtonItem } from 'src/components/Button/group-button';
import useQueryUrl from 'src/hooks/useQueryUrl';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import Bep20Contract from './Bep20Contract';
import CustomContract from './CustomContract';

export default function ContractPage() {
  const { action } = useQueryUrl();
  const history = useHistory();
  const { t } = useLocalTranslate();

  const defaultActive =
    action == t('custom') ? 1 : action == undefined || action == 'bep20' ? 0 : 2;

  function onClick(item: GroupButtonItem) {
    let _action = 'bep20';
    if (item.id == 'custom') _action = t('custom');
    history.push(`/contract?action=${_action}`);
  }

  return (
    <>
      <CssBreadcrumbs configs={[{ label: t('contract') }]} mb={2} />
      <Box display="flex" alignItems="center">
        <GroupButton
          items={[
            { id: 'bep20', content: 'Bep20' },
            { id: 'custom', content: t('custom') },
          ]}
          selectedId="bep20"
          events={{ onClick }}
        />
      </Box>
      {defaultActive == 0 ? <Bep20Contract /> : <CustomContract />}
    </>
  );
}
