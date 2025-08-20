// Recoil 훅 설명
// - useRecoilState(atom): 해당 atom 값을 구독하며 읽기/쓰기 기능을 모두 제공 ([value, setValue]) 반환
// - useRecoilValue(atom|selector): 값을 구독해 읽기만 함(쓰기 없음) → 값이 바뀌면 컴포넌트가 재렌더
// - useSetRecoilState(atom): 값을 쓰기만 함(구독하지 않음) → 불필요한 렌더 방지에 유리한 제어 컴포넌트에 적합
// - useResetRecoilState(atom): atom을 기본값(default)으로 즉시 초기화
// - useRecoilValueLoadable(selector): 비동기 selector 상태를 안전하게 읽기(loading/hasValue/hasError 분기)
// - useRecoilCallback(({set, get, snapshot})=>async()=>{}): 비동기/명령형 업데이트에 사용
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
  useRecoilValueLoadable,
  useRecoilCallback,
} from 'recoil';
import {
  counterAtom,
  counterDoubleSelector,
} from '../../recoil/atoms/counterAtom';
import { counterAsyncDoubleSelector } from '../../recoil/selectors/asyncSelectors';

function RecoilCounterControls() {
  // useSetRecoilState(atom): 값만 업데이트, 값 변화에 따른 렌더에는 참여하지 않음
  // 제어용 버튼/폼처럼 값만 건드리고 화면 갱신은 상위가 담당할 때 적합
  const setCount = useSetRecoilState(counterAtom);
  return (
    <div className="flex gap-2 mt-3">
      <button
        className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 rounded"
        onClick={() => setCount((c) => c + 10)}
      >
        +10 (useSetRecoilState)
      </button>
      <button
        className="px-3 py-2 bg-amber-600 hover:bg-amber-500 rounded"
        onClick={() => setCount((c) => c - 10)}
      >
        -10 (useSetRecoilState)
      </button>
    </div>
  );
}

export default function RecoilCounterPanel() {
  // useRecoilState(atom): 읽기+쓰기, 값 변화에 구독 → count가 바뀌면 이 컴포넌트가 재렌더
  const [count, setCount] = useRecoilState(counterAtom);
  // useRecoilValue(selector): 읽기 전용, 파생 상태를 계산하여 제공 → doubled 값이 바뀌면 재렌더
  const doubled = useRecoilValue(counterDoubleSelector);
  // useResetRecoilState(atom): atom을 기본값(default: 0)으로 즉시 초기화
  const resetCount = useResetRecoilState(counterAtom);

  // useRecoilValueLoadable(selector): 비동기 selector의 상태를 안전하게 분기 처리
  const asyncDoubleLoadable = useRecoilValueLoadable(
    counterAsyncDoubleSelector,
  );

  // useRecoilCallback: 비동기/명령형 업데이트. snapshot으로 현재 값을 안전하게 읽고 비동기 처리를 수행한 뒤 set
  const asyncIncrement = useRecoilCallback(
    ({ set, snapshot }) =>
      async (delta: number) => {
        const current = await snapshot.getPromise(counterAtom);
        // 네트워크 대기 시뮬레이션
        await new Promise((r) => setTimeout(r, 800));
        set(counterAtom, current + delta);
      },

    [],
  );

  return (
    <div className="w-full max-w-md bg-gray-800 rounded-lg p-6 mt-8 shadow">
      <h2 className="text-2xl font-semibold mb-4">⚛️ Recoil Counter</h2>
      <p className="text-gray-300 mb-2">count: {count}</p>
      <p className="text-gray-400 mb-4">double: {doubled}</p>

      {/* 비동기 selector 상태 표시 (useRecoilValueLoadable) */}
      <div className="mb-4 p-3 rounded bg-gray-700/60">
        <div className="text-sm text-gray-300 mb-1">
          async todo title (fetch):
        </div>
        {asyncDoubleLoadable.state === 'loading' && (
          <div className="text-gray-400">loading...</div>
        )}
        {asyncDoubleLoadable.state === 'hasError' && (
          <div className="text-red-400">error: {String(asyncDoubleLoadable.contents)}</div>
        )}
        {asyncDoubleLoadable.state === 'hasValue' && (
          <div className="text-green-300">
            title: {asyncDoubleLoadable.contents}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        {/* useRecoilState로 값 증가 */}
        <button
          className="px-3 py-2 bg-blue-600 hover:bg-blue-500 rounded"
          onClick={() => setCount((c) => c + 1)}
        >
          +1
        </button>
        {/* useRecoilState로 값 감소 */}
        <button
          className="px-3 py-2 bg-red-600 hover:bg-red-500 rounded"
          onClick={() => setCount((c) => c - 1)}
        >
          -1
        </button>
        {/* useResetRecoilState로 기본값으로 리셋 */}
        <button
          className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded"
          onClick={resetCount}
        >
          reset
        </button>
        {/* useRecoilCallback로 비동기 증가 */}
        <button
          className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 rounded"
          onClick={() => asyncIncrement(5)}
        >
          +5 async (useRecoilCallback)
        </button>
      </div>

      {/* 하위 제어 패널: useSetRecoilState만 사용하여 값 업데이트(구독 없음) */}
      <RecoilCounterControls />
    </div>
  );
}
