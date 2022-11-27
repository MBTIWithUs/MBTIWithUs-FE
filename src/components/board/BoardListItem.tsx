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
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getMomentFromNow } from '@libs/time';
import { Link } from 'react-router-dom';

const BoardListItem = ({
  title,
  summary,
  views,
  creator_nickname,
  is_anonymous,
  created_at,
  id,
  likes,
}: BoardItemType) => {
  return (
    <ListItem sx={{ p: 0, border: '1px solid #e3e3e3' }}>
      <ListItemButton sx={{ p: 1, m: 0 }} component={Link} to={`${id}`}>
        <ListItemText
          primary={
            <Typography fontSize={14} fontWeight={600}>
              {title}
            </Typography>
          }
          secondary={
            <>
              <Typography fontSize={12} mb={1}>
                {summary}
              </Typography>
              <Box sx={{ fontSize: 11 }}>
                <Typography
                  component={'span'}
                  fontSize={11}
                  mr={1}
                  sx={{ float: 'left' }}
                >
                  {getMomentFromNow(new Date(Number(created_at)).toString())}
                </Typography>
                <Typography
                  component={'span'}
                  fontSize={11}
                  fontWeight={700}
                  mr={1}
                  sx={{ float: 'left' }}
                >
                  {is_anonymous
                    ? '익명'
                    : creator_nickname === '<Unknown>'
                    ? '삭제된 유저'
                    : creator_nickname}
                </Typography>
                <ul style={{ listStyle: 'none' }}>
                  <Typography
                    component={'li'}
                    fontSize={11}
                    ml={1}
                    sx={{ float: 'right', color: '#0ca5af' }}
                  >
                    <VisibilityIcon
                      sx={{ fontSize: 11, verticalAlign: 'middle', mr: 0.2 }}
                    />
                    {views}
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
                    {likes}
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
