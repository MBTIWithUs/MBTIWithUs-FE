import { authState } from '@atoms/auth';
import { callbackState } from '@atoms/util';
import { UserStateContext, UserDispatchContext } from '@contexts/UserContext';
import { Container, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { IToken } from 'types';

const KakaoRedirect = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useContext(UserDispatchContext);
  const [callbackUrl, setCallbackUrl] = useRecoilState(callbackState);

  const [, setAuthToken] = useRecoilState(authState);
  const auth = useContext(UserStateContext);

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
        setAuthToken(token);
        dispatch({
          type: 'LOGIN',
          token,
        });
      }
    }
  };

  useEffect(() => {
    if (auth?.token) {
      navigate(callbackUrl ? callbackUrl : '/');
      setCallbackUrl('');
    }
  }, [callbackUrl, auth]);

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
