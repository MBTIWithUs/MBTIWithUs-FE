import { Container } from '@mui/material';
import React from 'react';

import ButtonLogo from '@assets/kakao_login_medium_narrow.png';

const Login = () => {
  return (
    <Container>
      <a
        href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
          process.env.REACT_APP_KAKAOID
        }&redirect_uri=${'http://localhost:3000/oauth/kakao'}`}
      >
        <img src={ButtonLogo} alt="kakao_login_button" />
      </a>
    </Container>
  );
};

export default Login;
