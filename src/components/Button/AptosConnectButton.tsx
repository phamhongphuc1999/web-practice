import { useWallet, WalletName } from '@aptos-labs/wallet-adapter-react';
import { styleMerge } from '@peter-present/led-caro';
import { ButtonHtmlProps } from 'src/global';
import useLocalTranslate from 'src/hooks/useLocalTranslate';

export default function AptosConnectButton(props: ButtonHtmlProps) {
  const { t } = useLocalTranslate();
  const { connected, connect, disconnect } = useWallet();

  async function onConnect() {
    try {
      connect('Petra' as WalletName<'Petra'>);
    } catch (error) {
      console.error('Failed to connect to wallet:', error);
    }
  }

  async function onDisconnect() {
    try {
      await disconnect();
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
    <button
      {...styleMerge(
        { className: 'border-blue-50 border-[1px] rounded-[4px] px-[8px] py-[7px]' },
        props
      )}
      onClick={onConnectClick}
    >
      <p className="text-[14px] text-blue-50">{connected ? t('disconnect') : t('connect')}</p>
    </button>
  );
}
