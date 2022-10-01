import { appThemeMode } from '@atoms/theme';
import {
  AppBar,
  Box,
  Button,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import { useRecoilState } from 'recoil';

const Header = () => {
  const [mode, setMode] = useRecoilState(appThemeMode);
  // const user = useUser();

  const toggleMode = () => {
    setMode((prevState) => (prevState === 'light' ? 'dark' : 'light'));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MAIN
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/test"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TEST
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/login"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGIN
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/mbti"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MBTI
          </Typography>
          <Switch checked={mode === 'dark'} onChange={toggleMode} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
