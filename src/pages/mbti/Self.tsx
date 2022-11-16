import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Container, Divider, Typography } from '@mui/material';
import RadioButtonsGroup from '@components/buttons/RadioButtonGroup';
import { IQuestion } from 'types';
import OverlayLoading from '@components/OverlayLoading';
import { UserStateContext } from '@contexts/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '@libs/api';
import { useRecoilValue } from 'recoil';
import { questionState } from '@atoms/question';

const MAX_QUESTIONS = 6;

const MbtiSelfPage = () => {
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const target_id = search.get('target_id');

  const auth = useContext(UserStateContext);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const qa = useRecoilValue(questionState);

  const getData = async () => {
    const { data } = await api.get<IQuestion[]>(
      `/api/v1/mbti/question/${
        target_id !== null ? target_id : auth?.user?.id
      }`,
      {
        headers: {
          Authorization: `Bearer ${auth?.token?.access_token}`,
        },
      },
    );
    setQuestions(data);
    setLoading(false);
  };

  const onNextClick = () => {
    setPage((prev) => prev + 1);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
  };

  const onSubmit = async () => {
    try {
      const { data } = await api.post(
        `/api/v1/mbti/result`,
        {
          target_id: target_id !== null ? target_id : auth?.user?.id,
          input: qa,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token?.access_token}`,
          },
        },
      );
      if (data) {
        navigate('/profile');
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (!auth?.user) {
    navigate('/login');
  }

  useEffect(() => {
    if (auth?.user) getData();
  }, [auth]);

  return (
    <Container sx={{ py: 3 }}>
      {isLoading ? (
        <OverlayLoading isLoading />
      ) : (
        <Container maxWidth="md">
          <Box>
            <Typography variant="h5" fontWeight={700} py={1}>
              성격 유형 퀴즈
            </Typography>
            <Typography variant="subtitle2" py={2}>
              퀴즈를 만들고 친구들이 나를 어떤 유형으로 생각하는지 알아보세요.
            </Typography>
            <Typography variant="h5" fontWeight={700} py={2}>
              다음 질문에 응답해 주세요.
            </Typography>
            <Typography variant="subtitle2" py={2} fontWeight={700}>
              {page + 1} / {Math.ceil(questions.length / MAX_QUESTIONS)}
            </Typography>
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
                id={item.id}
              />
            ))}
          <Divider />
          <Box sx={{ textAlign: 'center' }} mt={2}>
            {page < Math.ceil(questions.length / MAX_QUESTIONS) - 1 ? (
              <Button
                variant="contained"
                size="large"
                onClick={onNextClick}
                sx={{ width: 170 }}
                disabled={qa.length !== (page + 1) * MAX_QUESTIONS}
              >
                NEXT
              </Button>
            ) : (
              <Button
                variant="contained"
                size="large"
                sx={{ width: 170 }}
                onClick={onSubmit}
                disabled={qa.length !== (page + 1) * MAX_QUESTIONS}
              >
                SUBMIT
              </Button>
            )}
          </Box>
        </Container>
      )}
    </Container>
  );
};

export default MbtiSelfPage;
