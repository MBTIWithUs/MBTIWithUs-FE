import { questionState } from '@atoms/question';
import {
  Chip,
  FormControl,
  FormLabel,
  Paper,
  RadioGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { IQuestionAnswer } from 'types';
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

const DEFAULTBUTTON: {
  value: string;
  color: ColorType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sx?: any;
}[] = [
  {
    value: '-3',
    color: ColorType.primary,
    sx: {
      '& .MuiSvgIcon-root': {
        fontSize: { xs: 25, sm: 40, md: 50 },
      },
    },
  },
  {
    value: '-2',
    color: ColorType.primary,
    sx: {
      '& .MuiSvgIcon-root': {
        fontSize: { xs: 22, sm: 35, md: 40 },
      },
    },
  },
  {
    value: '-1',
    color: ColorType.primary,
    sx: {
      '& .MuiSvgIcon-root': {
        fontSize: { xs: 20, sm: 30, md: 30 },
      },
    },
  },
  {
    value: '1',
    color: ColorType.primary,
    sx: {
      '& .MuiSvgIcon-root': {
        fontSize: { xs: 20, sm: 30, md: 30 },
      },
    },
  },
  {
    value: '2',
    color: ColorType.primary,
    sx: {
      '& .MuiSvgIcon-root': {
        fontSize: { xs: 22, sm: 35, md: 40 },
      },
    },
  },
  {
    value: '3',
    color: ColorType.primary,
    sx: {
      '& .MuiSvgIcon-root': {
        fontSize: { xs: 25, sm: 40, md: 50 },
      },
    },
  },
];

const RadioButtonsGroup = ({
  index,
  title,
  leftQuestion,
  rightQuestion,
  id,
}: {
  id: number;
  index: number;
  title: string;
  leftQuestion: string;
  rightQuestion: string;
}) => {
  const [qa, setQa] = useRecoilState(questionState);
  const [value, setValue] = useState('');
  const [left, setLeft] = useState<ChipColorType>(ChipColorType.default);
  const [right, setRight] = useState<ChipColorType>(ChipColorType.default);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = (event.target as HTMLInputElement).value;
    setValue(val);
    const fi = qa.findIndex((item) => item.id === id);
    const tmp: IQuestionAnswer = {
      id,
      score: Math.abs(parseInt(val, 10)),
      score_type: '',
    };

    if (parseInt(val, 10) < 0) {
      setLeft(ChipColorType.primary);
      setRight(ChipColorType.default);
      tmp.score_type = 'left';
    } else {
      setRight(ChipColorType.primary);
      setLeft(ChipColorType.default);
      tmp.score_type = 'right';
    }

    if (fi === -1) {
      setQa([...qa, tmp]);
    } else {
      const arr = [...qa];
      arr.splice(fi, 1);
      setQa([...arr, tmp]);
    }
  };

  console.log(theme.breakpoints.up('xs'));

  return (
    <Paper sx={{ my: 2, p: 2, boxShadow: 0 }}>
      <FormControl fullWidth>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
          Q{index + 1}.
        </Typography>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          {title}
        </Typography>
        <FormLabel>
          <Chip
            label={leftQuestion}
            color={left}
            size={isXs ? 'small' : undefined}
            sx={{
              fontSize: {
                xs: 10,
                sm: 12,
                md: 14,
              },
            }}
          />
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
          <Chip
            label={rightQuestion}
            color={right}
            size={isXs ? 'small' : undefined}
            sx={{
              fontSize: {
                xs: 10,
                sm: 12,
                md: 14,
              },
            }}
          />
        </FormLabel>
      </FormControl>
    </Paper>
  );
};

export default RadioButtonsGroup;
