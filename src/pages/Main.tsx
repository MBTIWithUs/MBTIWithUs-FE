import Banner from '@components/main/Banner';
import CardGroup from '@components/main/CardGroup';
import { Container } from '@mui/material';
import React from 'react';

const Main = () => {
  return (
    <div>
      <Banner />
      <Container>
        <CardGroup />
      </Container>
    </div>
  );
};

export default Main;
