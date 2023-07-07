import {
  alpha,
  Box,
  Drawer,
  List,
  ListItem,
  styled,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Layout } from 'src/configs/constance';
import useTranslate from 'src/hooks/useTranslate';

const useStyle = (theme: Theme) => ({
  drawer: {
    marginTop: '55px',
    width: '220px',
    borderRadius: '0px',
    [theme.breakpoints.only('sm')]: {
      width: '80px',
    },
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    marginTop: '0.5rem',
    borderRadius: '6px',
    background: 'transparent',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
    '&:hover': {
      background: theme.palette.mode === 'dark' ? '#FFFFFF0F' : 'rgba(0, 0, 0, 0.06)',
    },
    '&.active': {
      background: theme.palette.primary.main,
      color: '#FFFFFF',
      boxShadow: `0 0 10px 1px ${alpha(theme.palette.primary.main, 0.6)}`,
      '&:hover': {
        background: theme.palette.primary.main,
      },
    },
  },
});

const CssNavLink = styled(NavLink)(() => ({}));

export default function Sidebar() {
  const theme = useTheme();
  const mdUp = useMediaQuery<Theme>((theme) => theme.breakpoints.up('md'));
  const cls = useStyle(theme);
  const { t } = useTranslate();

  return (
    <Drawer open variant="permanent" anchor="left" PaperProps={{ sx: cls.drawer }}>
      <List sx={{ paddingBottom: 0 }}>
        {Layout.map((element, index) => {
          const Icon = element.icon;

          return (
            <ListItem key={index} sx={{ paddingY: 0 }}>
              <CssNavLink to={element.link} sx={cls.navLink}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent={mdUp ? 'flex-start' : 'center'}
                >
                  <Icon fontSize="small" sx={{ marginRight: '0.5rem' }} />
                  {mdUp && <Typography>{t(element.label)}</Typography>}
                </Box>
              </CssNavLink>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}
