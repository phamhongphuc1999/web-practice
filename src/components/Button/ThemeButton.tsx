import { IconButton, IconButtonProps } from '@mui/material';
import { THEME_MODE } from 'src/configs/constance';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { toggleMode } from 'src/redux/userConfigSlice';
import { MoonIcon, SunIcon } from '../Icons';

interface Props {
  props?: IconButtonProps;
}

export default function ThemeButton({ props }: Props) {
  const mode = useAppSelector<THEME_MODE>((state) => state.userConfigSlice.theme.mode);
  const dispatch = useAppDispatch();

  return (
    <IconButton size="small" onClick={() => dispatch(toggleMode())} {...props}>
      {mode === 'dark' ? <SunIcon sx={{ color: '#FFFFFF' }} /> : <MoonIcon />}
    </IconButton>
  );
}
