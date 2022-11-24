import React from 'react';
import BoardListItem from '@components/board/BoardListItem';
import OverlayLoading from '@components/OverlayLoading';
import { Container, List, Typography } from '@mui/material';
import { BoardItemType } from 'features/board/types';

const DATA: BoardItemType[] = [
  {
    id: 1,
    title: '친구기다리며 쓰는 내가 겪은 mbti 장단점',
    content:
      'istp 장점 : 너밖에 없음 어장, 바람 하고싶어도 못함 사귀면 잘해줌 단점 : 논리적이어야 하는 상황일 때 너무 정없어보임(띠꺼움 근데',
    nickname: '익명',
    like: 2,
    reply_cnt: 10,
  },
  {
    id: 2,
    title: '1',
    content: '1',
    nickname: 'dongha',
    like: 1,
    reply_cnt: 2,
  },
  {
    id: 3,
    title: '1',
    content: '1',
    nickname: 'dongha',
    like: 1,
    reply_cnt: 2,
  },
  {
    id: 4,
    title: '1',
    content: '1',
    nickname: 'dongha',
    like: 1,
    reply_cnt: 2,
  },
  {
    id: 5,
    title: '1',
    content: '1',
    nickname: 'dongha',
    like: 1,
    reply_cnt: 2,
  },
  {
    id: 6,
    title: '1',
    content: '1',
    nickname: 'dongha',
    like: 1,
    reply_cnt: 2,
  },
];

const isLoading = false;

const BoardPage = () => {
  return (
    <Container sx={{ py: 3 }}>
      {isLoading ? (
        <OverlayLoading isLoading />
      ) : (
        <Container maxWidth="md">
          <Typography
            sx={{ border: '1px solid #e3e3e3' }}
            p={1}
            variant="h6"
            fontWeight={700}
          >
            자유게시판
          </Typography>
          <List>
            {DATA.map((item) => (
              <BoardListItem key={item.id} {...item} />
            ))}
          </List>
        </Container>
      )}
    </Container>
  );
};

export default BoardPage;
