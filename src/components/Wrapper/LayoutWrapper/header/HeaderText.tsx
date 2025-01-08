import { Box, BoxProps, Typography, useTheme } from '@mui/material';
import useLocalTranslate from 'src/hooks/useLocalTranslate';

interface Props extends BoxProps {
  title: string;
}

export default function HeaderText({ title, ...props }: Props) {
  const { t } = useLocalTranslate();
  const theme = useTheme();

  return (
    <Box
      {...props}
      sx={{
        padding: '0.5rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '9999px',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: theme.palette.mode == 'light' ? '#F6F7FB' : 'rgba(63, 63, 63, 0.56)',
          '.header-title': {
            color: theme.palette.mode == 'light' ? '#2069FA' : '#ffffff',
          },
        },
      }}
    >
      <Typography className="header-title text-[14px] font-[500] leading-[18px]">
        {t(title)}
      </Typography>
    </Box>
  );
}
