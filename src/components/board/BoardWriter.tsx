import {
  Box,
  Divider,
  FormControl,
  IconButton,
  Typography,
  FormControlLabel,
  Checkbox,
  InputBase,
  useTheme,
  Button,
  FormHelperText,
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
import { toast } from 'react-toastify';
import ImageIcon from '@mui/icons-material/Image';
import { useNavigate } from 'react-router-dom';

const REG = {
  title: {
    min: 5,
    max: 64,
  },
  content: {
    min: 10,
    max: 1024,
  },
};

const BoardWriter = ({
  tag,
  mutate,
  previousTitle,
  previousContent,
  isRevise,
  id,
  isOpen,
}: {
  tag: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate: any;
  isOpen?: boolean;
  isRevise?: boolean;
  previousTitle?: string;
  previousContent?: string;
  id?: number;
}) => {
  const [open, setOpen] = useState(isOpen ? isOpen : false);
  // const [open, setOpen] = useRecoilState(doingState);
  const auth = useContext(UserStateContext);
  const quillRef = useRef<ReactQuill>(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<{
    title: string;
    content: string;
  } | null>(null);

  const [title, setTitle] = useState(previousTitle ? previousTitle : '');
  const [content, setContent] = useState(
    previousContent ? previousContent : '',
  );
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
    if (!auth?.token) {
      toast.error('로그인이 필요합니다');
      return;
    }
    // check reg
    if (
      !(REG.title.min <= title.length && title.length <= REG.title.max) ||
      !(REG.content.min <= content.length && content.length <= REG.content.max)
    ) {
      setErrorMessage({
        title: '제목은 5~64자여야 합니다.',
        content: '내용은 10~1024자여야 합니다.',
      });

      return;
    }

    setErrorMessage(null);

    if (isRevise) {
      return api
        .put(
          `/api/v1/community/${id}`,
          {
            title: title,
            content: content,
          },
          {
            headers: {
              Authorization: `Bearer ${auth?.token?.access_token}`,
            },
          },
        )
        .then(() => {
          mutate();
          setTitle('');
          setContent('');
          setOpen(false);
          toast.success('성공');
          isOpen && navigate(-1);
        })
        .catch((e) => {
          console.log(e);
          toast.error('에러');
        });
    }
    return api
      .post(
        `/api/v1/community`,
        {
          title: title,
          content: content,
          is_anonymous: check,
          tag,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token?.access_token}`,
          },
        },
      )
      .then(() => {
        mutate();
        setTitle('');
        setContent('');
        setOpen(false);
        toast.success('성공');
      })
      .catch((e) => {
        console.log(e);
        toast.error('에러');
      });
  }, [title, content, check, tag, errorMessage]);

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
        backgroundColor: open ? theme.palette.background.paper : '#f9f9f9',
      }}
    >
      {open ? (
        <FormControl fullWidth>
          <InputBase
            fullWidth
            placeholder="글 제목"
            value={title}
            onChange={handleTitle}
            sx={{ p: 1, px: 2, pb: 0, fontWeight: 700 }}
          />
          <FormHelperText error>{errorMessage?.title}</FormHelperText>
          <Divider />
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
          <FormHelperText error>{errorMessage?.content}</FormHelperText>
          <Divider />
          <Box px={1} py={0.5} m={0} component="ul" sx={{ listStyle: 'none' }}>
            <li style={{ float: 'left' }}>
              <IconButton onClick={handleImage}>
                <ImageIcon />
              </IconButton>
            </li>
            <li style={{ float: 'right', marginRight: 1 }}>
              <IconButton onClick={handleSubmit}>
                <CreateIcon color="primary" />
              </IconButton>
            </li>
            <li style={{ float: 'right' }}>
              {!isRevise && (
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
              )}
            </li>
          </Box>
          {isRevise && (
            <Box>
              <Button onClick={() => setOpen(false)}>돌아가기</Button>
            </Box>
          )}
        </FormControl>
      ) : (
        <Box onClick={() => setOpen(true)} p={1}>
          <Typography>새 글을 작성해주세요!</Typography>
        </Box>
      )}
    </Box>
  );
};

export default BoardWriter;
