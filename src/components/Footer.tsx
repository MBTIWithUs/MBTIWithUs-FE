import { Box, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <Box component="footer" bgcolor="primary.main" p={5} mt={5}>
      <Grid container rowSpacing={2}>
        <Grid
          item
          xs={12}
          sm={6}
          color={'primary.contrastText'}
          sx={{
            textAlign: {
              xs: 'center',
              sm: 'left',
            },
          }}
        >
          <IconButton
            color="inherit"
            LinkComponent="a"
            href="https://github.com/MBTIWithUs"
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            color="inherit"
            LinkComponent="a"
            href="https://github.com/MBTIWithUs"
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            color="inherit"
            LinkComponent="a"
            href="https://github.com/MBTIWithUs"
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            color="inherit"
            LinkComponent="a"
            href="https://github.com/MBTIWithUs"
          >
            <YouTubeIcon />
          </IconButton>
          <IconButton
            color="inherit"
            LinkComponent="a"
            href="https://github.com/MBTIWithUs"
          >
            <GitHubIcon />
          </IconButton>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            textAlign: {
              xs: 'center',
              sm: 'right',
            },
            m: 'auto',
          }}
        >
          <Typography color="primary.contrastText">
            © Start, 2022. All rights reserved.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
