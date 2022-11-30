import {
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  Input,
  InputAdornment,
  Typography,
} from '@mui/material';
import React, { useCallback, useContext, useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import { UserStateContext } from '@contexts/UserContext';
import { toast } from 'react-toastify';
import api from '@libs/api';

interface IProps {
  community_id: number;
  parrent_comment_id?: number;
}

const BoardCommentInput = ({ community_id, parrent_comment_id }: IProps) => {
  const [check, setCheck] = useState(false);
  const [content, setContent] = useState('');
  const auth = useContext(UserStateContext);

  const handleCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCheck(e.target.checked);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!auth) {
        toast.error('로그인이 필요합니다');
      }
      api
        .post(
          `/api/v1/community/comment`,
          {
            is_anonymous: check,
            content,
            community_id,
            parrent_comment_id: parrent_comment_id ? parrent_comment_id : null,
          },
          {
            headers: {
              Authorization: `Bearer ${auth?.token?.access_token}`,
            },
          },
        )
        .then((res) => {
          console.log(res);
          toast.success('성공?');
        });
    },
    [content, check],
  );

  return (
    <FormControl fullWidth sx={{ border: '1px solid #e3e3e3' }}>
      <Input
        type="text"
        placeholder="글을 입력해주세요."
        disableUnderline
        sx={{
          fontSize: 13,
          backgroundColor: '#f8f8f8',
          p: 1,
          color: '#262626',
        }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  sx={{ width: 24 }}
                  checked={check}
                  onChange={handleCheck}
                />
              }
              label={
                <Typography fontSize={11} color={check ? 'primary' : 'default'}>
                  익명
                </Typography>
              }
              sx={{ mr: 0 }}
            />
            <IconButton onClick={handleSubmit}>
              <CreateIcon color="primary" />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default BoardCommentInput;
