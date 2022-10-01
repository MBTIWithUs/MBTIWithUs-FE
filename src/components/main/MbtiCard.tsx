import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import React from 'react';

const MbtiCard = ({
  title,
  src,
  content,
}: {
  title: string;
  src: string;
  content: string;
}) => {
  return (
    <Grid item md={3}>
      <Card sx={{ boxShadow: 5 }}>
        <CardActionArea sx={{ p: 2 }}>
          <CardMedia
            component="img"
            image={src}
            alt={title + 'image'}
            sx={{ border: '2px solid black', borderRadius: '50%' }}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              fontWeight={700}
              letterSpacing={5}
            >
              {title}
            </Typography>
            <Typography
              fontWeight={500}
              variant="body2"
              color="text.secondary"
              minHeight={50}
            >
              {content}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default MbtiCard;
