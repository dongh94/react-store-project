import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export type TodoFilter = 'all' | 'active' | 'completed';

type TodoState = {
  todos: Todo[];
  filter: TodoFilter;
  // actions
  add: (text: string) => void;
  toggle: (id: number) => void;
  remove: (id: number) => void;
  clearCompleted: () => void;
  setFilter: (f: TodoFilter) => void;
  // derived helpers
  getFiltered: () => Todo[];
  getStats: () => { total: number; completed: number; active: number };
};

export const useTodoStore = create<TodoState>()(
  devtools((set, get) => ({
    todos: [],
    filter: 'all',
    add: (text: string) => {
      const value = text.trim();
      if (!value) return;
      const todo: Todo = { id: Date.now(), text: value, completed: false };
      set((s) => ({ todos: [todo, ...s.todos] }), false, 'todo/add');
    },
    toggle: (id: number) =>
      set(
        (s) => ({ todos: s.todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)) }),
        false,
        'todo/toggle'
      ),
    remove: (id: number) =>
      set((s) => ({ todos: s.todos.filter((t) => t.id !== id) }), false, 'todo/remove'),
    clearCompleted: () =>
      set((s) => ({ todos: s.todos.filter((t) => !t.completed) }), false, 'todo/clearCompleted'),
    setFilter: (f: TodoFilter) => set({ filter: f }, false, 'todo/setFilter'),

    getFiltered: () => {
      const { todos, filter } = get();
      if (filter === 'active') return todos.filter((t) => !t.completed);
      if (filter === 'completed') return todos.filter((t) => t.completed);
      return todos;
    },
    getStats: () => {
      const todos = get().todos;
      const total = todos.length;
      const completed = todos.filter((t) => t.completed).length;
      const active = total - completed;
      return { total, completed, active };
    },
  }))
);
