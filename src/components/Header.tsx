import { appThemeMode } from '@atoms/theme';
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Popover,
  Stack,
  SwipeableDrawer,
  Toolbar,
  Typography,
  useTheme,
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
import path from '@routes/path';

const PAGE = [path.mbti];

const USER_PAGE = [path.profile];

const MBTI_TYPES = [
  ['ISTJ', 'ISTP', 'ISFJ', 'ISFP'],
  ['INTJ', 'INTP', 'INFJ', 'INFP'],
  ['ESTJ', 'ESTP', 'ESFJ', 'ESFP'],
  ['ENTJ', 'ENTP', 'ENFJ', 'ENFP'],
];

const Header = () => {
  const auth = useContext(UserStateContext);
  const [mode, setMode] = useRecoilState(appThemeMode);
  const [, setToken] = useRecoilState(authState);
  const dispatch = useContext(UserDispatchContext);
  const [menuOpen, setMenuOpen] = useState<HTMLDivElement | null>(null);
  const theme = useTheme();

  const handlePopoverClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setMenuOpen(e.currentTarget);
  };
  const handlePopoverClose = () => {
    setMenuOpen(null);
  };

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

  const popoverOpen = Boolean(menuOpen);
  const popoverId = popoverOpen ? 'simple-popover' : undefined;

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
              <Box
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
                <Box>
                  <Typography
                    variant="h6"
                    noWrap
                    // component="button"
                    // onMouseEnter={() => setMenuOpen(true)}
                    // onMouseLeave={() => setMenuOpen(false)}
                    // component={Link}
                    // to={path.board.route}
                    sx={{
                      cursor: 'pointer',
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                    onClick={handlePopoverClick}
                  >
                    {path.board.title}
                  </Typography>
                  <Box sx={{ position: 'absolute' }}>
                    <Popover
                      id={popoverId}
                      open={popoverOpen}
                      anchorEl={menuOpen}
                      onClose={handlePopoverClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      sx={{ boxShadow: 'none' }}
                    >
                      <Stack
                        direction="row"
                        sx={{ backgroundColor: theme.palette.primary.main }}
                        // sx={{ backgroundColor: 'red', zIndex: 999 }}
                      >
                        {menuOpen && (
                          <>
                            <List>
                              <ListItem
                                component={Link}
                                to={`${path.board.route}`}
                                sx={{
                                  cursor: 'pointer',
                                  textDecoration: 'none',
                                  color: theme.palette.getContrastText(
                                    theme.palette.primary.main,
                                  ),
                                }}
                              >
                                ALL
                              </ListItem>
                            </List>
                            {MBTI_TYPES.map((item) => (
                              <List key={item[0]}>
                                {item.map((item1) => (
                                  <ListItem
                                    key={item1}
                                    component={Link}
                                    to={`${path.board.route}?mbti=${item1}`}
                                    sx={{
                                      cursor: 'pointer',
                                      textDecoration: 'none',
                                      color: theme.palette.getContrastText(
                                        theme.palette.primary.main,
                                      ),
                                    }}
                                  >
                                    {item1}
                                  </ListItem>
                                ))}
                              </List>
                            ))}
                          </>
                        )}
                      </Stack>
                    </Popover>
                  </Box>
                </Box>
              </Box>
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
              <ThemeSwitch checked={mode !== 'light'} onChange={toggleMode} />
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
