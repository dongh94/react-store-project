import { useAtom } from 'jotai';
import {
  todosAtom,
  filterAtom,
  filteredTodosAtom,
  todoStatsAtom,
  type Todo,
  type TodoFilter,
} from '../../jotai/atoms/todo';
import { useState } from 'react';
import { useTodoActions } from '../../jotai/actions/useTodoActions';

export default function JotaiTodoPanel() {
  const [todos] = useAtom(todosAtom);
  const [filter, setFilter] = useAtom(filterAtom);
  const [filtered] = useAtom(filteredTodosAtom);
  const [stats] = useAtom(todoStatsAtom);

  const [text, setText] = useState('');
  const { add, toggle, remove, clearCompleted } = useTodoActions();

  const addTodo = () => {
    const value = text.trim();
    if (!value) return;
    add(value);
    setText('');
  };

  const FilterButton = ({
    value,
    label,
  }: {
    value: TodoFilter;
    label: string;
  }) => (
    <button
      className={`px-3 py-1 rounded border text-sm ${
        filter === value
          ? 'bg-indigo-600 border-indigo-500'
          : 'bg-gray-700 border-gray-600 hover:bg-gray-600'
      }`}
      onClick={() => setFilter(value)}
    >
      {label}
    </button>
  );

  return (
    <div className="w-full max-w-md bg-gray-800 rounded-lg p-6 mt-8 shadow">
      <h2 className="text-2xl font-semibold mb-4">🧪 Jotai Todo</h2>

      {/* Add */}
      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Add a todo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <button
          className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500"
          onClick={addTodo}
        >
          Add
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2">
          <FilterButton value="all" label={`All (${stats.total})`} />
          <FilterButton value="active" label={`Active (${stats.active})`} />
          <FilterButton
            value="completed"
            label={`Completed (${stats.completed})`}
          />
        </div>
        <button
          className="text-sm px-2 py-1 rounded bg-gray-700 hover:bg-gray-600"
          onClick={clearCompleted}
          disabled={stats.completed === 0}
        >
          Clear completed
        </button>
      </div>

      {/* List */}
      <ul className="space-y-2">
        {filtered.length === 0 && (
          <li className="text-gray-400 text-sm">No todos</li>
        )}
        {filtered.map((t) => (
          <li
            key={t.id}
            className="flex items-center gap-3 bg-gray-700 rounded p-2"
          >
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={t.completed}
              onChange={() => toggle(t.id)}
            />
            <span
              className={`flex-1 ${t.completed ? 'line-through text-gray-400' : ''}`}
            >
              {t.text}
            </span>
            <button
              className="px-2 py-1 text-xs rounded bg-red-600 hover:bg-red-500"
              onClick={() => remove(t.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
