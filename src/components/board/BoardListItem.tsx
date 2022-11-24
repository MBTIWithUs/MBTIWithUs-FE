import React from 'react';
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { BoardItemType } from 'features/board/types';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const BoardListItem = ({
  title,
  content,
  reply_cnt,
  like,
  nickname,
}: BoardItemType) => {
  return (
    <ListItem sx={{ p: 0, border: '1px solid #e3e3e3' }}>
      <ListItemButton sx={{ p: 1, m: 0 }}>
        <ListItemText
          primary={
            <Typography fontSize={14} fontWeight={600}>
              {title}
            </Typography>
          }
          secondary={
            <>
              <Typography fontSize={12} mb={1}>
                {content}
              </Typography>
              <Box sx={{ fontSize: 11 }}>
                <Typography
                  component={'span'}
                  fontSize={11}
                  mr={1}
                  sx={{ float: 'left' }}
                >
                  1분 전
                </Typography>
                <Typography
                  component={'span'}
                  fontSize={11}
                  fontWeight={700}
                  mr={1}
                  sx={{ float: 'left' }}
                >
                  {nickname}
                </Typography>
                <ul style={{ listStyle: 'none' }}>
                  <Typography
                    component={'li'}
                    fontSize={11}
                    ml={1}
                    sx={{ float: 'right', color: '#0ca5af' }}
                  >
                    <ChatBubbleOutlineIcon
                      sx={{ fontSize: 11, verticalAlign: 'middle', mr: 0.2 }}
                    />
                    {reply_cnt}
                  </Typography>
                  <Typography
                    component={'li'}
                    fontSize={11}
                    ml={1}
                    sx={{ float: 'right', color: '#c62917' }}
                  >
                    <ThumbUpOffAltIcon
                      sx={{ fontSize: 11, verticalAlign: 'middle', mr: 0.2 }}
                    />
                    {like}
                  </Typography>
                </ul>
              </Box>
            </>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default BoardListItem;
