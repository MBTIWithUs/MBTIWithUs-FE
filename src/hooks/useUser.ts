import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { IToken, IUser } from 'types';
import api from '@libs/api';

interface ProfileResponse extends IUser {
  ok: boolean;
}

export default function useUser() {
  const { data, error } = useSWR<ProfileResponse>(
    typeof window === 'undefined' ? null : '/api/v1/user',
  );
  const [user, setUser] = useState();
  // const router = useNavigate();
  useEffect(() => {
    if (data) {
      // router('/');
    }
  }, [data]);

  const setToken = ({ access_token }: IToken) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
  };

  return {
    user: {
      nickname: data?.nickname,
      profile: data?.profile_image_url,
      id: data?.id,
    },
    isLoading: !data && !error,
    setToken,
  };
}
