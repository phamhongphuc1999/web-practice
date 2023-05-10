import { ButtonGroup, styled } from '@mui/material';

export const CssForm = styled('form')(() => ({}));

export const CssButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  background: theme.palette.mode == 'dark' ? '#07111C' : '#F2F5FA',
  border: theme.palette.mode == 'dark' ? '1px solid #263343' : '1px solid #DEDEDE',
  borderRadius: '6px',
  overflow: 'hidden',
}));
