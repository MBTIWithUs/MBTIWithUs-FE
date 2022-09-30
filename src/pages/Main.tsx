import CircleButton from '@components/buttons/CircleButton';
import {
  Box,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import React from 'react';

const Main = () => {
  return (
    <Container>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Container maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <CircleButton size="large"></CircleButton>
          <CircleButton size="medium"></CircleButton>
          <CircleButton size="small"></CircleButton>
          <CircleButton size="small"></CircleButton>
          <CircleButton size="medium"></CircleButton>
          <CircleButton size="large"></CircleButton>
        </Box>
      </Container>
    </Container>
  );
};

export default Main;
