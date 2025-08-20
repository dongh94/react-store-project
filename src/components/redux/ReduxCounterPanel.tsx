import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  decrement,
  increment,
  incrementByAmount,
} from '../../store/slices/counterSlice';
import { useState } from 'react';

export default function ReduxCounterPanel() {
  const value = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState(0);

  return (
    <div className="w-full max-w-sm p-8 space-y-4 bg-gray-800 rounded-lg shadow-xl">
      <p className="text-lg text-gray-300 mb-2">Redux Counter Panel</p>
      <div className="text-2xl">Count: {value}</div>
      <div className="flex gap-2">
        <button
          className="px-3 py-2 bg-blue-600 rounded hover:bg-blue-700"
          onClick={() => dispatch(increment())}
        >
          +1
        </button>
        <button
          className="px-3 py-2 bg-red-600 rounded hover:bg-red-700"
          onClick={() => dispatch(decrement())}
        >
          -1
        </button>
      </div>
      <div className="flex gap-2 items-center">
        <input
          className="w-20 px-2 py-1 text-black rounded"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <button
          className="px-3 py-2 bg-green-600 rounded hover:bg-green-700"
          onClick={() => dispatch(incrementByAmount(amount))}
        >
          +N
        </button>
      </div>
    </div>
  );
}
