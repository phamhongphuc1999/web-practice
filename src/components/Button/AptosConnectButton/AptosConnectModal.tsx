import { useWallet, WalletReadyState } from '@aptos-labs/wallet-adapter-react';
import { Modal, ModalProps } from 'antd';

export default function AptosConnectModal(params: Omit<ModalProps, 'children'>) {
  const { wallets = [] } = useWallet();

  return (
    <Modal {...params} title="Aptos connection modal" footer={null}>
      {wallets.map((wallet) => {
        return (
          <div key={wallet.name} className="flex items-center justify-between">
            <div className="flex items-center">
              <img src={wallet.icon} className="w-[40px] h-[40px]" />
              <p>{wallet.name}</p>
            </div>
            <p>{wallet.readyState == WalletReadyState.Installed ? 'Installed' : ''}</p>
          </div>
        );
      })}
    </Modal>
  );
}
