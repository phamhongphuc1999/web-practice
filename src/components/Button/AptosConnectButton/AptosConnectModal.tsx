import { useWallet, WalletName, WalletReadyState } from '@aptos-labs/wallet-adapter-react';
import { Modal, ModalProps } from 'antd';

interface Props extends Omit<ModalProps, 'children'> {
  onClose?: () => void;
}

export default function AptosConnectModal(params: Props) {
  const { connect, wallets = [] } = useWallet();

  function onCancel() {
    if (params.onClose) params.onClose();
  }

  function onConnect(walletName: WalletName) {
    try {
      connect(walletName);
      onCancel();
    } catch (error) {
      console.error('Failed to connect to wallet:', error);
    }
  }

  return (
    <Modal {...params} title="Aptos connection modal" footer={null} onCancel={() => onCancel()}>
      <div className="mt-[1.5rem]">
        {wallets.map((wallet) => {
          return (
            <div
              key={wallet.name}
              onClick={() => onConnect(wallet.name)}
              className="mt-[8px] flex cursor-pointer items-center justify-between"
            >
              <div className="flex items-center gap-x-[1rem]">
                <img src={wallet.icon} className="h-[30px] w-[30px]" />
                <p className="font-semibold text-black-50">{wallet.name}</p>
              </div>
              <p className="font-semibold text-black-50">
                {wallet.readyState == WalletReadyState.Installed ? 'Installed' : ''}
              </p>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}
