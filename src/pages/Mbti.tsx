import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import RadioButtonsGroup from '@components/buttons/RadioButtonGroup';
import { getQuestion } from '@mock/data';
import { IQuestion } from 'types';

const MbtiPage = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const getData = async () => {
    const data: IQuestion[] = await getQuestion();
    setQuestions(data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      {questions.map((item, index) => (
        <RadioButtonsGroup
          key={item.question}
          index={index}
          title={item.question}
          leftQuestion={item.left_answer}
          rightQuestion={item.right_answer}
        />
      ))}
    </Container>
  );
};

export default MbtiPage;
