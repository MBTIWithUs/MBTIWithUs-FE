import { AppBar, Box, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import Logo from '@assets/logo.png';

const Footer = () => {
  return (
    <AppBar
      position="static"
      sx={{ top: 'auto', bottom: 0 }}
      component="footer"
    >
      <Box p={5}>
        <Grid container rowSpacing={2}>
          <Grid
            item
            xs={12}
            sm={6}
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
            <img
              src={Logo}
              style={{
                verticalAlign: 'middle',
                marginRight: 10,
                height: 14,
              }}
            />
            <Typography component="span">MbtiWithUs, umtuk ha4219</Typography>
          </Grid>
        </Grid>
      </Box>
    </AppBar>
  );
};

export default Footer;
