import BoardDetailHeader from '@components/board/BoardDetailHeader';
import OverlayLoading from '@components/OverlayLoading';
import { UserStateContext } from '@contexts/UserContext';
import api from '@libs/api';
import { Box, Button, Container, Typography } from '@mui/material';
import { BoardCommentWrapperType, BoardDetailType } from 'features/board/types';
import React, { useCallback, useContext, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useSWR from 'swr';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BoardCommentItem from '@components/board/BoardCommentItem';
import BoardCommentInput from '@components/board/BoardCommentInput';
import { toast } from 'react-toastify';
import BoardWriter from '@components/board/BoardWriter';

const BoardDetailPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { mbti }: { mbti: string | null } = state;

  const auth = useContext(UserStateContext);
  const [doing, setDoing] = useState(false);
  const { data, mutate } = useSWR<BoardDetailType>(
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
  const [liked, setLiked] = useState(data?.is_liked ? data?.is_liked : false);

  const handleLike = useCallback(async () => {
    if (!auth?.token) {
      toast.error('로그인이 필요합니다.');
      return;
    }
    api
      .post(
        `/api/v1/community/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth?.token?.access_token}`,
          },
        },
      )
      .then(() => {
        toast.success(liked ? '취소' : '공감');
        setLiked((prev) => !prev);
        // mutate();
      })
      .catch(() => {
        toast.error('실패');
      });
  }, [auth, id, liked]);

  const commentWrapper: BoardCommentWrapperType[] | undefined = data?.comments
    .map((item) => ({
      ...item,
      children: data?.comments.filter(
        (child) => item.id === child.parent_comment_id,
      ),
    }))
    .filter((item) => item.parent_comment_id === null);

  const isLoading = !data;

  return (
    <Container sx={{ py: 3 }}>
      {isLoading ? (
        <OverlayLoading isLoading />
      ) : doing ? (
        <>
          <Typography
            sx={{ border: '1px solid #e3e3e3' }}
            p={1}
            variant="h6"
            fontWeight={700}
          >
            글 수정
          </Typography>
          <BoardWriter
            tag={data.tag}
            mutate={mutate}
            isRevise
            previousTitle={data.title}
            previousContent={data.content}
            id={data.id}
            isOpen
          />
        </>
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
          <Box sx={{ border: '1px solid #e3e3e3', mt: 2, p: 2, pb: 2 }}>
            <BoardDetailHeader
              is_anonymous={data.is_anonymous}
              created_at={data.created_at}
              creator_nickname={data.creator_nickname}
              isMe={auth?.user?.id === data.creator_id}
              id={id}
              mutate={mutate}
              setDoing={setDoing}
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
                startIcon={
                  liked ? (
                    <ThumbUpAltIcon sx={{ mr: 0 }} />
                  ) : (
                    <ThumbUpOffAltIcon sx={{ mr: 0 }} />
                  )
                }
                size="small"
                onClick={handleLike}
              >
                {liked ? '취소' : '추천'}
              </Button>
            </Box>
          </Box>
          {commentWrapper &&
            commentWrapper.map((item) => (
              <BoardCommentItem
                key={item.id}
                {...item}
                community_id={data?.id}
              />
            ))}
          <BoardCommentInput community_id={data.id} />
        </Container>
      )}
    </Container>
  );
};

export default BoardDetailPage;
