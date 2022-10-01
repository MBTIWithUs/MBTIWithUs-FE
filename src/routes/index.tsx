import React from 'react';
import Main from '@pages/Main';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SWRConfig } from 'swr';
import Test from '@pages/Test';
import Login from '@pages/Login';
import KakaoRedirect from '@pages/KakaoRedirect';
import Header from '@components/Header';
import MbtiPage from '@pages/Mbti';

export default function Routes() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
    },
    {
      path: '/test',
      element: <Test />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/mbti',
      element: <MbtiPage />,
    },
    {
      path: '/oauth/kakao',
      element: <KakaoRedirect />,
    },
  ]);
  return (
    <SWRConfig
      value={{ fetcher: (url: string) => fetch(url).then((res) => res.json()) }}
    >
      <Header />
      <RouterProvider router={router} />
    </SWRConfig>
  );
}
