import React from 'react';
import Main from '@pages/Main';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from '@pages/Login';
import KakaoRedirect from '@pages/KakaoRedirect';
import Header from '@components/Header';
import MbtiSelfPage from '@pages/mbti/Self';
import MbtiRevisePage from '@pages/mbti/Revise';
import { Box } from '@mui/material';
import Footer from '@components/Footer';
import ProfilePage from '@pages/profile';
import ResultPage from '@pages/profile/Result';
import BoardPage from '@pages/board';
import BoardDetailPage from '@pages/board/BoardDetail';
import AboutPage from '@pages/About';

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
              <Header /> <MbtiSelfPage />
            </>
          ),
        },
        {
          path: '/mbti/revise',
          element: (
            <>
              <Header /> <MbtiRevisePage />
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
          path: '/profile/result',
          element: (
            <>
              <Header />
              <ResultPage />
            </>
          ),
        },
        {
          path: '/board',
          element: (
            <>
              <Header />
              <BoardPage />
            </>
          ),
        },
        {
          path: '/board/:id',
          element: (
            <>
              <Header />
              <BoardDetailPage />
            </>
          ),
        },
        {
          path: '/about',
          element: (
            <>
              <Header />
              <AboutPage />
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
