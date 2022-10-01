import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React from 'react';
import useUser from '@hooks/useUser';
import { useRecoilState } from 'recoil';
import { appThemeMode } from '@atoms/theme';
import ThemeSwitch from './buttons/ThemeSwitch';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import CommentIcon from '@mui/icons-material/Comment';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import SettingsIcon from '@mui/icons-material/Settings';

const PAGE = [
  { title: 'Main', route: '/', icon: <HomeIcon /> },
  { title: 'Mbti', route: '/mbti', icon: <SearchIcon /> },
  { title: 'Board', route: '/Board', icon: <CommentIcon /> },
];

const USER_PAGE = [
  { title: 'Profile', route: '/profile', icon: <SettingsAccessibilityIcon /> },
  { title: 'Setting', route: '/setting', icon: <SettingsIcon /> },
];

const Drawer = () => {
  const { user } = useUser();
  const [mode, setMode] = useRecoilState(appThemeMode);
  const toggleMode = () => {
    setMode((prevState) => (prevState === 'light' ? 'dark' : 'light'));
  };

  return (
    <Box
      role="presentation"
      sx={{
        width: 300,
      }}
    >
      <ListItemButton sx={{ py: 4 }} LinkComponent="a" href="/login">
        <ListItemIcon>
          <Avatar />
        </ListItemIcon>
        <ListItemText>
          {user ? `{user}님 안녕하세요!` : `로그인이 필요합니다.`}
        </ListItemText>
      </ListItemButton>
      <Divider />
      <List>
        {PAGE.map((item) => (
          <ListItemButton key={item.title} LinkComponent="a" href={item.route}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.title}</ListItemText>
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <List>
        {USER_PAGE.map((item) => (
          <ListItemButton key={item.title} LinkComponent="a" href={item.route}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.title}</ListItemText>
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <ListItem sx={{ justifyContent: 'flex-end' }}>
        <ListItemText>ThemeMode: {mode}</ListItemText>
        <ThemeSwitch value={mode !== 'light'} onChange={toggleMode} />
      </ListItem>
    </Box>
  );
};

export default Drawer;
