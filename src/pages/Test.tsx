import { appThemeMode } from '@atoms/theme';
import { AppBar, Button } from '@mui/material';
import React from 'react';
import { useRecoilState } from 'recoil';

const Test = () => {
  const [mode, setMode] = useRecoilState(appThemeMode);
  // const user = useUser();

  const toggleMode = () => {
    setMode((prevState) => (prevState === 'light' ? 'dark' : 'light'));
  };
  return (
    <div>
      <div>
        <AppBar>
          test {mode}
          <Button onClick={toggleMode} variant="contained">
            click
          </Button>
        </AppBar>
      </div>
    </div>
  );
};

export default Test;
