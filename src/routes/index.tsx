import React from 'react';
import Main from '@pages/Main';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Test from '@pages/Test';
import Login from '@pages/Login';
import KakaoRedirect from '@pages/KakaoRedirect';
import Header from '@components/Header';
import MbtiPage from '@pages/Mbti';
import { Box } from '@mui/material';
import Footer from '@components/Footer';

export default function Routes() {
  const router = createBrowserRouter([
    {
      path: '',
      children: [
        {
          path: '/',
          element: (
            <>
              <Header /> <Main />
            </>
          ),
        },
        {
          path: '/test',
          element: (
            <>
              <Header /> <Test />
            </>
          ),
        },
        {
          path: '/login',
          element: (
            <>
              <Header />
              <Login />
            </>
          ),
        },
        {
          path: '/mbti',
          element: (
            <>
              <Header /> <MbtiPage />
            </>
          ),
        },
        {
          path: '/auth/kakao/callback',
          element: (
            <>
              <Header /> <KakaoRedirect />
            </>
          ),
        },
        {
          path: '*',
          element: (
            <>
              <Header />
              404
            </>
          ),
        },
      ],
    },
  ]);
  return (
    <>
      <Box minWidth={400}>
        <RouterProvider router={router} />
      </Box>
      <Footer />
    </>
  );
}
