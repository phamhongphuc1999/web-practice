import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { styleMerge } from '@peter-present/led-caro';
import { useState } from 'react';
import { ButtonHtmlProps } from 'src/global';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import { formatAddress } from 'src/services';
import { useAptosWalletContext } from 'src/WalletConnection/aptos-connection/AptosWalletContext';
import AptosConnectModal from './AptosConnectModal';

export default function AptosConnectButton(props: ButtonHtmlProps) {
  const { t } = useLocalTranslate();
  const [open, setOpen] = useState(false);
  const { connected, disconnect } = useWallet();
  const { accountAddress } = useAptosWalletContext();

  function onConnect() {
    setOpen(true);
  }

  function onDisconnect() {
    try {
      disconnect();
      console.warn('Disconnected from wallet');
    } catch (error) {
      console.error('Failed to disconnect from wallet:', error);
    }
  }

  function onConnectClick() {
    if (connected) onDisconnect();
    else onConnect();
  }

  return (
    <>
      <button
        {...styleMerge(
          { className: 'rounded-[4px] border-[1px] border-blue-50 px-[8px] py-[7px]' },
          props
        )}
        onClick={onConnectClick}
      >
        <p className="text-[14px] text-blue-50">
          {connected ? formatAddress(accountAddress, 6) : t('connect')}
        </p>
      </button>
      <AptosConnectModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
