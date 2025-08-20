import { useCounterStore } from '../../zustand/store/counter';

export default function ZustandCounterPanel() {
  const count = useCounterStore((s) => s.count);
  const increment = useCounterStore((s) => s.increment);
  const decrement = useCounterStore((s) => s.decrement);
  const reset = useCounterStore((s) => s.reset);
  const double = useCounterStore((s) => s.getDouble());

  return (
    <div className="w-full max-w-md bg-gray-800 rounded-lg p-6 mt-8 shadow">
      <h2 className="text-2xl font-semibold mb-4">🪵 Zustand Counter</h2>
      <p className="text-gray-300 mb-2">count: {count}</p>
      <p className="text-gray-400 mb-4">double: {double}</p>

      <div className="flex gap-2 mb-4">
        <button
          className="px-3 py-2 bg-blue-600 hover:bg-blue-500 rounded"
          onClick={() => increment(1)}
        >
          +1
        </button>
        <button
          className="px-3 py-2 bg-red-600 hover:bg-red-500 rounded"
          onClick={() => decrement(1)}
        >
          -1
        </button>
        <button
          className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded"
          onClick={reset}
        >
          reset
        </button>
        <button
          className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 rounded"
          onClick={() => increment(10)}
        >
          +10
        </button>
      </div>
    </div>
  );
}
