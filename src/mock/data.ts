import { IQuestion } from 'types';

const DATA = [
  {
    question: '길고 고단한 한 주 끝에 내가 기다리는 것은',
    left_answer: '많은 친구들과의 모임 자리',
    right_answer: '영화나 게임 등을 즐기는 나만의 시간',
    left_answer_type: 'E',
    right_answer_type: 'I',
    type: 0,
  },
  {
    question: '내가 더 중요하게 생각하는 것은',
    left_answer: '임기응변과 적응하는 능력',
    right_answer: '꼼꼼하고 체계적인 능력',
    left_answer_type: 'P',
    right_answer_type: 'J',
    type: 0,
  },
  {
    question: '나의 평상시 대화 스타일은',
    left_answer: '일반적으로 활발하게 대화',
    right_answer: '꼭 필요한 때가 아니면 말수가 적음',
    left_answer_type: 'E',
    right_answer_type: 'I',
    type: 0,
  },
  {
    question: '나는 다른 사람들에게 어떤 사람이라고 보여질까요?',
    left_answer: '활동적이고 개방적인 사람',
    right_answer: '신중하고 사려깊은 사람',
    left_answer_type: 'E',
    right_answer_type: 'I',
    type: 0,
  },
  {
    question: '나에게 좀 더 중요한 것은',
    left_answer: '팩트와 사실',
    right_answer: '관계와 감정',
    left_answer_type: 'T',
    right_answer_type: 'F',
    type: 0,
  },
  {
    question: '내가 좀 더 끌리는 것은',
    left_answer: '이미 해본 적 있는 안전한 방식',
    right_answer: '혁신적이고 새로운 방식',
    left_answer_type: 'S',
    right_answer_type: 'N',
    type: 0,
  },
  {
    question: '나의 평상시 태도는',
    left_answer: '공정하고 올바른',
    right_answer: '따뜻하고 친절한',
    left_answer_type: 'T', // T 아닌가?
    right_answer_type: 'F',
    type: 0,
  },
  {
    question: '다음 중 내가 가까운 것은',
    left_answer: '현실적인 사람',
    right_answer: '기발하고 창의적인 사람',
    left_answer_type: 'S',
    right_answer_type: 'N',
    type: 0,
  },
  {
    question: '일반적으로 나는',
    left_answer: '스스로의 판단에 따라 옳다고 믿는 대로 행동',
    right_answer: '내 행동으로 다른 사람들이 받을 영향을 고려하여 행동',
    left_answer_type: 'T',
    right_answer_type: 'F',
    type: 0,
  },
  {
    question: '나는 주변과 물건들을',
    left_answer: '잘 어지르는 편',
    right_answer: '항상 정돈된 상태로 유지',
    left_answer_type: 'P',
    right_answer_type: 'J',
    type: 0,
  },
  {
    question: '산다는 것과 죽음의 의미에 대해',
    left_answer: '그다지 생각하지 않는다',
    right_answer: '자주 생각한다',
    left_answer_type: 'S',
    right_answer_type: 'N',
    type: 0,
  },
  {
    question: '여행할 때 내가 더 선호하는 방식은',
    left_answer: '그날의 느낌에 따라 움직이기',
    right_answer: '비교적 철저하게 계획을 세우기',
    left_answer_type: 'P',
    right_answer_type: 'J',
    type: 0,
  },
  {
    question: '다음 중 내가 더 중요하게 생각하는 것은',
    left_answer: '경험과 기억',
    right_answer: '영감과 상상력',
    left_answer_type: 'S',
    right_answer_type: 'N',
    type: 0,
  },
  {
    question: '나는 여러 사람들 가운데 있을 때',
    left_answer: '에너지가 생긴다',
    right_answer: '에너지가 소모된다',
    left_answer_type: 'E',
    right_answer_type: 'I',
    type: 0,
  },
  {
    question: '내가 더 선호하는 이야기 주제는',
    left_answer: '현재 일어나는 일들에 대해',
    right_answer: '가능성과 아이디어에 대해',
    left_answer_type: 'S',
    right_answer_type: 'N',
    type: 0,
  },
  {
    question: '여러 사람이 모인 자리에서 선호하는 것은',
    left_answer: '새로운 사람과 이야기',
    right_answer: '편하고 잘 아는 사람과 이야기',
    left_answer_type: 'E',
    right_answer_type: 'I',
    type: 0,
  },
  {
    question: '친구가 고민이 있을 때, 내가 가장 잘 해줄 수 있는 것은',
    left_answer: '현실적인 조언과 도움',
    right_answer: '감정적인 공감과 경청',
    left_answer_type: 'T',
    right_answer_type: 'F',
    type: 0,
  },
  {
    question: '해야할 일들이 많이 있을 때, 내가 일들을 처리하는 방식은',
    left_answer: '한꺼번에 몰아서',
    right_answer: '계획에 따라 차근차근',
    left_answer_type: 'P',
    right_answer_type: 'J',
    type: 0,
  },
  {
    question: '다음 중 내가 더 선호하는 것은',
    left_answer: '즉흥적으로 행동하기',
    right_answer: '구체적인 계획에 따라 움직이기',
    left_answer_type: 'P',
    right_answer_type: 'J',
    type: 0,
  },
  {
    question: '중요한 결정을 해야할 때 나는 일반적으로',
    left_answer: '논리적인 판단을 따름',
    right_answer: '가슴이 시키는것을 따름',
    left_answer_type: 'S',
    right_answer_type: 'N',
    type: 0,
  },
  {
    question: '철학적이거나 추상적인 이야기는',
    left_answer: '지루할 때가 많다',
    right_answer: '흥미로울 때가 많다',
    left_answer_type: 'T', // S
    right_answer_type: 'F', // N
    type: 0,
  },
  {
    question: '내가 더 선호하는 것은',
    left_answer: '모든 가능성에 열린 자세로 적응하기',
    right_answer: '가능한 상황들에 체계적으로 대비하기',
    left_answer_type: 'N',
    right_answer_type: 'S',
    type: 0,
  },
  {
    question: '일반적으로 나는',
    left_answer: '비판적이고 올바른 사람',
    right_answer: '타인을 배려하는 사람',
    left_answer_type: 'T',
    right_answer_type: 'F',
    type: 0,
  },
  {
    question: '여럿이 모인 상황에서 나는',
    left_answer: '다른 사람들 앞에 나서는데 거리낌이 없음',
    right_answer: '최대한 다른 사람들 앞에 나서지 않음',
    left_answer_type: 'E',
    right_answer_type: 'I',
    type: 0,
  },
];

export const getQuestion = () =>
  new Promise<IQuestion[]>((resolve, reject) =>
    setTimeout(() => resolve(DATA), 50),
  );
