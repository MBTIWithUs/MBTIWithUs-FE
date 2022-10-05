import { Box, LinearProgress, Typography } from '@mui/material';
import React from 'react';

interface IProps {
  leftScore: number;
  rightScore: number;
  leftName: string;
  rightName: string;
  leftLabel: string;
  rightLabel: string;
}
const ProgressRow = ({
  leftScore,
  rightScore,
  leftName,
  rightName,
  leftLabel,
  rightLabel,
}: IProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-bewteen',
        alignItems: 'center',
      }}
      py={2}
    >
      <Box textAlign="center">
        <Typography fontWeight={900} fontSize={24}>
          {leftName}
        </Typography>
        <Typography fontWeight={900}>{leftLabel}</Typography>
      </Box>
      <Box sx={{ width: '80%' }} px={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-bewteen' }}>
          <Typography mr="auto" fontWeight={700} fontSize={14}>
            {Math.round((leftScore / (leftScore + rightScore)) * 100)}%
          </Typography>
          <Typography ml="auto" fontWeight={700} fontSize={14}>
            {Math.round((rightScore / (leftScore + rightScore)) * 100)}%
          </Typography>
        </Box>
        <LinearProgress
          value={
            leftScore > rightScore
              ? (leftScore / (leftScore + rightScore)) * 100
              : (rightScore / (leftScore + rightScore)) * 100
          }
          variant="determinate"
          sx={{
            transform: `rotate(${leftScore <= rightScore ? 180 : 0}deg)`,
            height: 15,
            borderRadius: 10,
          }}
        />
      </Box>
      <Box textAlign="center">
        <Typography fontWeight={900} fontSize={24}>
          {rightName}
        </Typography>
        <Typography fontWeight={900}>{rightLabel}</Typography>
      </Box>
    </Box>
  );
};

export default ProgressRow;
