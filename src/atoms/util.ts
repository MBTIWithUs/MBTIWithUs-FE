import { atom } from 'recoil';

// revise
export const doingState = atom<boolean>({
  key: 'doing',
  default: false,
});
