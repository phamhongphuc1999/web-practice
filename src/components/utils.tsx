import { ButtonGroup, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const CssForm = styled('form')(() => ({}));
export const CssNavLink = styled(NavLink)(() => ({}));

export const CssButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  background: theme.palette.mode == 'dark' ? '#07111C' : '#F2F5FA',
  border: theme.palette.mode == 'dark' ? '1px solid #263343' : '1px solid #DEDEDE',
  borderRadius: '6px',
  overflow: 'hidden',
}));
