import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Container, Divider, Typography } from '@mui/material';
import RadioButtonsGroup from '@components/buttons/RadioButtonGroup';
import { IMbtiResult, IQuestion } from 'types';
import OverlayLoading from '@components/OverlayLoading';
import { UserStateContext } from '@contexts/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '@libs/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { questionState } from '@atoms/question';
import { callbackState } from '@atoms/util';
import { toast } from 'react-toastify';

const MAX_QUESTIONS = 6;

const MbtiSelfPage = () => {
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const target_id = search.get('target_id');
  const [, setCallbackUrl] = useRecoilState(callbackState);

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
      const { data } = await api.post<IMbtiResult>(
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
        navigate('/profile/result', { state: data });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (auth?.userLoading) {
      return;
    }

    if (!auth?.token) {
      toast.info('???????????? ???????????????');
      setCallbackUrl(location.pathname + location.search);
      navigate(`/login`);
    }
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
