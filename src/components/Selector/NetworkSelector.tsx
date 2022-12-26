import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import CssSelector, { CssSelectItem } from 'src/components/Selector/CssSelector';
import { MyWalletChainType } from 'src/configs/wallet-network-config';
import useTranslate from 'src/hooks/useTranslate';
import { useAppSelector } from 'src/redux/hook';
import { updateCurrentNetwork } from 'src/redux/my-wallet/myWalletStateSlice';
import { useActionController } from 'src/WalletObject/background';

interface ProviderSelectItem extends CssSelectItem {
  type: string;
  rpcUrl: string;
}

export default function NetworkSelector() {
  const { t } = useTranslate();
  const dispatch = useDispatch();
  const { currentNetwork } = useAppSelector((state) => state.myWalletStateSlice);
  const actionController = useActionController();

  const networkConfig = useMemo(() => {
    let items = {} as MyWalletChainType;
    if (actionController) items = actionController.networkController.networkConfig;
    return Object.entries(items).map((item, _) => {
      const chainId = item[0];
      const name = item[1].name;
      return {
        id: chainId,
        label: name,
        type: item[1].provider.type,
        rpcUrl: item[1].provider.rpcUrl,
      } as ProviderSelectItem;
    });
  }, [actionController]);

  const selectedItem = useMemo(() => {
    let defaultItem = { id: '', label: '', type: '', rpcUrl: '' };
    if (currentNetwork) {
      defaultItem = {
        id: currentNetwork.chainId.toString(),
        label: currentNetwork.isMainnet
          ? t('mainnet', { network: currentNetwork.translate })
          : t('testnet', { network: currentNetwork.translate }),
        type: currentNetwork.provider.type,
        rpcUrl: currentNetwork.provider.rpcUrl,
      };
    }
    return defaultItem;
  }, [currentNetwork]);

  function onChooseItem(e: React.MouseEvent<HTMLDivElement, MouseEvent>, item: ProviderSelectItem) {
    if (actionController?.networkController) {
      actionController.networkController.switchNetwork(item.type, item.rpcUrl, Number(item.id));
      const _network = actionController.networkController.currentNetwork;
      dispatch(updateCurrentNetwork(_network));
    }
  }

  return (
    <CssSelector<ProviderSelectItem>
      width={210}
      props={{ sx: { ml: 1, mr: 1 } }}
      items={networkConfig}
      defaultSelectedItem={selectedItem}
      events={{ onChooseItem }}
    />
  );
}
