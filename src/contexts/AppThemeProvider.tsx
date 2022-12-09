import React, { ReactElement, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { appThemeMode } from '@atoms/theme';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

interface Props {
  children: ReactElement;
}

function AppThemeProvider({ children }: Props): ReactElement {
  const mode = useRecoilValue(appThemeMode);
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          // primary: {
          //   main: '#845EC2',
          // },
          // secondary: {
          //   main: '#F3C5FF',
          // },
        },
        // typography: {
        //   fontFamily: ['WorkSans-Regular'].join(','),
        // },
        typography: {
          fontFamily: [
            'Pretendard',
            '-apple-system',
            'BlinkMacSystemFont',
            'system-ui',
            'Roboto',
            'Helvetica Neue',
            'Segoe UI',
            'Apple SD Gothic Neo',
            'Noto Sans KR',
            'Malgun Gothic',
            'Apple Color Emoji',
            'Segoe UI Emoji',
            'Segoe UI Symbol',
            'sans-serif',
          ].join(','),
        },
      }),
    [mode],
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
      <ToastContainer autoClose={1000} theme={mode} position="bottom-right" />
    </ThemeProvider>
  );
}

export default AppThemeProvider;
