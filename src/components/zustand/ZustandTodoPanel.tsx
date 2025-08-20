import { useState } from 'react';
import { useTodoStore } from '../../zustand/store/todo';

export default function ZustandTodoPanel() {
  const todos = useTodoStore((s) => s.todos);
  const filter = useTodoStore((s) => s.filter);
  const add = useTodoStore((s) => s.add);
  const toggle = useTodoStore((s) => s.toggle);
  const remove = useTodoStore((s) => s.remove);
  const clearCompleted = useTodoStore((s) => s.clearCompleted);
  const setFilter = useTodoStore((s) => s.setFilter);
  const getFiltered = useTodoStore((s) => s.getFiltered);
  const getStats = useTodoStore((s) => s.getStats);

  const [text, setText] = useState('');

  const stats = getStats();
  const filtered = getFiltered();

  const addTodo = () => {
    const value = text.trim();
    if (!value) return;
    add(value);
    setText('');
  };

  const FilterButton = ({ value, label }: { value: 'all' | 'active' | 'completed'; label: string }) => (
    <button
      className={`px-3 py-1 rounded border text-sm ${
        filter === value ? 'bg-amber-600 border-amber-500' : 'bg-gray-700 border-gray-600 hover:bg-gray-600'
      }`}
      onClick={() => setFilter(value)}
    >
      {label}
    </button>
  );

  return (
    <div className="w-full max-w-md bg-gray-800 rounded-lg p-6 mt-8 shadow">
      <h2 className="text-2xl font-semibold mb-4">🪵 Zustand Todo</h2>

      {/* Add */}
      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
          placeholder="Add a todo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <button className="px-4 py-2 rounded bg-amber-600 hover:bg-amber-500" onClick={addTodo}>
          Add
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2">
          <FilterButton value="all" label={`All (${stats.total})`} />
          <FilterButton value="active" label={`Active (${stats.active})`} />
          <FilterButton value="completed" label={`Completed (${stats.completed})`} />
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
        {filtered.length === 0 && <li className="text-gray-400 text-sm">No todos</li>}
        {filtered.map((t) => (
          <li key={t.id} className="flex items-center gap-3 bg-gray-700 rounded p-2">
            <input type="checkbox" className="h-4 w-4" checked={t.completed} onChange={() => toggle(t.id)} />
            <span className={`flex-1 ${t.completed ? 'line-through text-gray-400' : ''}`}>{t.text}</span>
            <button className="px-2 py-1 text-xs rounded bg-red-600 hover:bg-red-500" onClick={() => remove(t.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
