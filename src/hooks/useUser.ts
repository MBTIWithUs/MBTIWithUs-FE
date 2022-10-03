import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { IToken, IUser } from 'types';
import api from '@libs/api';
import { useRecoilValue } from 'recoil';
import { authState } from '@atoms/auth';

interface ProfileResponse extends IUser {
  ok: boolean;
}

export default function useUser() {
  const authToken = useRecoilValue(authState);
  const { data, mutate, error } = useSWR<ProfileResponse>(
    typeof window === 'undefined' ? null : '/api/v1/user',
    (url) =>
      api
        .get(url, {
          headers: {
            Authorization: authToken ? `Bearer ${authToken.access_token}` : '',
          },
        })
        .then((res) => res.data),
  );
  // const router = useNavigate();

  useEffect(() => {
    if (data) {
      // router('/');
      console.log(authToken);
    }
  }, [data]);

  useEffect(() => {
    if (authToken?.access_token) {
      console.log(authToken);

      setToken(authToken);
      mutate();
      // mutate();
    }
  }, [authToken]);

  const setToken = ({ access_token }: IToken) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
  };

  return {
    user: data && {
      nickname: data?.nickname,
      profile: data?.profile_image_url,
      id: data?.id,
    },
    isLoading: !data && !error,
    setToken,
  };
}
