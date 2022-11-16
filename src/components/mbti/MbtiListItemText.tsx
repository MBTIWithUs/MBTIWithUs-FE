import { getMomentFromNow } from '@libs/time';
import { Box, Typography } from '@mui/material';
import React from 'react';

const MbtiListItemText = ({ label, date }: { label: string; date: string }) => {
  return (
    <Box>
      <Typography fontWeight={700}>{label}</Typography>
      <Typography>{getMomentFromNow(date).toString()}</Typography>
    </Box>
  );
};

export default MbtiListItemText;
