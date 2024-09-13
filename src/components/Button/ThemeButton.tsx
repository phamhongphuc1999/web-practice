import { IconButton, IconButtonProps } from '@mui/material';
import { switchTheme } from 'src/redux/config-slice';
import { useAppDispatch, useAppSelector } from 'src/redux/store';
import { MoonIcon, SunIcon } from '../Icons';

export default function ThemeButton(props: IconButtonProps) {
  const { themeMode } = useAppSelector((state) => state.config);
  const dispatch = useAppDispatch();

  return (
    <IconButton size="small" onClick={() => dispatch(switchTheme())} {...props}>
      {themeMode === 'dark' ? <SunIcon sx={{ color: '#FFFFFF' }} /> : <MoonIcon />}
    </IconButton>
  );
}
