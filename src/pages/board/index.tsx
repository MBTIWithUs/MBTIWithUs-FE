import React, { useContext } from 'react';
import BoardListItem from '@components/board/BoardListItem';
import OverlayLoading from '@components/OverlayLoading';
import { Container, List, Typography } from '@mui/material';
import { BoardListType } from 'features/board/types';
import useSWR from 'swr';
import { UserStateContext } from '@contexts/UserContext';
import api from '@libs/api';

const isLoading = false;

const BoardPage = () => {
  const auth = useContext(UserStateContext);
  const { data } = useSWR<BoardListType>(
    typeof window === 'undefined'
      ? 'null'
      : !auth?.token
      ? '/api/v1/community/search'
      : '/api/v1/community/search/anonymous',
    (url) =>
      api
        .get(url, {
          headers: {
            Authorization: `Bearer ${auth?.token?.access_token}`,
          },
        })
        .then((res) => res.data),
  );

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
            {data &&
              data?.items.map((item) => (
                <BoardListItem key={item.id} {...item} />
              ))}
          </List>
        </Container>
      )}
    </Container>
  );
};

export default BoardPage;
