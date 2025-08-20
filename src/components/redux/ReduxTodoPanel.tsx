import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addTodo,
  toggleTodo,
  removeTodo,
  clearCompleted,
} from '../../store/slices/todoSlice';

export default function ReduxTodoPanel() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.items);
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  return (
    <div className="w-full max-w-sm p-8 space-y-4 bg-gray-800 rounded-lg shadow-xl mt-6">
      <p className="text-lg text-gray-300 mb-2">Redux Todos Panel</p>
      <div className="flex gap-2">
        <input
          className="flex-1 px-2 py-1 text-black rounded"
          placeholder="Add a todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button
          className="px-3 py-2 bg-green-600 rounded hover:bg-green-700"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map((t) => (
          <li
            key={t.id}
            className="flex items-center justify-between bg-gray-700 rounded px-3 py-2"
          >
            <button
              className={`text-left flex-1 mr-2 ${t.completed ? 'line-through text-gray-400' : ''}`}
              onClick={() => dispatch(toggleTodo(t.id))}
              title="Toggle complete"
            >
              {t.text}
            </button>
            <button
              className="px-2 py-1 bg-red-600 rounded hover:bg-red-700"
              onClick={() => dispatch(removeTodo(t.id))}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>

      <div className="flex justify-between">
        <span className="text-sm text-gray-400">
          {todos.filter((t) => !t.completed).length} remaining
        </span>
        <button
          className="px-3 py-2 bg-gray-600 rounded hover:bg-gray-700"
          onClick={() => dispatch(clearCompleted())}
        >
          Clear completed
        </button>
      </div>
    </div>
  );
}
