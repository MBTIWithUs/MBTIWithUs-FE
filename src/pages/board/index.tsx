import React, { useContext, useEffect, useState } from 'react';
import BoardListItem from '@components/board/BoardListItem';
import OverlayLoading from '@components/OverlayLoading';
import { Button, Container, List, Typography } from '@mui/material';
import { BoardListType } from 'features/board/types';
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';
import { UserStateContext } from '@contexts/UserContext';
import api from '@libs/api';
import BoardWriter from '@components/board/BoardWriter';

const isLoading = false;
const LIMIT = 10;

const BoardPage = () => {
  const auth = useContext(UserStateContext);

  const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
    if (previousPageData && pageIndex >= previousPageData.total_pages)
      return null;

    return !auth?.token
      ? `/api/v1/community/search/anonymous?page=${
          pageIndex + 1
        }&limit=${LIMIT}`
      : `/api/v1/community/search?page=${pageIndex + 1}&limit=${LIMIT}`;
  };

  const { data, size, setSize } = useSWRInfinite<BoardListType>(getKey, (url) =>
    api
      .get(url, {
        headers: {
          Authorization: `Bearer ${auth?.token?.access_token}`,
        },
      })
      .then((res) => res.data),
  );

  const articles = data ? [...data.map((item) => item.items).flat()] : [];

  console.warn(size, articles, 111, data);

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
          <BoardWriter tag="" />
          <List>
            {articles.map((item) => (
              <BoardListItem key={item.id} {...item} />
            ))}
          </List>
          <Button onClick={() => setSize((prev) => prev + 1)}>test</Button>
        </Container>
      )}
    </Container>
  );
};

export default BoardPage;
