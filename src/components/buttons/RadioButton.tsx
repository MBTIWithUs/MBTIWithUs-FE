import React from 'react';
import { Radio } from '@mui/material';

enum ColorType {
  primary = 'primary',
  success = 'success',
  error = 'error',
}

const RadioButton = ({
  color,
  value,
  disabled,
  sx,
  ...rest
}: {
  color: ColorType;
  value: string;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sx?: any;
}) => {
  return (
    <Radio color={color} value={value} disabled={disabled} sx={sx} {...rest} />
  );
};

export default RadioButton;
