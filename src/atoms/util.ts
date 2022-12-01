import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// revise
export const doingState = atom<boolean>({
  key: 'doing',
  default: false,
});

// login call back
export const callbackState = atom<string>({
  key: 'callback',
  default: '',
  effects: [persistAtom],
});
