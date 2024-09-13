import { useWallet, WalletName, WalletReadyState } from '@aptos-labs/wallet-adapter-react';
import { Modal, ModalProps } from 'antd';

export default function AptosConnectModal(params: Omit<ModalProps, 'children'>) {
  const { connect, wallets = [] } = useWallet();

  function onConnect(walletName: WalletName) {
    try {
      connect(walletName);
    } catch (error) {
      console.error('Failed to connect to wallet:', error);
    }
  }

  return (
    <Modal {...params} title="Aptos connection modal" footer={null}>
      <div className="mt-[1.5rem]">
        {wallets.map((wallet) => {
          return (
            <div
              key={wallet.name}
              onClick={() => onConnect(wallet.name)}
              className="flex items-center justify-between mt-[8px] cursor-pointer"
            >
              <div className="flex items-center gap-x-[1rem]">
                <img src={wallet.icon} className="w-[30px] h-[30px]" />
                <p className="text-black-50 font-semibold">{wallet.name}</p>
              </div>
              <p className="text-black-50 font-semibold">
                {wallet.readyState == WalletReadyState.Installed ? 'Installed' : ''}
              </p>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}
