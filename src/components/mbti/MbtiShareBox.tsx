import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import config from '@config';
import styled from '@emotion/styled';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { toast } from 'react-toastify';

const MbtiShareBox = ({ target_id }: { target_id: number | undefined }) => {
  const url = `${config.baseUrl}/mbti?target_id=${target_id}`;

  const onClick = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.info('Copy!');
      })
      .catch((err) => {
        console.log(err);
        toast.error('브라우저 호환');
      });
  };

  return (
    <Box>
      <Typography
        p={2}
        sx={{
          fontSize: {
            xs: 18,
            sm: 20,
            md: 24,
          },
        }}
        fontWeight={900}
        fontFamily={'Kanit'}
      >
        아래 링크를 클릭해 퀴즈를 공유하세요!
      </Typography>
      <CopyContentWrapper borderRadius={1} padding={2} onClick={onClick}>
        <CopyContent component="span">{url}</CopyContent>
        <IconButton>
          <ContentCopyIcon />
        </IconButton>
      </CopyContentWrapper>
    </Box>
  );
};

const CopyContentWrapper = styled(Box)`
  white-space: nowrap;
  overflow: scroll;
  overflow: auto;
  background: rgb(247, 246, 243);
  font-weight: 600;
  cursor: pointer;
`;

const CopyContent = styled(Box)`
  color: rgb(55, 53, 47);
`;

export default MbtiShareBox;
