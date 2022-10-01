import React from 'react';
import { Radio } from '@mui/material';

enum ColorType {
  primary = 'primary',
  success = 'success',
  error = 'error',
}

const RadioButton = ({
  fontSize,
  color,
  value,
  disabled,
  ...rest
}: {
  fontSize: number;
  color: ColorType;
  value: string;
  disabled?: boolean;
}) => {
  return (
    <Radio
      sx={{
        '& .MuiSvgIcon-root': {
          fontSize: fontSize,
        },
      }}
      color={color}
      value={value}
      disabled={disabled}
      {...rest}
    />
  );
};

export default RadioButton;
