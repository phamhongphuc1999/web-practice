import { useHistory } from 'react-router-dom';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import CssGroupButton from 'src/components/Button/CssGroupButton';
import useQueryUrl from 'src/hooks/useQueryUrl';
import Bep20Contract from './Bep20Contract';

export default function ContractPage() {
  const { action } = useQueryUrl();
  const history = useHistory();

  const defaultActive = action == 'custom' ? 1 : action == undefined || action == 'bep20' ? 0 : 2;

  function onClick(event: React.MouseEvent, element: string, index: number) {
    let _action = 'bep20';
    if (index == 1) _action = 'custom';
    history.push(`/contract?action=${_action}`);
  }

  return (
    <>
      <CssBreadcrumbs configs={[{ label: 'contract' }]} props={{ mb: 2 }} />
      <CssGroupButton config={['Bep20', 'Custom']} defaultActive={defaultActive} onClick={onClick} />
      {defaultActive == 0 ? <Bep20Contract /> : <></>}
    </>
  );
}
