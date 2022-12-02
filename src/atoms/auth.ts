import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { IToken } from 'types';

const { persistAtom } = recoilPersist();

export const authState = atom<IToken | null>({
  key: 'auth',
  default: null,
  effects: [persistAtom],
});
