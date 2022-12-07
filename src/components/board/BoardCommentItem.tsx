import { Avatar, Box, Typography } from '@mui/material';
import {
  BoardCommentType,
  BoardCommentWrapperType,
  BoardDetailType,
} from 'features/board/types';
import React, { useCallback, useContext, useState } from 'react';
import { getNickname, getShortNickname } from '@libs/utils';
import { getMomentFromNow } from '@libs/time';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import BoardCommentInput from './BoardCommentInput';
import { UserStateContext } from '@contexts/UserContext';
import api from '@libs/api';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';

interface IProps extends BoardCommentWrapperType {
  community_id: number;
}

interface IPropsChild extends BoardCommentType {
  community_id: number;
}

const BoardCommentTemplate = ({
  id,
  community_id,
  is_anonymous,
  content,
  created_at,
  creator_id,
  creator_nickname,
  likes,
  is_liked,
  ...props
}: IPropsChild) => {
  const auth = useContext(UserStateContext);
  const { cache, mutate: update } = useSWRConfig();

  const handleLike = useCallback(async () => {
    if (!auth) {
      toast.error('로그인이 필요합니다.');
      return;
    }
    return api
      .post(
        `/api/v1/community/comment/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth?.token?.access_token}`,
          },
        },
      )
      .then(() => {
        const data: BoardDetailType = cache.get(
          !auth?.token
            ? `/api/v1/community/anonymous/${community_id}`
            : `/api/v1/community/${community_id}`,
        );

        const commentIndex = data.comments.findIndex((item) => item.id === id);
        if (commentIndex === -1) throw Error('not find comment');
        const comment = data.comments[commentIndex];

        update(
          !auth?.token
            ? `/api/v1/community/anonymous/${community_id}`
            : `/api/v1/community/${community_id}`,
          {
            ...data,
            comments: [
              ...data.comments.slice(0, commentIndex),
              {
                ...comment,
                is_liked: !comment.is_liked,
                likes: comment.is_liked ? comment.likes - 1 : comment.likes + 1,
              },
              ...data.comments.slice(commentIndex + 1),
            ],
          },
          false,
        );
        toast.success(is_liked ? '취소' : '추천');
      })
      .catch(() => {
        toast.error('실패');
      });
  }, []);
  const handleDlete = useCallback(() => {
    if (!auth) {
      toast.error('로그인이 필요합니다.');
      return;
    }
    return api
      .delete(`/api/v1/community/comment/${id}`, {
        headers: {
          Authorization: `Bearer ${auth?.token?.access_token}`,
        },
      })
      .then(() => {
        update(
          !auth?.token
            ? `/api/v1/community/anonymous/${community_id}`
            : `/api/v1/community/${community_id}`,
        );
        toast.success('성공');
      })
      .catch(() => {
        toast.error('실패');
      });
  }, []);

  return (
    <Box sx={{ ...props }} pl={2} pt={1}>
      <Box pb={3}>
        <Avatar
          alt={creator_nickname}
          sx={{ float: 'left', mr: 1, width: 22, height: 22 }}
        >
          {getShortNickname({ is_anonymous, creator_nickname })}
        </Avatar>
        <Box sx={{ float: 'left' }}>
          <Typography fontSize={12} fontWeight={700} mr={1} component="div">
            {getNickname({ is_anonymous, creator_nickname })}
          </Typography>
        </Box>
        <Box sx={{ float: 'right' }}>
          <Typography
            fontSize={11}
            onClick={handleLike}
            component="span"
            mr={1}
            sx={{ cursor: 'pointer' }}
            color="#a6a6a6"
          >
            {is_liked ? '공감 취소' : '공감'}
          </Typography>
          {creator_id === auth?.user?.id && (
            <Typography
              fontSize={11}
              onClick={handleDlete}
              component="span"
              mr={1}
              sx={{ cursor: 'pointer' }}
              color="#a6a6a6"
            >
              삭제
            </Typography>
          )}
        </Box>
      </Box>
      <Typography py={1} fontSize={14}>
        {content}
      </Typography>
      <Typography
        fontSize={12}
        fontWeight={700}
        mr={1}
        component="div"
        color="#a6a6a6"
      >
        {getMomentFromNow(new Date(Number(created_at)).toString())}
        {likes > 0 && (
          <Typography
            component="span"
            fontSize={11}
            ml={1}
            sx={{ color: '#c62917' }}
          >
            <ThumbUpOffAltIcon
              sx={{ fontSize: 11, verticalAlign: 'middle', mr: 0.3 }}
            />
            {likes}
          </Typography>
        )}
      </Typography>
    </Box>
  );
};

