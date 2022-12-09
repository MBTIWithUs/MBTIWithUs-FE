import Banner from '@components/main/Banner';
import CardGroup from '@components/main/CardGroup';
import IntroSection from '@components/main/IntroSection';
import Partners from '@components/main/Partners';
import SEO from '@components/SEO';
import { Container } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';

const Main = () => {
  const location = useLocation();
  return (
    <div>
      <SEO
        title="Welcome MBTIWithUs!"
        description="다양한 mbti를 만나보세요!"
        url={location?.pathname}
      />
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
