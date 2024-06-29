import { useMemo } from 'react';

export type LAYOUT = 'normal' | 'wallet' | 'docs';

export default function useLayout() {
  const isDocs = location.pathname.includes('/docs');

  return useMemo<LAYOUT>(() => {
    if (isDocs) return 'docs';
    else return 'normal';
  }, [isDocs]);
}
