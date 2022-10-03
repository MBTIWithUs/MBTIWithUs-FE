import { UserStateContext } from '@contexts/UserContext';
import { Container } from '@mui/material';
import React, { useContext } from 'react';

const Test = () => {
  const auth = useContext(UserStateContext);
  console.log(auth);

  return <Container>test {auth?.user && 1}</Container>;
};

export default Test;
