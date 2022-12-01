import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import React from 'react';
import MainLeft from '@assets/mainLeft.png';
import MainRight from '@assets/mainRight.png';

const IntroSection = () => {
  const theme = useTheme();
  return (
    <Box mb={10}>
      <Grid container columnSpacing={5} sx={{ mb: 10 }}>
        <Grid item xs={12} sm={12} md={6} order={{ xs: 1, sm: 1, md: 1 }}>
          <img src={MainLeft} style={{ width: '100%' }} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          order={{ xs: 2, sm: 2, md: 2 }}
          sx={{ pt: 10 }}
        >
          <Typography
            fontSize={40}
            // fontFamily="CrimsonText"
            fontWeight={700}
            letterSpacing={3}
            lineHeight={1.25}
            mb={2}
          >
            당신을 소개해보세요!
          </Typography>
          <Typography sx={{ opacity: 0.5 }} mb={2}>
            {/* Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit
            nemo hic quos, ab, dolor aperiam nobis cum est eos error ipsum,
            voluptate culpa nesciunt delectus iste? */}
            서로 같은 유형 또는 다른 유형의 사람들과 커뮤니티를 즐기면서 여러
            사람들을 만나보세요!
          </Typography>
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
            href="/board"
          >
            <Typography fontWeight={500}>Learn More</Typography>
          </Button>
        </Grid>
      </Grid>
      <Grid container columnSpacing={5} sx={{ mb: 10 }}>
        <Grid item xs={12} sm={12} md={6} order={{ xs: 1, sm: 1, md: 2 }}>
          <img src={MainRight} style={{ width: '100%' }} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          order={{ xs: 2, sm: 2, md: 1 }}
          sx={{ pt: 10 }}
        >
          <Typography
            fontSize={40}
            // fontFamily="CrimsonText"
            fontWeight={700}
            letterSpacing={3}
            lineHeight={1.25}
            mb={2}
          >
            {/* Lorem ipsum dolor sit amet consectetur */}
            새로운 방법의 MBTI 결과를 확인하세요!
          </Typography>
          <Typography sx={{ opacity: 0.5 }} mb={2}>
            {/* Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit
            nemo hic quos, ab, dolor aperiam nobis cum est eos error ipsum,
            voluptate culpa nesciunt delectus iste? */}
            여러분이 생각하는 자신과 타인이 생각하는 자신이 어떻게 다른지
            확인하고 이를 종합한 결과를 확인할 수 있습니다.
          </Typography>
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
            href="/profile"
          >
            <Typography fontWeight={500}>Learn More</Typography>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default IntroSection;
