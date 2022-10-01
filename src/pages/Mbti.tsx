import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Divider, Typography } from '@mui/material';
import RadioButtonsGroup from '@components/buttons/RadioButtonGroup';
import { getQuestion } from '@mock/data';
import { IQuestion } from 'types';
import OverlayLoading from '@components/OverlayLoading';

const MAX_QUESTIONS = 6;

const MbtiPage = () => {
  const [page, setPage] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const getData = async () => {
    const data: IQuestion[] = await getQuestion();

    setQuestions(data);
    setLoading(false);
  };

  const onNextClick = () => {
    setPage((prev) => prev + 1);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <OverlayLoading isLoading />
      ) : (
        <Container maxWidth="md">
          <Box>
            <Typography variant="h5" fontWeight={900}>
              성격 유형 퀴즈
            </Typography>
            <Typography variant="subtitle2">성격 유형 퀴즈</Typography>
          </Box>
          <Divider />
          {questions
            .slice(page * MAX_QUESTIONS, (page + 1) * MAX_QUESTIONS)
            .map((item, index) => (
              <RadioButtonsGroup
                key={item.question}
                index={page * MAX_QUESTIONS + index}
                title={item.question}
                leftQuestion={item.left_answer}
                rightQuestion={item.right_answer}
              />
            ))}
          <Divider />
          <Box sx={{ textAlign: 'center' }} mt={2}>
            {page < Math.floor(questions.length / MAX_QUESTIONS) - 1 ? (
              <Button variant="contained" size="large" onClick={onNextClick}>
                NEXT
              </Button>
            ) : (
              <Button variant="contained" size="large">
                SUBMIT
              </Button>
            )}
          </Box>
        </Container>
      )}
    </Container>
  );
};

export default MbtiPage;
