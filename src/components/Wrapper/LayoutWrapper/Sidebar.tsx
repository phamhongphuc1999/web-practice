import {
  alpha,
  Box,
  Drawer,
  List,
  ListItem,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { CssNavLink } from 'src/components/utils';
import { AppReferenceConfig } from 'src/configs/layout';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import { useAppSelector } from 'src/redux/store';

const useStyle = (theme: Theme) => ({
  drawer: {
    marginTop: '55px',
    width: '220px',
    borderRadius: '0px',
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

export default function Sidebar() {
  const theme = useTheme();
  const mdUp = useMediaQuery<Theme>((theme) => theme.breakpoints.up('md'));
  const cls = useStyle(theme);
  const { t } = useLocalTranslate();
  const { referenceId } = useAppSelector((state) => state.config);
  const Layout = referenceId ? AppReferenceConfig[referenceId].items : [];

  return (
    <Drawer open variant="permanent" anchor="left" PaperProps={{ sx: cls.drawer }}>
      <List sx={{ paddingBottom: 0 }}>
        {(Layout ?? []).map((element, index) => {
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
                  {mdUp && <Typography>{t(element.title)}</Typography>}
                </Box>
              </CssNavLink>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}
