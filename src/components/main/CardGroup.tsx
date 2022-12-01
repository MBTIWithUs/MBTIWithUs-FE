import { Box, Grid, Pagination } from '@mui/material';
import React, { useState } from 'react';
import MbtiCard from './MbtiCard';
import TopDescription from './TopDescription';

const DATA = [
  {
    title: 'INTJ',
    src: 'https://static.neris-assets.com/images/personality-types/avatars/faces/intj-architect-s3-v8-male.svg?v=1',
    content: '용의주도한 전략가, 과학자형',
  },
  {
    title: 'INTP',
    src: 'https://static.neris-assets.com/images/personality-types/avatars/faces/intp-logician-s3-v1-female.svg?v=1',
    content: '논리적인 사색가, 논리술사',
  },

  {
    title: 'ENTJ',
    src: 'https://static.neris-assets.com/images/personality-types/avatars/faces/entj-commander-s3-v1-female.svg?v=1',
    content: '대담한 통솔자, 지도자형',
  },
  {
    title: 'ENTP',
    src: 'https://static.neris-assets.com/images/personality-types/avatars/faces/entp-debater-s3-v1-male.svg?v=1',
    content: '뜨거운 논쟁을 즐기는 변론가, 발명가형',
  },
  {
    title: 'INFJ',
    src: 'https://static.neris-assets.com/images/personality-types/avatars/faces/infj-advocate-s3-v1-male.svg?v=1',
    content: '통찰력 있는 선지자, 예언자형',
  },
  {
    title: 'INFP',
    src: 'https://static.neris-assets.com/images/personality-types/avatars/faces/infp-mediator-s1-v1-female.svg?v=1',
    content: '중재자, 잔 다르크형',
  },
  {
    title: 'ENFJ',
    src: 'https://static.neris-assets.com/images/personality-types/avatars/faces/enfj-protagonist-s3-v1-male.svg?v=1',
    content: '선도자, 언변능숙형',
  },
  {
    title: 'ENFP',
    src: 'https://static.neris-assets.com/images/personality-types/avatars/faces/enfp-campaigner-s3-v1-female.svg?v=1',
    content: '재기발랄한 활동가, 스파크형',
  },
  {
    title: 'ISTJ',
    src: 'https://static.neris-assets.com/images/personality-types/avatars/faces/istj-logistician-s3-v1-male.svg?v=1',
    content: '청렴결백한 논리주의자, 현실주의자',
  },
  {
    title: 'ISFJ',
    src: 'https://static.neris-assets.com/images/personality-types/avatars/faces/isfj-defender-s3-v1-female.svg?v=1',
    content: '만능 재주꾼, 장인',
  },
  {
    title: 'ESTJ',
    src: 'https://static.neris-assets.com/images/personality-types/avatars/faces/estj-executive-s3-v1-female.svg?v=1',
    content: '엄격한 관리자, 경영자',
  },
  {
    title: 'ESFJ',
    src: 'https://static.neris-assets.com/images/personality-types/avatars/faces/esfj-consul-s3-v1-male.svg?v=1',
    content: '사교적인 외교관, 친선도모형',
  },

  {
    title: 'ISTP',
    src: 'https://static.neris-assets.com/images/personality-types/avatars/faces/istp-virtuoso-s3-v1-male.svg?v=1',
    content: '만능 재주꾼, 장인',
  },
  {
    title: 'ISFP',
    src: 'https://static.neris-assets.com/images/personality-types/avatars/faces/isfp-adventurer-s3-v1-female.svg?v=1',
    content: '호기심 많은 예술가, 성인군자형',
  },
  {
    title: 'ESTP',
    src: 'https://static.neris-assets.com/images/personality-types/avatars/faces/estp-entrepreneur-s3-v1-male.svg?v=1',
    content: '모험을 즐기는 사업가, 수완 좋은 활동가형',
  },
  {
    title: 'ESFP',
    src: 'https://static.neris-assets.com/images/personality-types/avatars/faces/esfp-entertainer-s3-v1-female.svg?v=1',
    content: '자유로운 영혼의 연예인, 슈퍼스타형',
  },
];

const MAX_CONTENTS = 4;

const CardGroup = () => {
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box pb={10}>
      <TopDescription
        type="ALL TYPES"
        title="MBTI별 유형"
        // content="Lorem ipsum, dolor sit amet consectetur Suscipit nemo hic quos, ab,"
        content="각 MBTI별 어떤 특성이 있는지 확인하세요!"
      />
      <Grid container columnSpacing={6} rowSpacing={3} justifyContent="center">
        {DATA.slice((page - 1) * MAX_CONTENTS, page * MAX_CONTENTS).map(
          (item) => (
            <MbtiCard key={item.title} {...item} />
          ),
        )}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center' }} py={2} mt={2}>
        <Pagination
          page={page}
          count={Math.ceil(DATA.length / MAX_CONTENTS)}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
};

export default CardGroup;
