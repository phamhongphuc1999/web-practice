import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import CopyIcon from 'src/components/Icons/CopyIcon';
import ExploreIcon from 'src/components/Icons/ExploreIcon';
import ReactSeo from 'src/components/ReactSeo';
import { ROUTE } from 'src/configs/layout';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import { formatAddress } from 'src/services';
import { useAptosWalletContext } from 'src/WalletConnection/aptos-connection/AptosWalletContext';
import Information from './Information';
import MoveContract from './move-contract';

export default function SDK() {
  const { t } = useLocalTranslate();
  const { accountAddress } = useAptosWalletContext();

  return (
    <div>
      <ReactSeo title={t('title.aptosSdk')} />
      <CssBreadcrumbs
        configs={[{ label: t('aptos'), link: ROUTE.APTOS }, { label: 'Aptos SDK' }]}
        mb={2}
      />
      <div className="flex items-center gap-4">
        <p>{formatAddress(accountAddress, 6)}</p>
        <CopyIcon copyText={accountAddress} />
        <ExploreIcon hash={accountAddress} config={{ chainId: '2_testnet' }} />
      </div>
      <MoveContract />
      <Information />
    </div>
  );
}
