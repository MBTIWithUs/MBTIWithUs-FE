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
import React, { useContext, useState } from 'react';
import { useRecoilState } from 'recoil';
import Logo from '@assets/logo.png';
import AccountCirlce from '@mui/icons-material/AccountCircle';
import ThemeSwitch from './buttons/ThemeSwitch';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from './Drawer';
import { UserDispatchContext, UserStateContext } from '@contexts/UserContext';
import { authState } from '@atoms/auth';
import { Link } from 'react-router-dom';

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
  const auth = useContext(UserStateContext);
  const [mode, setMode] = useRecoilState(appThemeMode);
  const [, setToken] = useRecoilState(authState);
  const dispatch = useContext(UserDispatchContext);
  const toggleMode = () => {
    setMode((prevState) => (prevState === 'light' ? 'dark' : 'light'));
  };

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [sideMenu, setSideMenu] = useState<null | HTMLElement>(null);
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                verticalAlign: 'middle',
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/"
                sx={{
                  mr: 3,
                  ml: 3,
                  mt: 2,
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
                  component={Link}
                  to={item.route}
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
              <ThemeSwitch value={mode !== 'light'} onChange={toggleMode} />
              {auth?.user ? (
                <IconButton
                  size="large"
                  edge="end"
                  onClick={handleOpenUserMenu}
                >
                  <Avatar
                    src={auth?.user?.profile_image_url}
                    alt={auth?.user?.nickname}
                  />
                </IconButton>
              ) : (
                <IconButton
                  size="large"
                  edge="end"
                  component={Link}
                  to="/login"
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
                      component={Link}
                      to={item.route}
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
                <MenuItem
                  onClick={() => {
                    // setAuthToken(null);
                    if (dispatch) {
                      dispatch({ type: 'LOGOUT' });
                    }
                    setToken(null);
                    setAnchorElUser(null);
                  }}
                >
                  <Typography
                    sx={{
                      mr: 3,
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                    color="error"
                  >
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
