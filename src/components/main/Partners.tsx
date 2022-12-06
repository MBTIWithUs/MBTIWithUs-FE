import React from 'react';
import TopDescription from './TopDescription';
// import google from '@assets/google.png';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';

const Partners = () => {
  const theme = useTheme();
  return (
    <Box pb={10}>
      <TopDescription type="Korean MBTI Top 4" title="" content="" />
      <Grid container rowSpacing={3} mb={5}>
        <Grid item xs={6} sm={6} md={3} sx={{ textAlign: 'center' }}>
          {/* <img src={google} /> */}
          <Typography
            fontSize={30}
            fontWeight={900}
            ml={1}
            mr={1}
            // color="primary"
            fontFamily={'Kanit'}
          >
            ISTJ
          </Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={3} sx={{ textAlign: 'center' }}>
          {/* <img src={google} /> */}
          <Typography
            fontSize={30}
            fontWeight={900}
            ml={1}
            mr={1}
            // color="primary"
            fontFamily={'Kanit'}
          >
            ESTJ
          </Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={3} sx={{ textAlign: 'center' }}>
          {/* <img src={google} /> */}
          <Typography
            fontSize={30}
            fontWeight={900}
            ml={1}
            mr={1}
            // color="primary"
            fontFamily={'Kanit'}
          >
            ISTP
          </Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={3} sx={{ textAlign: 'center' }}>
          {/* <img src={google} /> */}
          <Typography
            fontSize={30}
            fontWeight={900}
            ml={1}
            mr={1}
            // color="primary"
            fontFamily={'Kanit'}
          >
            ISFJ
          </Typography>
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
          href="https://m.blog.naver.com/taxandlove/221988052765"
        >
          <Typography fontWeight={500}>Learn More</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Partners;
