import { useAppSelector } from 'src/redux/hook';
import InitWallet from './InitWallet';
import LoginWallet from './LoginWallet';

export default function WalletOverview() {
  const { status } = useAppSelector((state) => state.myWalletSlice);

  return (
    <>
      {['init', 'create_wallet', 'import_wallet'].includes(status) && <InitWallet />}
      {['login'].includes(status) && <LoginWallet />}
    </>
  );
}
