import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

// 기본 카운터 atom (reset 지원)
export const countAtom = atomWithReset<number>(0);

// 파생 상태: 두 배
export const doubleAtom = atom<number>((get) => get(countAtom) * 2);

// 비동기 atom: 현재 count 값을 id로 매핑해 Todo title fetch
export const asyncTodoTitleAtom = atom<Promise<string>>(async (get) => {
  const count = get(countAtom);
  const id = ((count % 200) + 200) % 200 || 1; // 1~200 범위, 음수/0 방지
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch todo ${id}: ${res.status}`);
  }
  const data: { id: number; title: string } = await res.json();
  return data.title;
});