const BoardCommentItem = ({
  id,
  community_id,
  is_anonymous,
  content,
  created_at,
  creator_nickname,
  likes,
  children,
  is_liked,
  creator_id,
}: IProps) => {
  const auth = useContext(UserStateContext);
  const { cache, mutate: update } = useSWRConfig();
  const [open, setOpen] = useState(false);
  const handleComment = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleLike = useCallback(async () => {
    if (!auth) {
      toast.error('로그인이 필요합니다.');
      return;
    }
    return api
      .post(
        `/api/v1/community/comment/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth?.token?.access_token}`,
          },
        },
      )
      .then(() => {
        const data: BoardDetailType = cache.get(
          !auth?.token
            ? `/api/v1/community/anonymous/${community_id}`
            : `/api/v1/community/${community_id}`,
        );

        const commentIndex = data.comments.findIndex((item) => item.id === id);
        if (commentIndex === -1) throw Error('not find comment');
        const comment = data.comments[commentIndex];

        update(
          !auth?.token
            ? `/api/v1/community/anonymous/${community_id}`
            : `/api/v1/community/${community_id}`,
          {
            ...data,
            comments: [
              ...data.comments.slice(0, commentIndex),
              {
                ...comment,
                is_liked: !comment.is_liked,
                likes: comment.is_liked ? comment.likes - 1 : comment.likes + 1,
              },
              ...data.comments.slice(commentIndex + 1),
            ],
          },
        );
        toast.success(is_liked ? '취소' : '추천');
      })
      .catch(() => {
        toast.error('실패');
      });
  }, []);
  const handleDlete = useCallback(() => {
    if (!auth) {
      toast.error('로그인이 필요합니다.');
      return;
    }
    return api
      .delete(`/api/v1/community/comment/${id}`, {
        headers: {
          Authorization: `Bearer ${auth?.token?.access_token}`,
        },
      })
      .then(() => {
        toast.success('성공');
        update(
          !auth?.token
            ? `/api/v1/community/anonymous/${community_id}`
            : `/api/v1/community/${community_id}`,
        );
      })
      .catch(() => {
        toast.error('실패');
      });
  }, []);

  return (
    <Box sx={{ border: '1px solid #e3e3e3' }} p={2}>
      <Box pb={3}>
        <Avatar
          alt={creator_nickname}
          sx={{ float: 'left', mr: 1, width: 24, height: 24 }}
        >
          {getShortNickname({ is_anonymous, creator_nickname })}
        </Avatar>
        <Box sx={{ float: 'left' }}>
          <Typography fontSize={14} fontWeight={700} mr={1} component="div">
            {getNickname({ is_anonymous, creator_nickname })}
          </Typography>
        </Box>
        <Box sx={{ float: 'right' }}>
          <Typography
            fontSize={11}
            onClick={handleComment}
            component="span"
            mr={1}
            sx={{ cursor: 'pointer' }}
            color="#a6a6a6"
          >
            대댓글
          </Typography>
          <Typography
            fontSize={11}
            onClick={handleLike}
            component="span"
            mr={1}
            sx={{ cursor: 'pointer' }}
            color="#a6a6a6"
          >
            {is_liked ? '공감 취소' : '공감'}
          </Typography>
          {creator_id === auth?.user?.id && (
            <Typography
              fontSize={11}
              onClick={handleDlete}
              component="span"
              mr={1}
              sx={{ cursor: 'pointer' }}
              color="#a6a6a6"
            >
              삭제
            </Typography>
          )}
        </Box>
      </Box>
      <Typography py={1} fontSize={14}>
        {content}
      </Typography>
      <Typography
        fontSize={12}
        fontWeight={700}
        mr={1}
        component="div"
        color="#a6a6a6"
      >
        {getMomentFromNow(new Date(Number(created_at)).toString())}
        {likes > 0 && (
          <Typography
            component="span"
            fontSize={11}
            ml={1}
            sx={{ color: '#c62917' }}
          >
            <ThumbUpOffAltIcon
              sx={{ fontSize: 11, verticalAlign: 'middle', mr: 0.3 }}
            />
            {likes}
          </Typography>
        )}
      </Typography>
      {(open || children.length > 0) && (
        <Box pl={2} pt={2}>
          {children.length > 0 &&
            children.map((item) => (
              <BoardCommentTemplate
                {...item}
                key={item.id}
                community_id={community_id}
                {...{
                  pb: 1,
                  border: '1px solid #e3e3e3',
                  backgroundColor: 'primary',
                }}
              />
            ))}
          <Box pt={1}>
            {open && (
              <BoardCommentInput
                community_id={community_id}
                parent_comment_id={id}
              />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default BoardCommentItem;
