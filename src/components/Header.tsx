import { appThemeMode } from '@atoms/theme';
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import Logo from '@assets/logo.png';
import useUser from '@hooks/useUser';
import AccountCirlce from '@mui/icons-material/AccountCircle';
import ThemeSwitch from './buttons/ThemeSwitch';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from './Drawer';

const PAGE = [
  { title: 'Test', route: '/test' },
  { title: 'Mbti', route: '/mbti' },
  { title: 'Board', route: '/Board' },
];

const USER_PAGE = [
  { title: 'Profile', route: '/profile' },
  { title: 'Setting', route: '/setting' },
];

const Header = () => {
  const { user } = useUser();
  const [mode, setMode] = useRecoilState(appThemeMode);
  const toggleMode = () => {
    setMode((prevState) => (prevState === 'light' ? 'dark' : 'light'));
  };

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [sideMenu, setSideMenu] = useState<null | HTMLElement>(null);
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // const user = useUser();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenSideMenu = (event: React.MouseEvent<HTMLElement>) => {
    setSideMenu(event.currentTarget);
  };

  const handleCloseSideMenu = () => {
    setSideMenu(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ py: 0.5, boxShadow: 0 }}>
        <Container>
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex' }}>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 3,
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <img src={Logo} alt="mbti logo" />
              </Typography>
              {PAGE.map((item) => (
                <Typography
                  key={item.title}
                  variant="h6"
                  noWrap
                  component="a"
                  href={item.route}
                  sx={{
                    mr: 3,
                    color: 'inherit',
                    display: {
                      xs: 'none',
                      sm: 'none',
                      md: 'flex',
                    },
                    textDecoration: 'none',
                  }}
                >
                  {item.title}
                </Typography>
              ))}
            </Box>
            <Box
              sx={{
                display: {
                  xs: 'flex',
                  sm: 'flex',
                  md: 'none',
                },
              }}
            >
              <IconButton onClick={handleOpenSideMenu}>
                <MenuIcon sx={{ color: '#ffffff' }} />
              </IconButton>
              <SwipeableDrawer
                anchor="right"
                open={Boolean(sideMenu)}
                onClose={handleCloseSideMenu}
                onOpen={handleOpenSideMenu}
              >
                <Drawer />
              </SwipeableDrawer>
            </Box>
            <Box
              sx={{
                alignItems: 'center',
                display: {
                  xs: 'none',
                  sm: 'none',
                  md: 'flex',
                },
              }}
            >
              <ThemeSwitch
                defaultChecked={mode !== 'light'}
                onChange={toggleMode}
              />
              {user ? (
                <IconButton
                  size="large"
                  edge="end"
                  onClick={handleOpenUserMenu}
                >
                  <Avatar />
                </IconButton>
              ) : (
                <IconButton
                  size="large"
                  edge="end"
                  LinkComponent="a"
                  href="/login"
                  // onClick={handleOpenUserMenu}
                >
                  <AccountCirlce sx={{ width: 30, height: 30 }} />
                </IconButton>
              )}
              <Menu
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                {USER_PAGE.map((item) => (
                  <MenuItem key={item.title} onClick={handleCloseUserMenu}>
                    <Typography
                      component="a"
                      href={item.route}
                      sx={{
                        mr: 3,
                        fontWeight: 600,
                        color: 'inherit',
                        textDecoration: 'none',
                      }}
                    >
                      {item.title}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
