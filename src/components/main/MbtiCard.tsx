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
    <Grid item xs={12} sm={4} md={4}>
      <Card sx={{ boxShadow: 5 }}>
        <CardActionArea sx={{ p: 2 }}>
          <CardMedia
            component="img"
            image={src}
            alt={title + 'image'}
            sx={{ borderRadius: '50%' }}
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
              sx={{ opacity: 0.7 }}
              color="text.secondary"
              minHeight={70}
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
