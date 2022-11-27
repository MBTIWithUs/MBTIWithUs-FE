import {
  Box,
  Divider,
  FormControl,
  IconButton,
  Input,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';

const BoardWriter = () => {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [check, setCheck] = useState(false);

  const handleCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCheck(e.target.checked);
  }, []);
  const handleTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const handleContent = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setContent(e.target.value);
    },
    [],
  );

  return (
    <Box
      mt={1}
      sx={{
        border: '2px solid #d6d6d6',
        color: '#a6a6a6',
        backgroundColor: open ? '#ffffff' : '#f9f9f9',
      }}
    >
      {open ? (
        <Box onClick={() => setOpen((prev) => !prev)} p={1}>
          <Typography>새 글을 작성해주세요!</Typography>
        </Box>
      ) : (
        <FormControl fullWidth>
          <Input
            fullWidth
            disableUnderline
            placeholder="글 제목"
            value={title}
            onChange={handleTitle}
            sx={{ p: 1, fontWeight: 700 }}
          />
          <Divider />
          <Input
            fullWidth
            disableUnderline
            value={content}
            onChange={handleContent}
            placeholder="글 내용"
            multiline
            rows={10}
            sx={{ p: 1 }}
          />
          <Divider />
          <Box px={1} py={0.5} m={0} component="ul" sx={{ listStyle: 'none' }}>
            {/* <li style={{ float: 'left' }}>123</li> */}
            <li style={{ float: 'right', marginRight: 1 }}>
              <IconButton>
                <CreateIcon color="primary" />
              </IconButton>
            </li>
            <li style={{ float: 'right' }}>
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
                  <Typography
                    fontSize={11}
                    color={check ? 'primary' : 'default'}
                  >
                    익명
                  </Typography>
                }
                sx={{ mr: 0 }}
              />
            </li>
          </Box>
        </FormControl>
      )}
    </Box>
  );
};

export default BoardWriter;
