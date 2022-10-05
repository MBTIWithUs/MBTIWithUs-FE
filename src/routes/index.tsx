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
import ProfilePage from '@pages/profile';

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
          path: '/profile',
          element: (
            <>
              <Header />
              <ProfilePage />
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
      <Box sx={{ height: '100vh' }}>
        <RouterProvider router={router} />
        <Footer />
      </Box>
    </>
  );
}
