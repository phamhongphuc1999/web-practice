import { useMemo } from 'react';

export type LAYOUT = 'normal' | 'wallet' | 'docs';

export default function useLayout() {
  const isWallet = location.pathname.includes('/my-wallet');
  const isDocs = location.pathname.includes('/docs');

  return useMemo<LAYOUT>(() => {
    if (isWallet) return 'wallet';
    else if (isDocs) return 'docs';
    else return 'normal';
  }, [isDocs, isWallet]);
}
