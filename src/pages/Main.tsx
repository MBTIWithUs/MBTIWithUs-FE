import Banner from '@components/main/Banner';
import CardGroup from '@components/main/CardGroup';
import TopDescription from '@components/main/TopDescription';
import { Container } from '@mui/material';
import React from 'react';

const Main = () => {
  return (
    <div>
      <Banner />
      <Container sx={{ py: 3 }}>
        <TopDescription
          type="TYPES"
          title="Our Talents"
          content="Lorem ipsum, dolor sit amet consectetur Suscipit nemo hic quos, ab,"
        />
        <CardGroup />
      </Container>
    </div>
  );
};

export default Main;
