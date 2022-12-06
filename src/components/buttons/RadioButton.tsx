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
  ...rest
}: {
  color: ColorType;
  value: string;
  disabled?: boolean;
}) => {
  return <Radio color={color} value={value} disabled={disabled} {...rest} />;
};

export default RadioButton;
