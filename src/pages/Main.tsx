import Banner from '@components/main/Banner';
import CardGroup from '@components/main/CardGroup';
import IntroSection from '@components/main/IntroSection';
import Partners from '@components/main/Partners';
import { Container } from '@mui/material';
import React from 'react';

const Main = () => {
  return (
    <div>
      <Banner />
      <Container sx={{ py: 3 }}>
        <Partners />
        <IntroSection />
        <CardGroup />
      </Container>
    </div>
  );
};

export default Main;
