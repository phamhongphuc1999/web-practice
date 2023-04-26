import { Box, Container, alpha } from '@mui/material';
import ThemeButton from 'src/components/Button/ThemeButton';

export default function Header() {
  return (
    <Box
      position="fixed"
      sx={(theme) => ({
        background: theme.palette.background.paper,
        zIndex: 1205,
        width: '100%',
        height: 55,
        borderBottom: `1px solid ${alpha(theme.palette.mode === 'dark' ? '#fff' : '#000', 0.12)}`,
      })}
    >
      <Container sx={{ height: '100%' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" height="100%">
          <ThemeButton />
        </Box>
      </Container>
    </Box>
  );
}
