import React from 'react';
import Routes from '@routes/index';
import { RecoilRoot } from 'recoil';
import AppThemeProvider from '@contexts/AppThemeProvider';

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <AppThemeProvider>
          <Routes />
        </AppThemeProvider>
      </RecoilRoot>
    </div>
  );
}

export default App;
