import { Box, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <Box
      component="footer"
      bgcolor="primary.main"
      p={5}
      mt={5}
      // sx={{ position: 'absolute', left: 0, bottom: 0, width: '100vw' }}
    >
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
            © MbtiWithUs, 2022. All rights reserved.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
