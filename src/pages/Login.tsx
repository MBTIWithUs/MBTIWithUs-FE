import { Container, Box, Typography } from '@mui/material';
import React from 'react';
import Logo from '@assets/logo.png';

import ButtonLogo from '@assets/kakao_login_medium_narrow.png';

const Login = () => {
  return (
    <Container sx={{ py: 5 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '68vh' }}>
        <Box textAlign="center" pt={10}>
          <img
            src={Logo}
            style={{
              backgroundColor: 'gray',
              borderRadius: 12,
              width: 45,
              height: 45,
              padding: 5,
              paddingTop: 11.5,
              paddingBottom: 11.5,
            }}
          />
          <Typography
            sx={{ opacity: 0.8 }}
            fontSize={24}
            fontWeight={700}
            lineHeight={1.5}
          >
            타입스에 오신 것을
            <br /> 환영합니다.
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center', marginTop: 'auto' }}>
          <a
            href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAOID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}`}
          >
            <img src={ButtonLogo} alt="kakao_login_button" />
          </a>
          <Typography
            fontSize={14}
            letterSpacing={-0.2}
            sx={{ opacity: 0.5 }}
            mt={1}
          >
            위 버튼을 클릭하면 types의 서비스 이용 약관과
            <br /> 개인정보 취급방침에 동의하게 됩니다.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
