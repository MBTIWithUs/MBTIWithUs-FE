import React from 'react';
import TopDescription from './TopDescription';
import google from '@assets/google.png';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';

const Partners = () => {
  const theme = useTheme();
  return (
    <Box pb={10}>
      <TopDescription
        type="PARTNERS"
        title="Lorem Ipsum Dolor"
        content="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
      />
      <Grid container rowSpacing={3} mb={5}>
        <Grid item xs={6} sm={6} md={3} sx={{ textAlign: 'center' }}>
          <img src={google} />
        </Grid>
        <Grid item xs={6} sm={6} md={3} sx={{ textAlign: 'center' }}>
          <img src={google} />
        </Grid>
        <Grid item xs={6} sm={6} md={3} sx={{ textAlign: 'center' }}>
          <img src={google} />
        </Grid>
        <Grid item xs={6} sm={6} md={3} sx={{ textAlign: 'center' }}>
          <img src={google} />
        </Grid>
      </Grid>
      <Box textAlign="center">
        <Button
          sx={{
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            boxShadow: 0,
            width: 170,
            textTransform: 'none',
          }}
          variant="contained"
          LinkComponent="a"
          href="/mbti"
        >
          <Typography fontWeight={500}>Learn More</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Partners;
