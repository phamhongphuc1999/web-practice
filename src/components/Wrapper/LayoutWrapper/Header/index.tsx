import { alpha, Box, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { THEME_MODE } from 'src/configs/constance';
import { useAppSelector } from 'src/redux/hook';
import { toggleMode } from 'src/redux/userConfigSlice';
import { MoonIcon, SunIcon } from '../../../Icons';

export default function Header() {
  const mode = useAppSelector<THEME_MODE>((state) => state.userConfigSlice.theme.mode);
  const dispatch = useDispatch();

  return (
    <Box
      position="fixed"
      sx={(theme) => ({
        background: theme.palette.background.paper,
        zIndex: 1205,
        width: '100%',
        height: 55,
        borderBottom: `1px solid ${alpha(theme.palette.mode === 'dark' ? '#fff' : '#000', 0.12)}`,
        padding: theme.spacing(0, 2),
      })}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" height="100%">
        <IconButton size="small" onClick={() => dispatch(toggleMode())}>
          {mode === 'dark' ? <SunIcon sx={{ color: '#FFFFFF' }} /> : <MoonIcon />}
        </IconButton>
      </Box>
    </Box>
  );
}
