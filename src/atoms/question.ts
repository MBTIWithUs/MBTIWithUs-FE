import { atom } from 'recoil';
import { IQuestionAnswer } from 'types';

export const questionState = atom<IQuestionAnswer[]>({
  key: 'question',
  default: [],
});
