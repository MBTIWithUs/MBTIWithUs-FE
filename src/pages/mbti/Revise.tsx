import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Container, Divider, Typography } from '@mui/material';
import RadioButtonsGroup from '@components/buttons/RadioReviseButtonGroup';
import { IMbtiResult, IQuestion, IQuestionLog } from 'types';
import OverlayLoading from '@components/OverlayLoading';
import { UserStateContext } from '@contexts/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '@libs/api';
import { useRecoilState } from 'recoil';
import { questionState } from '@atoms/question';
import { toast } from 'react-toastify';

const MAX_QUESTIONS = 6;

const MbtiRevisePage = () => {
  const location = useLocation();
  const target: { id: number; target_id: number } = location.state;
  const auth = useContext(UserStateContext);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [qa, setQa] = useRecoilState(questionState);

  const getData = async () => {
    const { data: qdData } = await api.get<IQuestion[]>(
      `/api/v1/mbti/question/${target.target_id}`,
      {
        headers: {
          Authorization: `Bearer ${auth?.token?.access_token}`,
        },
      },
    );
    setQuestions(qdData);
    const { data: qaData } = await api.get<IQuestionLog[]>(
      `/api/v1/mbti/log/${target.id}`,
      {
        headers: {
          Authorization: `Bearer ${auth?.token?.access_token}`,
        },
      },
    );
    setQa(
      qaData.map((item) => ({
        id: parseInt(item.sheet_id, 10),
        score: item.score,
        score_type: item.score_type,
      })),
    );
    setLoading(false);
  };

  const onNextClick = () => {
    setPage((prev) => prev + 1);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
  };

  const onSubmit = async () => {
    try {
      const { data } = await api.put<IMbtiResult>(
        `/api/v1/mbti/result/${target.id}`,
        {
          input: qa,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token?.access_token}`,
          },
        },
      );
      if (data) {
        navigate('/profile/result', { state: data });
        toast.success('?????? ??????!');
      }
    } catch (e) {
      toast.error('?????? ??????!');
      alert(e);
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
              ?????? ?????? ??????
            </Typography>
            <Typography variant="subtitle2" py={2}>
              ????????? ????????? ???????????? ?????? ?????? ???????????? ??????????????? ???????????????.
            </Typography>
            <Typography variant="h5" fontWeight={700} py={2}>
              ?????? ????????? ????????? ?????????.
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
                // disabled={qa.length !== (page + 1) * MAX_QUESTIONS}
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

export default MbtiRevisePage;
