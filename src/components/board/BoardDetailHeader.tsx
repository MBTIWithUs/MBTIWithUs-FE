import { getMomentFromNow } from '@libs/time';
import { getNickname, getShortNickname } from '@libs/utils';
import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';

const BoardDetailHeader = ({
  is_anonymous,
  creator_nickname,
  created_at,
}: {
  is_anonymous: boolean;
  creator_nickname: string;
  created_at: string;
}) => {
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
      {/* <Box component="ul" sx={{ float: 'right', listStyle: 'none' }}>
        <li>쪽지</li>
        <li>신고</li>
      </Box> */}
    </Box>
  );
};
export default BoardDetailHeader;
