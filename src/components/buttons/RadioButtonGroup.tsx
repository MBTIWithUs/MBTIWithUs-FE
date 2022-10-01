import {
  Box,
  Chip,
  FormControl,
  FormLabel,
  RadioGroup,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import RadioButton from './RadioButton';

enum ColorType {
  primary = 'primary',
  success = 'success',
  error = 'error',
}

enum ChipColorType {
  default = 'default',
  primary = 'primary',
}

const DEFAULTBUTTON: { value: string; color: ColorType; fontSize: number }[] = [
  {
    value: '-3',
    color: ColorType.primary,
    fontSize: 50,
  },
  {
    value: '-2',
    color: ColorType.primary,
    fontSize: 40,
  },
  {
    value: '-1',
    color: ColorType.primary,
    fontSize: 30,
  },
  {
    value: '1',
    color: ColorType.primary,
    fontSize: 30,
  },
  {
    value: '2',
    color: ColorType.primary,
    fontSize: 40,
  },
  {
    value: '3',
    color: ColorType.primary,
    fontSize: 50,
  },
];

const RadioButtonsGroup = ({
  index,
  title,
  leftQuestion,
  rightQuestion,
}: {
  index: number;
  title: string;
  leftQuestion: string;
  rightQuestion: string;
}) => {
  const [value, setValue] = useState('');
  const [left, setLeft] = useState<ChipColorType>(ChipColorType.default);
  const [right, setRight] = useState<ChipColorType>(ChipColorType.default);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = (event.target as HTMLInputElement).value;
    setValue(val);
    if (parseInt(val, 10) < 0) {
      setLeft(ChipColorType.primary);
      setRight(ChipColorType.default);
    } else {
      setRight(ChipColorType.primary);
      setLeft(ChipColorType.default);
    }
  };

  return (
    <Box my={2}>
      <FormControl fullWidth>
        <Typography variant="h6" fontWeight={900} sx={{ mb: 2 }}>
          Q{index + 1}.
        </Typography>
        <Typography variant="h6" fontWeight={900} sx={{ mb: 2 }}>
          {title}
        </Typography>
        <FormLabel>
          <Chip label={leftQuestion} color={left} />
        </FormLabel>
        <RadioGroup
          row
          value={value}
          onChange={handleChange}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          {DEFAULTBUTTON.map((item) => (
            <RadioButton key={item.value} {...item} />
          ))}
        </RadioGroup>
        <FormLabel sx={{ textAlign: 'right' }}>
          <Chip label={rightQuestion} color={right} />
        </FormLabel>
      </FormControl>
    </Box>
  );
};

export default RadioButtonsGroup;
