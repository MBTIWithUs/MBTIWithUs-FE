import {
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  Input,
  InputAdornment,
  Typography,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';

const BoardCommentInput = () => {
  const [check, setCheck] = useState(false);
  const [content, setContent] = useState('');

  const handleCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCheck(e.target.checked);
  }, []);

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
            <IconButton>
              <CreateIcon color="primary" />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default BoardCommentInput;
