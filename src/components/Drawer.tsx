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
import React, { useContext } from 'react';
import { useRecoilState } from 'recoil';
import { appThemeMode } from '@atoms/theme';
import ThemeSwitch from './buttons/ThemeSwitch';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import CommentIcon from '@mui/icons-material/Comment';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import SettingsIcon from '@mui/icons-material/Settings';
import { UserStateContext } from '@contexts/UserContext';
import { Link } from 'react-router-dom';

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
  // const { auth.user } = useauth.user();
  const auth = useContext(UserStateContext);
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
      <ListItemButton
        sx={{ py: 4 }}
        component={Link}
        to={auth?.user ? '/profile' : '/login'}
      >
        <ListItemIcon>
          <Avatar src={auth?.user?.profile_image_url} />
        </ListItemIcon>
        <ListItemText>
          {auth?.user
            ? `${auth?.user?.nickname}님 안녕하세요!`
            : `로그인이 필요합니다.`}
        </ListItemText>
      </ListItemButton>
      <Divider />
      <List>
        {PAGE.map((item) => (
          <ListItemButton key={item.title} component={Link} to={item.route}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.title}</ListItemText>
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <List>
        {USER_PAGE.map((item) => (
          <ListItemButton key={item.title} component={Link} to={item.route}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.title}</ListItemText>
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <ListItem sx={{ justifyContent: 'flex-end' }}>
        <ListItemText>ThemeMode: {mode}</ListItemText>
        <ThemeSwitch checked={mode !== 'light'} onChange={toggleMode} />
      </ListItem>
    </Box>
  );
};

export default Drawer;
