import Banner from '@components/main/Banner';
import CardGroup from '@components/main/CardGroup';
import Partners from '@components/main/Partners';
import TopDescription from '@components/main/TopDescription';
import { Container } from '@mui/material';
import React from 'react';

const Main = () => {
  return (
    <div>
      <Banner />
      <Container sx={{ py: 3 }}>
        <Partners />
        <CardGroup />
      </Container>
    </div>
  );
};

export default Main;
