import useUser from '@hooks/useUser';
import { Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const KakaoRedirect = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const [code, setCode] = useState('');
  const { setToken } = useUser();

  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get('code');
    if (code) {
      setCode(code);
      const raw = await fetch(`/api/v1/auth/kakao/token?code=${code}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const json = await raw.json();
      await setToken(json);

      localStorage.setItem('token', JSON.stringify(json));
      navigate('/');

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
    </Container>
  );
};

export default KakaoRedirect;
