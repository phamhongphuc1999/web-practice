import { IconButton, IconButtonProps } from '@mui/material';
import { ThemeMode } from 'src/global';
import { useAppDispatch, useAppSelector } from 'src/redux/store';
import { toggleMode } from 'src/redux/user-slice';
import { MoonIcon, SunIcon } from '../Icons';

interface Props {
  props?: IconButtonProps;
}

export default function ThemeButton({ props }: Props) {
  const mode = useAppSelector<ThemeMode>((state) => state.user.theme.mode);
  const dispatch = useAppDispatch();

  return (
    <IconButton size="small" onClick={() => dispatch(toggleMode())} {...props}>
      {mode === 'dark' ? <SunIcon sx={{ color: '#FFFFFF' }} /> : <MoonIcon />}
    </IconButton>
  );
}
