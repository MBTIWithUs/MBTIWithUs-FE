import ProgressRow from '@components/mbti/ProgressRow';
import { UserStateContext } from '@contexts/UserContext';
import { Avatar, Box, Container, Divider, Typography } from '@mui/material';
import LinkMui from '@mui/material/Link';
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { IMbtiResult } from 'types';
import { getMbtiResult2String } from '@libs/mbti';

const ResultPage = () => {
  const location = useLocation();
  const result: IMbtiResult = location.state;
  const auth = useContext(UserStateContext);

  const mbti = getMbtiResult2String(result);

  return (
    <Container sx={{ py: 3 }}>
      <Container maxWidth="sm">
        <Box py={3}>
          <Typography fontSize={25} fontWeight={700} mb={5}>
            친구들과 함께
            <Typography
              component="span"
              fontSize={30}
              fontWeight={700}
              fontFamily={'Kanit'}
              mx={1}
              // color="primary"
            >
              MBTI
            </Typography>
            결과를 확인해보세요!
          </Typography>
          <Avatar
            src={auth?.user?.profile_image_url}
            sx={{ width: 80, height: 80 }}
          />
          <Typography fontWeight={700} mt={5}>
            {result.writer_id === result.target_id
              ? `${result.target_nickname}님의 결과는`
              : `${result.writer_nickname}님이 작성한 ${result.target_nickname}님의 결과는`}
            <Typography
              fontSize={30}
              fontWeight={900}
              component="span"
              ml={1}
              mr={1}
              color="primary"
              fontFamily={'Kanit'}
            >
              {mbti}
            </Typography>
            입니다
          </Typography>
          <LinkMui
            target="_blank"
            underline="none"
            href={`https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-${mbti}`}
          >
            <Typography
              fontWeight={700}
              fontFamily="Kanit"
              component="span"
              mr={1}
              fontSize={20}
            >
              {mbti}
            </Typography>
            성격 확인하기
          </LinkMui>
        </Box>
        <Divider />
        <Box textAlign="center" mx="auto" py={3}>
          <ProgressRow
            leftScore={result.e_score}
            leftName="E"
            leftLabel="외향형"
            rightScore={result.i_score}
            rightName="I"
            rightLabel="내향형"
          />
          <ProgressRow
            leftScore={result.s_score}
            leftName="S"
            leftLabel="현실형"
            rightScore={result.n_score}
            rightName="N"
            rightLabel="직관형"
          />
          <ProgressRow
            leftScore={result.t_score}
            leftName="T"
            leftLabel="사고형"
            rightScore={result.f_score}
            rightName="F"
            rightLabel="감정형"
          />
          <ProgressRow
            leftScore={result.p_score}
            leftName="P"
            leftLabel="인식형"
            rightScore={result.j_score}
            rightName="J"
            rightLabel="계획형"
          />
        </Box>
        <Divider />
      </Container>
    </Container>
  );
};

export default ResultPage;
