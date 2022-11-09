import { UserStateContext } from '@contexts/UserContext';
import api from '@libs/api';
import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { IMbtiResult } from 'types';
import MbtiSymbol from '@assets/mbti.png';
import MbtiFriendSymbol from '@assets/mbtiFriend.png';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import SwipeableViews from 'react-swipeable-views';
import TabPanel from '@components/TabPanel';

const ProfilePage = () => {
  const auth = useContext(UserStateContext);
  const theme = useTheme();
  const navigate = useNavigate();
  if (!auth?.token) {
    navigate('/login');
  }

  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState(-1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setTab(index);
  };

  const handleModal = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const { data, mutate, error } = useSWR<IMbtiResult[]>(
    typeof window === 'undefined' || !auth?.token
      ? null
      : `/api/v1/mbti/result/recieved/all`,
    (url) =>
      api
        .get(url, {
          headers: {
            Authorization: `Bearer ${auth?.token?.access_token}`,
          },
        })
        .then((res) => res.data),
  );

  const deleteResult = async () => {
    try {
      if (target !== -1) {
        const { status } = await api.delete(`/api/v1/mbti/result/${target}`, {
          headers: {
            Authorization: `Bearer ${auth?.token?.access_token}`,
          },
        });
        if (status === 200) {
          mutate();
        }
      }
    } catch (e) {
      console.log('err', e);
    } finally {
      handleModalClose();
    }
  };

  return (
    <Container sx={{ py: 3 }}>
      <Dialog open={open} onClose={handleModalClose} fullWidth maxWidth="xs">
        <List>
          <ListItemButton
            divider
            sx={{ justifyContent: 'center' }}
            // onClick={handleModalClose}
            component={Link}
            to={{
              pathname: '/mbti/revise',
            }}
            state={target}
          >
            <Typography fontWeight={600} color="primary">
              수정
            </Typography>
          </ListItemButton>
          <ListItemButton
            divider
            sx={{ justifyContent: 'center' }}
            onClick={deleteResult}
          >
            <Typography fontWeight={600} color="error">
              삭제
            </Typography>
          </ListItemButton>
          <ListItemButton
            sx={{ justifyContent: 'center' }}
            onClick={handleModalClose}
          >
            <Typography fontWeight={600}>닫기</Typography>
          </ListItemButton>
        </List>
      </Dialog>
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'center' }} my={5}>
          <Box textAlign="center">
            <Avatar
              sx={{ width: 75, height: 75 }}
              src={auth?.user?.profile_image_url}
            />
            <Typography mt={2} fontWeight={800} fontSize={20}>
              {auth?.user?.nickname}
            </Typography>
          </Box>
        </Box>
        <Box textAlign="center">
          <Button fullWidth variant="contained">
            설정
          </Button>
        </Box>
        <Box py={2}>
          <Tabs value={tab} onChange={handleChange} variant="fullWidth">
            <Tab label={<DescriptionIcon />} />
            <Tab label={<PeopleIcon />} />
          </Tabs>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={tab}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={tab} index={0}>
              <List>
                {data?.map((item) => (
                  <ListItem
                    key={item.id}
                    disablePadding
                    secondaryAction={
                      <IconButton
                        onClick={() => {
                          setTarget(item.id);
                          handleModal();
                        }}
                      >
                        <MoreHorizIcon />
                      </IconButton>
                    }
                  >
                    <ListItemButton
                      sx={{ height: 80 }}
                      dense
                      component={Link}
                      to={{
                        pathname: '/profile/result',
                      }}
                      state={item}
                    >
                      <ListItemAvatar>
                        <Avatar src={MbtiSymbol} />
                      </ListItemAvatar>
                      <ListItemText>
                        <Typography fontWeight={700}>성격 유형 퀴즈</Typography>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <List>
                {data?.map((item) => (
                  <ListItem
                    key={item.id}
                    disablePadding
                    secondaryAction={
                      <IconButton
                        onClick={() => {
                          setTarget(item.id);
                          handleModal();
                        }}
                      >
                        <MoreHorizIcon />
                      </IconButton>
                    }
                  >
                    <ListItemButton sx={{ height: 80 }} dense>
                      <ListItemAvatar>
                        <Avatar
                          src={MbtiFriendSymbol}
                          sx={{ bgcolor: theme.palette.grey[200] }}
                        />
                      </ListItemAvatar>
                      <ListItemText>
                        <Typography fontWeight={700}>
                          {"'엄태욱'"}님의 성격 유형 퀴즈
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </TabPanel>
          </SwipeableViews>
        </Box>
      </Container>
    </Container>
  );
};

export default ProfilePage;
