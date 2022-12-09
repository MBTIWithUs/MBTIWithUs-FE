import React, { useContext, useEffect, useState } from 'react';
import BoardListItem from '@components/board/BoardListItem';
import OverlayLoading from '@components/OverlayLoading';
import { Container, List, Typography } from '@mui/material';
import { BoardListType } from 'features/board/types';
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';
import { UserStateContext } from '@contexts/UserContext';
import api from '@libs/api';
import BoardWriter from '@components/board/BoardWriter';
import { useLocation } from 'react-router-dom';
import useIntersection from '@hooks/useIntersection';
import SEO from '@components/SEO';

const LIMIT = 10;

const BoardPage = () => {
  const location = useLocation();
  const url = new URLSearchParams(location.search);
  const mbti = url.get('mbti');

  const auth = useContext(UserStateContext);
  const [isEnd, setIsEnd] = useState(false);

  const [intersecting, ref] = useIntersection<HTMLDivElement>();

  const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
    if (previousPageData && pageIndex >= previousPageData.meta.total_pages) {
      setIsEnd(true);
      return null;
    }
    return !auth?.token
      ? `/api/v1/community/search/anonymous?page=${
          pageIndex + 1
        }&limit=${LIMIT}`
      : `/api/v1/community/search?page=${pageIndex + 1}&limit=${LIMIT}`;
  };

  const { data, setSize, error, isValidating, mutate } =
    useSWRInfinite<BoardListType>(
      getKey,
      (url) =>
        api
          .get(mbti ? `${url}&tag=${mbti}` : url, {
            headers: {
              Authorization: `Bearer ${auth?.token?.access_token}`,
            },
          })
          .then((res) => res.data),
      {
        refreshInterval: 0,
        revalidateOnFocus: false,
        focusThrottleInterval: 0,
        errorRetryCount: 5,
      },
    );

  const articles = data ? [...data.map((item) => item.items).flat()] : [];

  useEffect(() => {
    if (intersecting && !isValidating && !isEnd) {
      setSize((size) => size + 1);
    }
  }, [isEnd, intersecting, isValidating, setSize]);

  useEffect(() => {
    mutate();
  }, [mbti]);

  const isLoading = !error && !data;

  return (
    <Container sx={{ py: 3 }}>
      <SEO
        title="서로 다른 MBTI의 사람들과 소통하세요!"
        description="여러 사람들과 만날 수 있습니다"
        url={location?.pathname}
      />
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
            {mbti ? `${mbti} 게시판` : '전체게시판'}
          </Typography>
          <BoardWriter tag={mbti ? mbti : 'NULL'} mutate={mutate} />
          <List>
            {articles.map((item) => (
              <BoardListItem key={item.id} {...item} mbti={mbti} />
            ))}
            {isValidating && !isEnd && <OverlayLoading isLoading />}
            <div style={{ position: 'relative' }}>
              <div ref={ref} style={{ position: 'absolute', top: 0 }}></div>
            </div>
          </List>
        </Container>
      )}
    </Container>
  );
};

export default BoardPage;
