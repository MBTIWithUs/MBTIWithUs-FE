import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import Logo from '@assets/logo512.png';

const AboutPage = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center' }} py={10}>
        <img src={Logo} alt="logo" style={{ width: 256, height: 256 }} />
        <Box py={3}>
          <Typography variant="h6">Beta version</Typography>
          <Typography>
            현재 베타 버전입니다. 점진적으로 수정 계획에 있습니다.
          </Typography>
        </Box>
        <Box py={3}>
          <Typography variant="h6">MbtiWithUs</Typography>
          <Typography>
            {`Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.`}
          </Typography>
        </Box>
        <Box py={3}>
          <Typography variant="h6">MbtiWithUs</Typography>
          <Typography>
            {`Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.`}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default React.memo(AboutPage);
