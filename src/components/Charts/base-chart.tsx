import { CircularProgress } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import { useAppSelector } from 'src/redux/hook';

interface Props {
  children: ReactNode;
}

export default function BaseChart({ children }: Props) {
  const [loading, setLoading] = useState(false);
  const { theme } = useAppSelector((state) => state.userConfigSlice);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [theme]);

  return loading ? <CircularProgress /> : <>{children}</>;
}
