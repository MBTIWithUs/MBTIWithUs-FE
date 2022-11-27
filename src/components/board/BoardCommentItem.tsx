import { Avatar, Box, Typography } from '@mui/material';
import { BoardCommentType } from 'features/board/types';
import React, { useCallback, useState } from 'react';
import { getNickname, getShortNickname } from '@libs/utils';
import { getMomentFromNow } from '@libs/time';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import BoardCommentInput from './BoardCommentInput';

const BoardCommentItem = ({
  id,
  is_anonymous,
  content,
  created_at,
  creator_nickname,
  likes,
}: BoardCommentType) => {
  const [open, setOpen] = useState(false);
  const handleComment = useCallback(() => {
    setOpen((prev) => !prev);
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
            onClick={handleComment}
            component="span"
            mr={1}
            sx={{ cursor: 'pointer' }}
            color="#a6a6a6"
          >
            공감
          </Typography>
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
      {open && (
        <Box pl={2} pt={2}>
          <BoardCommentInput />
        </Box>
      )}
    </Box>
  );
};

export default BoardCommentItem;
