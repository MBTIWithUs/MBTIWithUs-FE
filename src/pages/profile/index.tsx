import { UserStateContext } from '@contexts/UserContext';
import api from '@libs/api';
import {
  Avatar,
  Box,
  Container,
  Dialog,
  Divider,
  Grid,
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
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { IMbtiResult, IMbtiScoreType } from 'types';
import MbtiSymbol from '@assets/mbti.png';
import MbtiFriendSymbol from '@assets/mbtiFriend.png';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import SwipeableViews from 'react-swipeable-views';
import TabPanel from '@components/TabPanel';
import MbtiResultBox from '@components/mbti/MbtiResultBox';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { getMbtiResult2String } from '@libs/mbti';
import OverlayLoading from '@components/OverlayLoading';
import MbtiShareBox from '@components/mbti/MbtiShareBox';
import MbtiListItemText from '@components/mbti/MbtiListItemText';

const ProfilePage = () => {
  const auth = useContext(UserStateContext);
  const theme = useTheme();
  const navigate = useNavigate();

  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState<{
    id: number;
    target_id: number;
  } | null>(null);

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

  const {
    data: recievedData,
    mutate: recievedMutate,
    error: recivedError,
  } = useSWR<IMbtiResult[]>(
    typeof window === 'undefined' || !auth?.token
      ? null
      : `/api/v1/mbti/result/recieved/all`,
    (url) =>
      api
        .get<IMbtiResult[]>(url, {
          headers: {
            Authorization: `Bearer ${auth?.token?.access_token}`,
          },
        })
        .then((res) => res.data)
        .then((data) => data.reverse()),
    {
      revalidateOnFocus: false,
    },
  );

  const {
    data: sentData,
    mutate: sentMutate,
    error: sentError,
  } = useSWR<IMbtiResult[]>(
    typeof window === 'undefined' || !auth?.token
      ? null
      : `/api/v1/mbti/result/sent/all`,
    (url) =>
      api
        .get<IMbtiResult[]>(url, {
          headers: {
            Authorization: `Bearer ${auth?.token?.access_token}`,
          },
        })
        .then((res) => res.data)
        .then((data) => data.reverse()),
  );

  const isLoading = !recivedError && !recievedData && !sentData && !sentError;

  const me2me: IMbtiResult[] | undefined =
    recievedData &&
    recievedData.filter((item) => item.writer_id === auth?.user?.id);

  const friends2me: IMbtiResult[] | undefined =
    recievedData &&
    recievedData.filter((item) => item.writer_id !== auth?.user?.id);

  const me2friends: IMbtiResult[] | undefined =
    sentData && sentData.filter((item) => item.target_id !== auth?.user?.id);
  const friendsResult: IMbtiScoreType | undefined =
    friends2me && friends2me.length
      ? friends2me
          .filter(
            (value, index, self) =>
              self.findIndex((v) => v.writer_id === value.writer_id) === index,
          )
          .reduce(
            (prev, cur) => ({
              e_score: prev.e_score + cur.e_score,
              f_score: prev.f_score + cur.f_score,
              i_score: prev.i_score + cur.i_score,
              j_score: prev.j_score + cur.j_score,
              n_score: prev.n_score + cur.n_score,
              p_score: prev.p_score + cur.p_score,
              s_score: prev.s_score + cur.s_score,
              t_score: prev.t_score + cur.t_score,
            }),
            {
              e_score: 0,
              f_score: 0,
              i_score: 0,
              j_score: 0,
              n_score: 0,
              p_score: 0,
              s_score: 0,
              t_score: 0,
            },
          )
      : undefined;
  // 5 : 5
  const meAndFriendsResult: IMbtiScoreType | undefined = me2me?.length
    ? friendsResult
      ? {
          e_score: me2me[0].e_score + friendsResult.e_score,
          f_score: me2me[0].f_score + friendsResult.f_score,
          i_score: me2me[0].i_score + friendsResult.i_score,
          j_score: me2me[0].j_score + friendsResult.j_score,
          n_score: me2me[0].n_score + friendsResult.n_score,
          p_score: me2me[0].p_score + friendsResult.p_score,
          s_score: me2me[0].s_score + friendsResult.s_score,
          t_score: me2me[0].t_score + friendsResult.t_score,
        }
      : me2me[0]
    : undefined;

  const deleteResult = async () => {
    try {
      if (target) {
        const { status } = await api.delete(
          `/api/v1/mbti/result/${target.id}`,
          {
            headers: {
              Authorization: `Bearer ${auth?.token?.access_token}`,
            },
          },
        );
        if (status === 200) {
          recievedMutate();
          sentMutate();
        }
      }
    } catch (e) {
      console.log('err', e);
    } finally {
      handleModalClose();
    }
  };

  useEffect(() => {
    if (auth?.userLoading) {
      return;
    }

    if (!auth?.token) {
      navigate('/login');
    }
  }, [auth]);

  return (
    <Container sx={{ py: 3 }}>
      {isLoading ? (
        <OverlayLoading isLoading />
      ) : (
        <>
          <Dialog
            open={open}
            onClose={handleModalClose}
            fullWidth
            maxWidth="xs"
          >
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
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Avatar
                    sx={{
                      width: 75,
                      height: 75,
                    }}
                    src={auth?.user?.profile_image_url}
                  />
                </Box>
                <Typography mt={2} fontWeight={800} fontSize={20}>
                  {auth?.user?.nickname}
                </Typography>
              </Box>
            </Box>
            <Box pb={4}>
              <MbtiShareBox target_id={auth?.user?.id} />
            </Box>
            <Box textAlign="center">
              {/* <Button fullWidth variant="contained">
                설정
              </Button> */}
            </Box>
            <Box py={4}>
              <Grid container rowSpacing={3}>
                <Grid item xs={12} sm={4}>
                  <MbtiResultBox
                    label="나"
                    mbti={
                      recievedData?.length
                        ? getMbtiResult2String(recievedData[0])
                        : 'NULL'
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MbtiResultBox
                    label="친구가 생각하는 나"
                    mbti={
                      friendsResult
                        ? getMbtiResult2String(friendsResult)
                        : 'NULL'
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MbtiResultBox
                    label="나와 친구가 생각하는 나"
                    mbti={
                      meAndFriendsResult
                        ? getMbtiResult2String(meAndFriendsResult)
                        : 'NULL'
                    }
                  />
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Box py={2}>
              <Tabs value={tab} onChange={handleChange} variant="fullWidth">
                <Tab label={<DescriptionIcon />} />
                <Tab label={<PeopleIcon />} />
                <Tab label={<ArrowOutwardIcon />} />
              </Tabs>
              <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={tab}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={tab} index={0}>
                  <List>
                    {me2me?.map((item) => (
                      <ListItem
                        key={item.id}
                        disablePadding
                        secondaryAction={
                          <IconButton
                            onClick={() => {
                              setTarget({
                                id: item.id,
                                target_id: item.target_id,
                              });
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
                            <MbtiListItemText
                              label="자가 보고형 결과"
                              date={new Date(
                                parseInt(item.created_at, 10),
                              ).toString()}
                            />
                          </ListItemText>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </TabPanel>
                <TabPanel value={tab} index={1}>
                  <List>
                    {friends2me?.map((item) => (
                      <ListItem
                        key={item.id}
                        disablePadding
                        // secondaryAction={
                        //   <IconButton
                        //     onClick={() => {
                        //       setTarget({
                        //         id: item.id,
                        //         target_id: item.target_id,
                        //       });
                        //       handleModal();
                        //     }}
                        //   >
                        //     <MoreHorizIcon />
                        //   </IconButton>
                        // }
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
                            <Avatar
                              src={MbtiFriendSymbol}
                              sx={{ bgcolor: theme.palette.grey[200] }}
                            />
                          </ListItemAvatar>
                          <ListItemText>
                            <MbtiListItemText
                              label={`"${item.writer_nickname}"님이 작성한 성격 유형`}
                              date={new Date(
                                parseInt(item.created_at, 10),
                              ).toString()}
                            />
                          </ListItemText>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </TabPanel>
                <TabPanel value={tab} index={2}>
                  <List>
                    {me2friends?.map((item) => (
                      <ListItem
                        key={item.id}
                        disablePadding
                        secondaryAction={
                          <IconButton
                            onClick={() => {
                              setTarget({
                                id: item.id,
                                target_id: item.target_id,
                              });
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
                            <Avatar
                              src={MbtiFriendSymbol}
                              sx={{ bgcolor: theme.palette.grey[200] }}
                            />
                          </ListItemAvatar>
                          <ListItemText>
                            <MbtiListItemText
                              label={`당신이 생각하는 "${item.target_nickname}"님의 작성한 성격 유형`}
                              date={new Date(
                                parseInt(item.created_at, 10),
                              ).toString()}
                            />
                          </ListItemText>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </TabPanel>
              </SwipeableViews>
            </Box>
          </Container>
        </>
      )}
    </Container>
  );
};

export default ProfilePage;
