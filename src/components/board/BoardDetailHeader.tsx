import { UserStateContext } from '@contexts/UserContext';
import { getMomentFromNow } from '@libs/time';
import { getNickname, getShortNickname } from '@libs/utils';
import { Avatar, Box, Typography } from '@mui/material';
import React, { useCallback, useContext } from 'react';
import { toast } from 'react-toastify';
import api from '@libs/api';

const BoardDetailHeader = ({
  is_anonymous,
  creator_nickname,
  created_at,
  isMe,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  mutate,
  id,
  setDoing,
}: {
  is_anonymous: boolean;
  creator_nickname: string;
  created_at: string;
  isMe: boolean;
  id: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setDoing: any;
}) => {
  const auth = useContext(UserStateContext);

  const handleDelete = useCallback(async () => {
    if (!auth || typeof id !== 'string') {
      toast.error('에러');
      return;
    }
    return api
      .delete(`/api/v1/community/${id}`, {
        headers: {
          Authorization: `Bearer ${auth?.token?.access_token}`,
        },
      })
      .then(() => {
        toast.success('성공');
        // mutate(
        //   !auth?.token
        //     ? `/api/v1/community/anonymous/${id}`
        //     : `/api/v1/community/${id}`,
        // );
      })
      .catch(() => {
        toast.error('실패');
      });
  }, []);

  return (
    <Box mb={6}>
      <Avatar alt={creator_nickname} sx={{ float: 'left', mr: 1 }}>
        {getShortNickname({ is_anonymous, creator_nickname })}
      </Avatar>
      <Box sx={{ float: 'left' }}>
        <Typography fontSize={14} fontWeight={700} mr={1} component="div">
          {getNickname({ is_anonymous, creator_nickname })}
        </Typography>
        <Typography
          fontSize={12}
          fontWeight={700}
          mr={1}
          component="div"
          color="#a6a6a6"
        >
          {getMomentFromNow(new Date(Number(created_at)).toString())}
        </Typography>
      </Box>
      <Box sx={{ float: 'right', listStyle: 'none' }}>
        <Typography
          fontSize={11}
          component="span"
          mr={1}
          sx={{ cursor: 'pointer' }}
          color="#a6a6a6"
        >
          쪽지
        </Typography>
        <Typography
          fontSize={11}
          component="span"
          mr={1}
          sx={{ cursor: 'pointer' }}
          color="#a6a6a6"
        >
          신고
        </Typography>
        {isMe && (
          <>
            <Typography
              fontSize={11}
              component="span"
              mr={1}
              onClick={() => setDoing(true)}
              sx={{ cursor: 'pointer' }}
              color="#a6a6a6"
            >
              수정
            </Typography>
            <Typography
              fontSize={11}
              component="span"
              mr={1}
              onClick={handleDelete}
              sx={{ cursor: 'pointer' }}
              color="#a6a6a6"
            >
              삭제
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
};
export default BoardDetailHeader;
