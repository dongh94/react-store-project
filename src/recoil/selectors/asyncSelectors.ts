import { selector } from 'recoil';
import { counterAtom } from '../atoms/counterAtom';

// 비동기 selector 예시: 현재 count 값을 기반으로 외부 API에서 데이터를 가져오기
// 여기서는 공개 API(jsonplaceholder)에서 Todo 제목을 가져옵니다.
export const counterAsyncDoubleSelector = selector<string>({
  key: 'counterAsyncDoubleSelector',
  get: async ({ get }) => {
    const count = get(counterAtom);
    // 1~200 범위로 매핑하여 과한 id 방지
    const id = ((count % 200) + 200) % 200 || 1; // 음수 대비, 0이면 1로

    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch todo ${id}: ${res.status}`);
    }
    const data: { id: number; title: string } = await res.json();
    return data.title;
  },
});
