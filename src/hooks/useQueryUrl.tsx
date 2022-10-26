import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export default function useQueryUrl() {
  const location = useLocation();

  return useMemo(() => {
    const search = location.search.slice(1);
    const _arr = search.split('&');
    const result = {} as { [key: string]: string };
    for (const item of _arr) {
      const [key, value] = item.split('=');
      result[key] = value;
    }
    return result;
  }, [location.search]);
}
