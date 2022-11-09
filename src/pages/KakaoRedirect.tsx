import { authState } from '@atoms/auth';
import { UserDispatchContext, UserStateContext } from '@contexts/UserContext';
import { Container, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { IToken } from 'types';

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
        const token: IToken = {
          access_token: json.access_token.value,
          access_token_expires_in: json.access_token.expires_in,
          refresh_token: json.refresh_token.value,
          refresh_token_expires_in: json.refresh_token.expires_in,
          server_current_time: json.server_current_time,
          type: 'kakao',
        };

        await dispatch({
          type: 'LOGIN',
          token,
        });
        await setAuthToken(token);
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
