import React from 'react';
import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { BoardItemType } from 'features/board/types';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getMomentFromNow } from '@libs/time';
import { Link } from 'react-router-dom';

interface IProps extends BoardItemType {
  mbti: string | null;
}

const BoardListItem = ({
  title,
  summary,
  views,
  creator_nickname,
  is_anonymous,
  created_at,
  id,
  likes,
  thumbnail,
  mbti,
}: IProps) => {
  return (
    <ListItem sx={{ p: 0, border: '1px solid #e3e3e3' }}>
      <ListItemButton
        sx={{ p: 1, m: 0 }}
        component={Link}
        to={`${id}`}
        state={{ mbti }}
        style={{ alignItems: 'space-between' }}
      >
        <ListItemText
          primary={
            <Typography fontSize={14} fontWeight={600}>
              {title}
            </Typography>
          }
          secondary={
            <>
              <Box>
                <Typography fontSize={12}>{summary}</Typography>
              </Box>
              <Box sx={{ fontSize: 11 }} mt={1}>
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
        {thumbnail && (
          <ListItemAvatar sx={{ ml: 1 }}>
            <Avatar
              src={thumbnail}
              sx={{ width: 80, height: 80 }}
              variant="square"
            />
          </ListItemAvatar>
        )}
      </ListItemButton>
    </ListItem>
  );
};

export default BoardListItem;
