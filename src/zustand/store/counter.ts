import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type CounterState = {
  count: number;
  increment: (by?: number) => void;
  decrement: (by?: number) => void;
  reset: () => void;
  // selector-like derived value via getter inside store hook
  getDouble: () => number;
};

export const useCounterStore = create<CounterState>()(
  devtools((set, get) => ({
    count: 0,
    increment: (by = 1) => set((s) => ({ count: s.count + by }), false, 'counter/increment'),
    decrement: (by = 1) => set((s) => ({ count: s.count - by }), false, 'counter/decrement'),
    reset: () => set({ count: 0 }, false, 'counter/reset'),
    getDouble: () => get().count * 2,
  }))
);
