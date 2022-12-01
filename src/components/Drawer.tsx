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
import LogoutIcon from '@mui/icons-material/Logout';
import { UserDispatchContext, UserStateContext } from '@contexts/UserContext';
import { Link } from 'react-router-dom';
import path from '@routes/path';
import { authState } from '@atoms/auth';

const PAGE = [
  { ...path.home, icon: <HomeIcon /> },
  { ...path.mbti, icon: <SearchIcon /> },
  { ...path.board, icon: <CommentIcon /> },
];

const USER_PAGE = [
  { ...path.profile, icon: <SettingsAccessibilityIcon /> },
  // { ...path.setting, icon: <SettingsIcon /> },
];

const Drawer = () => {
  // const { auth.user } = useauth.user();
  const auth = useContext(UserStateContext);
  const [, setToken] = useRecoilState(authState);
  const [mode, setMode] = useRecoilState(appThemeMode);
  const dispatch = useContext(UserDispatchContext);
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
        {auth?.user && (
          <ListItemButton
            onClick={() => {
              if (dispatch) {
                if (dispatch) {
                  dispatch({ type: 'LOGOUT' });
                }
                setToken(null);
              }
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItemButton>
        )}
      </List>
      <Divider />
      <ListItem sx={{ justifyContent: 'flex-end' }}>
        {/* <ListItemText>ThemeMode: {mode}</ListItemText> */}
        <ThemeSwitch checked={mode !== 'light'} onChange={toggleMode} />
      </ListItem>
    </Box>
  );
};

export default Drawer;
