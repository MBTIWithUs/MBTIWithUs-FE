import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Divider } from '@mui/material';
import RadioButtonsGroup from '@components/buttons/RadioButtonGroup';
import { getQuestion } from '@mock/data';
import { IQuestion } from 'types';

const MAX_QUESTIONS = 6;

const MbtiPage = () => {
  const [page, setPage] = useState(0);
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const getData = async () => {
    const data: IQuestion[] = await getQuestion();

    setQuestions(data);
  };

  const onNextClick = () => {
    setPage((prev) => prev + 1);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container maxWidth="md">
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
  );
};

export default MbtiPage;
