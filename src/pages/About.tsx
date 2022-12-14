import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import Logo from '@assets/logo512.png';

const AboutPage = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center' }} py={10}>
        <img
          src={Logo}
          alt="logo"
          style={{ width: 256, height: 256, maxWidth: '100%' }}
        />
        <Box py={3}>
          <Typography variant="h6">Beta version</Typography>
          <Typography>
            현재 베타 버전입니다. 점진적으로 수정 계획에 있습니다.
          </Typography>
        </Box>
        <Box py={3}>
          <Typography variant="h6">Project About</Typography>
          <Typography>
            서울과학기술대학교 3-2 고급 웹프로그래밍 프로젝트
          </Typography>
        </Box>
        <Box py={3}>
          <Typography variant="h6">팀원</Typography>
          <Typography>엄태욱, 정동하</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default React.memo(AboutPage);
