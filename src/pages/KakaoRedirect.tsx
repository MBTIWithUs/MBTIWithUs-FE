import { authState } from '@atoms/auth';
import { UserDispatchContext, UserStateContext } from '@contexts/UserContext';
import { Container, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

const KakaoRedirect = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useContext(UserDispatchContext);

  const [, setAuthToken] = useRecoilState(authState);

  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get('code');
    if (code) {
      const raw = await fetch(`/api/v1/auth/kakao/token?code=${code}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const json = await raw.json();
      if (dispatch) {
        await dispatch({ type: 'LOGIN', token: json });
        await setAuthToken(json);
      }
      navigate('/');
    }
  };

  useEffect(() => {
    confirmLogin();
  }, []);

  return (
    <Container>
      <Typography variant="h4">Confirm Page</Typography>
    </Container>
  );
};

export default KakaoRedirect;
