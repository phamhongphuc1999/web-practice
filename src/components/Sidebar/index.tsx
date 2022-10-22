import { Box, Drawer, List, ListItem, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Layout } from 'src/configs/constance';

const useStyle = (theme: Theme) => ({
  drawer: {
    marginTop: '55px',
    width: '220px',
    [theme.breakpoints.only('sm')]: {
      width: '80px',
    },
  },
});

export default function Sidebar() {
  const theme = useTheme();
  const mdUp = useMediaQuery<Theme>((theme) => theme.breakpoints.up('md'));
  const cls = useStyle(theme);

  return (
    <Drawer open variant="permanent" anchor="left" PaperProps={{ sx: cls.drawer }}>
      <List>
        {Layout.map((element, index) => {
          const Icon = element.icon;

          return (
            <ListItem key={index}>
              <NavLink to={element.link}>
                <Box display="flex" alignItems="center" justifyContent={mdUp ? 'flex-start' : 'center'}>
                  <Icon />
                  {mdUp && <Typography>{element.label}</Typography>}
                </Box>
              </NavLink>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}
