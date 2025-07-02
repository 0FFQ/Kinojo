import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { iconComponents, MOVIE_LISTS, TOP_LISTS } from "../../../../constants";
import Search from "../Search/Search"

const Icon = ({ iconName }) => {
  const IconComponent = iconComponents[iconName];
  return <IconComponent />;
};

export default function Navbar() {
  const [isOpen, setOpen] = useState(false);

  const trigger = useScrollTrigger({
    target: window,
  });

  const handleDrawerToggle = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar>
        <Container maxWidth="lg" disableGutters>
          <Toolbar>
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Drawer open={isOpen} onClose={handleDrawerToggle}>
              <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
                <List>
                  {TOP_LISTS.map((item) => (
                    <Link
                      key={item.title}
                      component={RouterLink}
                      to={item.url}
                      sx={{ textDecoration: "none", color: "inherit" }}
                    >
                      <ListItem disablePadding>
                        <ListItemButton sx={{ textAlign: "center" }}>
                          <ListItemIcon>
                            <Icon iconName={item.icon} />
                          </ListItemIcon>
                          <ListItemText primary={item.title} />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  ))}
                </List>
                <Divider />
                <List>
                  {MOVIE_LISTS.map((item) => (
                    <Link
                      key={item.title}
                      component={RouterLink}
                      to={item.url}
                      sx={{ textDecoration: "none", color: "inherit" }}
                    >
                      <ListItem disablePadding>
                        <ListItemButton sx={{ textAlign: "center" }}>
                          <ListItemIcon>
                            <Icon iconName={item.icon} />
                          </ListItemIcon>
                          <ListItemText primary={item.title} />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </Box>
            </Drawer>
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              sx={{ px: 2 }}
            >
              <Typography
                sx={{ color: "white", textDecoration: "none" }}
                component={RouterLink}
                variant="h5"
                to="/"
              >
                Kinojo
              </Typography>
              <Box sx={{ width: { xs: "60%", sm: 300 }, minWidth: 200, maxWidth: 400 }}>
                <Search />
              </Box>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
}
