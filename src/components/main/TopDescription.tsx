import { Box, Container, Typography } from '@mui/material';
import React from 'react';

const TopDescription = ({
  type,
  title,
  content,
}: {
  type: string;
  title: string;
  content: string;
}) => {
  return (
    <Box sx={{ textAlign: 'center' }} mb={6}>
      <Typography color="primary" fontWeight={900} letterSpacing={5} mb={2}>
        {type}
      </Typography>
      <Typography
        fontSize={40}
        // fontFamily="CrimsonText"
        fontWeight={700}
        letterSpacing={3}
        lineHeight={1.25}
        mb={2}
      >
        {title}
      </Typography>
      <Container maxWidth="xs">
        <Typography fontSize={20}>{content}</Typography>
      </Container>
    </Box>
  );
};

export default TopDescription;
