import React from 'react';
import { Button, Fab } from '@mui/material';
import styled from '@emotion/styled';

const CustomButton = styled(Fab)`
  // background-color: inherit;
  // box-shadow: none;
  // border: solid 1px red;
`;

const CircleButton = ({ ...props }) => {
  return <CustomButton {...props}></CustomButton>;
};

export default CircleButton;
