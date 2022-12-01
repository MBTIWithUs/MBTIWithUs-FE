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
              color={theme.palette.primary.contrastText}
              fontWeight={900}
              sx={{ letterSpacing: 5 }}
              pb={2}
            >
              welcom
            </Typography>
            <Typography
              variant="h4"
              fontWeight={900}
              color={theme.palette.primary.contrastText}
              pb={2}
              lineHeight={1.5}
            >
              내가 생각하는 MBTI와 친구가 생각하는 MBTI를 비교해보세요!
            </Typography>
            <Typography
              variant="subtitle2"
              color={theme.palette.primary.contrastText}
              sx={{ opacity: 0.5 }}
              pb={2}
            >
              내가 생각하는 내 모습과 친구가 생각하는 내 모습을 비교해볼 수 있고
              여러분과 같은 생각을 갖고 있는 사람들과 소통하세요!
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
