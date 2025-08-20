import { atom } from 'jotai';

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

// LocalStorage todos
// export const todosAtom = atomWithStorage<Todo[]>('jotai:todos', []);

// In-memory todos (reset on reload)
export const todosAtom = atom<Todo[]>([]);

export type TodoFilter = 'all' | 'active' | 'completed';
export const filterAtom = atom<TodoFilter>('all');

// Derived: filtered todos
export const filteredTodosAtom = atom<Todo[]>((get) => {
  const todos = get(todosAtom);
  const filter = get(filterAtom);
  if (filter === 'active') return todos.filter((t) => !t.completed);
  if (filter === 'completed') return todos.filter((t) => t.completed);
  return todos;
});

// Derived: stats
export const todoStatsAtom = atom((get) => {
  const todos = get(todosAtom);
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const active = total - completed;
  return { total, completed, active };
});
