import BoardDetailHeader from '@components/board/BoardDetailHeader';
import OverlayLoading from '@components/OverlayLoading';
import { UserStateContext } from '@contexts/UserContext';
import api from '@libs/api';
import { Box, Button, Container, Typography } from '@mui/material';
import { BoardDetailType } from 'features/board/types';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BoardCommentItem from '@components/board/BoardCommentItem';
import BoardCommentInput from '@components/board/BoardCommentInput';

const BoardDetailPage = () => {
  const { id } = useParams();

  const auth = useContext(UserStateContext);
  const { data } = useSWR<BoardDetailType>(
    typeof window === 'undefined'
      ? 'null'
      : !auth?.token
      ? `/api/v1/community/anonymous/${id}`
      : `/api/v1/community/${id}`,
    (url) =>
      api
        .get(url, {
          headers: {
            Authorization: `Bearer ${auth?.token?.access_token}`,
          },
        })
        .then((res) => res.data),
  );
  const isLoading = !data;

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
          <Box sx={{ border: '1px solid #e3e3e3', mt: 2, p: 2, pb: 2 }}>
            <BoardDetailHeader
              is_anonymous={data.is_anonymous}
              created_at={data.created_at}
              creator_nickname={data.creator_nickname}
            />
            <Typography fontSize={22} fontWeight={600}>
              {data.title}
            </Typography>
            <Typography
              fontSize={14}
              mt={2}
              component="div"
              sx={{ img: { maxWidth: '100%' } }}
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
            <Box py={2}>
              <Typography
                fontSize={13}
                mr={1}
                sx={{ float: 'left', color: '#c62917' }}
              >
                <ThumbUpOffAltIcon
                  sx={{ fontSize: 13, verticalAlign: 'middle', mr: 0.3 }}
                />
                {data.likes}
              </Typography>
              <Typography
                fontSize={13}
                mr={1}
                sx={{ float: 'left', color: '#0ca5af' }}
              >
                <ChatBubbleOutlineIcon
                  sx={{ fontSize: 13, verticalAlign: 'middle', mr: 0.3 }}
                />
                {data.comments.length}
              </Typography>
              <Typography
                fontSize={13}
                mr={1}
                sx={{ float: 'left', color: '#ffcc1c' }}
              >
                <VisibilityIcon
                  sx={{ fontSize: 13, verticalAlign: 'middle', mr: 0.3 }}
                />
                {data.views}
              </Typography>
            </Box>
            <Box mt={2}>
              <Button
                variant="outlined"
                startIcon={<ThumbUpOffAltIcon sx={{ mr: 0 }} />}
                size="small"
              >
                추천
              </Button>
            </Box>
          </Box>
          {data?.comments.map((item) => (
            <BoardCommentItem key={item.id} {...item} community_id={data?.id} />
          ))}
          <BoardCommentInput community_id={data.id} />
        </Container>
      )}
    </Container>
  );
};

export default BoardDetailPage;
