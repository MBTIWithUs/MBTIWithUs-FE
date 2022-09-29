import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { IUser } from 'types';

interface ProfileResponse {
  ok: boolean;
  profile: IUser;
}

export default function useUser() {
  const { data, error } = useSWR<ProfileResponse>(
    typeof window === 'undefined' ? null : '/api/users/me',
  );
  const router = useNavigate();
  useEffect(() => {
    console.log(data, error, !data && !error);

    if (data && !data.ok) {
      console.log(data.ok);

      router('/');
    }
  }, [data, router]);

  return { user: data?.profile, isLoading: !data && !error };
}
