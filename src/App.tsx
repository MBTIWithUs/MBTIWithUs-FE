import React from 'react';
import Routes from '@routes/index';
import { RecoilRoot } from 'recoil';
import AppThemeProvider from '@contexts/AppThemeProvider';
import { SWRConfig } from 'swr';
import Test from '@pages/Test';
import Login from '@pages/Login';
import KakaoRedirect from '@pages/KakaoRedirect';
import Header from '@components/Header';
import MbtiPage from '@pages/Mbti';
import { Box } from '@mui/material';
import Footer from '@components/Footer';
import api from '@libs/api';
import { UserContextProvider } from '@contexts/UserContext';

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <SWRConfig
          value={{
            fetcher: (url: string) => api.get(url).then((res) => res.data),
          }}
        >
          <UserContextProvider>
            <AppThemeProvider>
              <Routes />
            </AppThemeProvider>
          </UserContextProvider>
        </SWRConfig>
      </RecoilRoot>
    </div>
  );
}

export default App;
