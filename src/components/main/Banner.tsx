import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import BannerImg from '@assets/banner.png';

const Banner = () => {
  const theme = useTheme();
  return (
    <Box bgcolor={theme.palette.primary.main}>
      <Container>
        <Grid container py={10}>
          <Grid item xs={12} sm={12} md={6} order={{ xs: 2, sm: 2, md: 1 }}>
            <Typography
              color={theme.palette.common.white}
              fontWeight={700}
              sx={{ letterSpacing: 5 }}
              pb={2}
            >
              welcom
            </Typography>
            <Typography
              variant="h4"
              fontWeight={900}
              color={theme.palette.common.white}
              pb={2}
              lineHeight={1.5}
            >
              Lorem ipsum dolor sit amet consectetur
            </Typography>
            <Typography
              variant="subtitle2"
              color={theme.palette.common.white}
              sx={{ opacity: 0.5 }}
              pb={2}
            >
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit
              nemo hic quos, ab, dolor aperiam nobis cum est eos error ipsum,
              voluptate culpa nesciunt delectus iste?
            </Typography>
            <Button
              sx={{
                bgcolor: theme.palette.common.white,
                color: theme.palette.common.black,
                boxShadow: 0,
                width: 170,
                textTransform: 'none',
              }}
              variant="contained"
              LinkComponent="a"
              href="/mbti"
            >
              <Typography fontWeight={500}>Explore</Typography>
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            order={{ xs: 1, sm: 1, md: 2 }}
            mb={{ xs: 5, sm: 5, md: 0 }}
          >
            <img src={BannerImg} alt="banner image" style={{ width: '100%' }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Banner;
