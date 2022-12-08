import React from 'react';
import { Box, Typography } from '@mui/material';

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        textAlign: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '70vh',
        maxHeight: '100vh',
      }}
    >
      <Box>
        <Typography sx={{ display: 'inline-block' }}>404</Typography>
        <Box
          sx={{
            display: 'inline-block',
            ml: 2,
            borderLeft: '1px solid',
            pl: 2,
          }}
        >
          <Typography>This page could not be found</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default NotFound;
