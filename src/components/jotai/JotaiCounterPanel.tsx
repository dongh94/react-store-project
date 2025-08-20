import { useAtom, useSetAtom } from 'jotai';
import { loadable, useResetAtom } from 'jotai/utils';
import {
  asyncTodoTitleAtom,
  countAtom,
  doubleAtom,
} from '../../jotai/atoms/counter';

// loadable: Promise 기반 atom을 loading/hasData/hasError 형태로 안전하게 읽기
const loadableAsyncTitleAtom = loadable(asyncTodoTitleAtom);

export default function JotaiCounterPanel() {
  // useAtom: 값 읽기 + 쓰기 ([value, setValue])
  const [count, setCount] = useAtom(countAtom);
  // 파생 상태는 읽기 전용으로 useAtom 사용 가능([value]만 사용)
  const [double] = useAtom(doubleAtom);

  // 쓰기 전용 훅: 값만 갱신(구독 X)
  const writeOnlySetCount = useSetAtom(countAtom);
  // 기본값으로 리셋
  const resetCount = useResetAtom(countAtom);

  // 비동기 atom을 loadable로 읽기(loading/hasData/hasError 구분)
  const [asyncTitleLoadable] = useAtom(loadableAsyncTitleAtom);

  return (
    <div className="w-full max-w-md bg-gray-800 rounded-lg p-6 mt-8 shadow">
      <h2 className="text-2xl font-semibold mb-4">🧪 Jotai Counter</h2>
      <p className="text-gray-300 mb-2">count: {count}</p>
      <p className="text-gray-400 mb-4">double: {double}</p>

      {/* 동기 카운터 제어 (useAtom, useSetAtom, useResetAtom) */}
      <div className="flex gap-2 mb-4">
        <button
          className="px-3 py-2 bg-blue-600 hover:bg-blue-500 rounded"
          onClick={() => setCount((c) => c + 1)}
        >
          +1 (useAtom)
        </button>
        <button
          className="px-3 py-2 bg-red-600 hover:bg-red-500 rounded"
          onClick={() => setCount((c) => c - 1)}
        >
          -1 (useAtom)
        </button>
        <button
          className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded"
          onClick={resetCount}
        >
          reset (useResetAtom)
        </button>
        <button
          className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 rounded"
          onClick={() => writeOnlySetCount((c) => c + 10)}
        >
          +10 (useSetAtom)
        </button>
      </div>

      {/* 비동기 상태 표시 (loadable) */}
      <div className="mb-2 p-3 rounded bg-gray-700/60">
        <div className="text-sm text-gray-300 mb-1">
          async todo title (fetch):
        </div>
        {asyncTitleLoadable.state === 'loading' && (
          <div className="text-gray-400">loading...</div>
        )}
        {asyncTitleLoadable.state === 'hasError' && (
          <div className="text-red-400">
            error: {(asyncTitleLoadable.error as Error).message}
          </div>
        )}
        {asyncTitleLoadable.state === 'hasData' && (
          <div className="text-green-300">title: {asyncTitleLoadable.data}</div>
        )}
      </div>
    </div>
  );
}
