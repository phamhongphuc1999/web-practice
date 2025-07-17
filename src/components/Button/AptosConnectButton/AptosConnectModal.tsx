import {
  AptosStandardSupportedWallet,
  useWallet,
  Wallet,
  WalletReadyState,
} from '@aptos-labs/wallet-adapter-react';
import { MSafeWalletName } from '@msafe/aptos-wallet-adapter';
import { Theme, useMediaQuery } from '@mui/material';
import { Modal, ModalProps } from 'antd';
import { useMemo } from 'react';
import { IGNORE_APTOS_WALLET } from 'src/configs/constance';

interface Props extends Omit<ModalProps, 'children'> {
  onClose?: () => void;
}

export default function AptosConnectModal(params: Props) {
  const { connect, wallets = [] } = useWallet();
  const smUp = useMediaQuery<Theme>((theme) => theme.breakpoints.up('sm'));

  const realWallets = useMemo(() => {
    return wallets.filter((wallet) => !IGNORE_APTOS_WALLET.includes(wallet.name));
  }, [wallets]);

  function onCancel() {
    if (params.onClose) params.onClose();
  }

  function onConnect(wallet: Wallet | AptosStandardSupportedWallet<string>) {
    try {
      if (wallet.readyState == WalletReadyState.Installed) connect(wallet.name);
      else {
        if (smUp) {
          if (wallet.name == MSafeWalletName)
            window.open(`https://aptos.m-safe.io/store/0?url=${window.location.origin}`, '_blank');
          else window.open(wallet.url, '_blank');
        }
      }
      onCancel();
    } catch (error) {
      console.error('Failed to connect to wallet:', error);
    }
  }

  return (
    <Modal {...params} title="Aptos connection modal" footer={null} onCancel={() => onCancel()}>
      <div className="mt-[1.5rem]">
        {realWallets.map((wallet) => {
          return (
            <div
              key={wallet.name}
              onClick={() => onConnect(wallet)}
              className="mt-[8px] flex cursor-pointer items-center justify-between"
            >
              <div className="flex items-center gap-x-[1rem]">
                <img src={wallet.icon} className="h-[30px] w-[30px]" />
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
