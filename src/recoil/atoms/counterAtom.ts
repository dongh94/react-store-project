import { atom, selector } from 'recoil';

export const counterAtom = atom<number>({
  key: 'counterAtom',
  default: 0,
});

export const counterDoubleSelector = selector<number>({
  key: 'counterDoubleSelector',
  get: ({ get }) => get(counterAtom) * 2,
});
