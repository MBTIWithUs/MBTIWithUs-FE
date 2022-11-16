import config from '@config';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

export default function useProvideAuth() {
  const [token, setToken] = useState<string | null>(null);
  // const [isLogin, setIsLogin] = useState(
  //   !!JSON.parse(localStorage.getItem('isLoggedIn')),
  // );
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('isLoggedIn'),
  );
  const [isLoading, setIsLoading] = useState(true);

  const login = (token: string) => {
    localStorage.setItem('isLoggedIn', 'true');
    setToken(token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    setToken(null);
    setIsLoggedIn(false);
  };

  // Refresh token for persisting session
  const { data, error, isValidating } = useSWR(
    isLoggedIn ? `${config.baseUrl}/refresh-token.php` : null,
    (url) =>
      fetch(url, {
        credentials: 'include',
      }).then((res) => res.json()),
    {
      // Silently refresh token every expiry time
      refreshInterval: 1000 * 60 * 15,
      revalidateOnFocus: false,
    },
  );

  useEffect(() => {
    if (data) {
      login(data.accessToken);
    }
    if (error) {
      logout();
    }
    setIsLoading(isValidating);
  }, [data, error, isValidating]);

  useEffect(() => {
    // Sync all tabs on login or logout
    window.addEventListener('storage', (e: StorageEvent) => {
      if (e.key === 'isLoggedIn' && !e.newValue) {
        // setIsLoggedIn(e.newValue);
      }
    });
  });

  return { token, login, logout, isLoggedIn, isLoading };
}
