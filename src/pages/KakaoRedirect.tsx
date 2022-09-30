import { Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const KakaoRedirect = () => {
  const { search } = useLocation();

  const [token, setToken] = useState('no response');
  const [code, setCode] = useState('');

  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get('code');
    if (code) {
      setCode(code);

      // TODO
      // api request
      // fetch(``)
      //   .then((res) => res.json())
      //   .then((data) => console.log(data));
    }
  };

  useEffect(() => {
    confirmLogin();
  }, []);

  return (
    <Container>
      <Typography variant="h4">Confirm Page</Typography>
      <Typography>code: {code}</Typography>
      <Typography>token: {token}</Typography>
    </Container>
  );
};

export default KakaoRedirect;
