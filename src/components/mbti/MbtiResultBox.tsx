import React from 'react';
import { Box, Typography } from '@mui/material';

const MbtiResultBox = ({ label, mbti }: { label: string; mbti: string }) => {
  return (
    <Box textAlign="center">
      <Typography ml={1} mr={1} fontFamily={'Kanit'}>
        {label}
      </Typography>
      <Typography
        fontSize={30}
        fontWeight={900}
        ml={1}
        mr={1}
        color="primary"
        fontFamily={'Kanit'}
      >
        {mbti}
      </Typography>
    </Box>
  );
};

export default MbtiResultBox;
