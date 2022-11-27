import {
  Box,
  Divider,
  FormControl,
  IconButton,
  Typography,
  FormControlLabel,
  Checkbox,
  InputBase,
} from '@mui/material';
import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import CreateIcon from '@mui/icons-material/Create';
import api from '@libs/api';
import { UserStateContext } from '@contexts/UserContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import config from '@config';

const BoardWriter = ({ tag }: { tag: string }) => {
  const [open, setOpen] = useState(false);
  const auth = useContext(UserStateContext);
  const quillRef = useRef<ReactQuill>(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [check, setCheck] = useState(false);

  const handleCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCheck(e.target.checked);
  }, []);
  const handleTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const handleImage = () => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    document.body.appendChild(input);

    input.click();

    input.addEventListener('change', async () => {
      if (input.files?.length) {
        const file = input.files[0];
        const formData = new FormData();
        formData.append('image', file);

        const { data } = await api.post(`/api/v1/storage`, formData, {
          headers: {
            Authorization: `Bearer ${auth?.token?.access_token}`,
          },
        });

        if (quillRef?.current) {
          const range = quillRef.current.getEditorSelection();
          const editor = quillRef.current.getEditor();
          editor.insertEmbed(
            range?.index ? range?.index : 0,
            'image',
            `${config.deployUrl}${data}`,
          );
          document.body.querySelector(':scope > input')?.remove();
        }
      }
    });
  };

  const handleSubmit = useCallback(async () => {
    try {
      const { data } = await api.post(
        `/api/v1/community/`,
        {
          title: title,
          content: content,
          is_anonymous: check,
          tag: tag,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token?.access_token}`,
          },
        },
      );
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }, [title, content, check, tag]);

  const moudles = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['image', 'link'],
          [
            {
              color: [
                '#000000',
                '#e60000',
                '#ff9900',
                '#ffff00',
                '#008a00',
                '#0066cc',
                '#9933ff',
                '#ffffff',
                '#facccc',
                '#ffebcc',
                '#ffffcc',
                '#cce8cc',
                '#cce0f5',
                '#ebd6ff',
                '#bbbbbb',
                '#f06666',
                '#ffc266',
                '#ffff66',
                '#66b966',
                '#66a3e0',
                '#c285ff',
                '#888888',
                '#a10000',
                '#b26b00',
                '#b2b200',
                '#006100',
                '#0047b2',
                '#6b24b2',
                '#444444',
                '#5c0000',
                '#663d00',
                '#666600',
                '#003700',
                '#002966',
                '#3d1466',
              ],
            },
          ],
        ],
        handlers: {
          image: handleImage,
        },
      },
    }),
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
        <FormControl fullWidth>
          <InputBase
            fullWidth
            placeholder="글 제목"
            value={title}
            onChange={handleTitle}
            sx={{ p: 1, px: 2, fontWeight: 700 }}
          />
          <Divider />
          {/* <Input
            fullWidth
            disableUnderline
            value={content}
            onChange={handleContent}
            placeholder="글 내용"
            multiline
            rows={10}
            sx={{ p: 1, fontSize: 14 }}
          /> */}
          <ReactQuill
            ref={quillRef}
            value={content}
            onChange={setContent}
            theme="bubble"
            placeholder="글 내용"
            style={{
              padding: 0,
              height: '200px',
            }}
            modules={moudles}
          />
          <Divider />
          <Box px={1} py={0.5} m={0} component="ul" sx={{ listStyle: 'none' }}>
            <li style={{ float: 'left' }}>
              <Box onClick={handleImage}>test</Box>
            </li>
            <li style={{ float: 'right', marginRight: 1 }}>
              <IconButton onClick={handleSubmit}>
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
      ) : (
        <Box onClick={() => setOpen((prev) => !prev)} p={1}>
          <Typography>새 글을 작성해주세요!</Typography>
        </Box>
      )}
    </Box>
  );
};

export default BoardWriter;
