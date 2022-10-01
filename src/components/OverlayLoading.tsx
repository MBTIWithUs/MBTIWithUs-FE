import { Box, CircularProgress, Modal } from '@mui/material';
import React from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

const OverlayLoading = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Modal open={isLoading}>
      <Box sx={style}>
        <CircularProgress size="5em" />
      </Box>
    </Modal>
  );
};

export default OverlayLoading;
