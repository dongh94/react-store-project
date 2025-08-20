import { selector } from 'recoil';
import { todosState, filterState, type Todo } from '../atoms/todoAtoms';

export const filteredTodosSelector = selector<Todo[]>({
  key: 'filteredTodosSelector',
  get: ({ get }) => {
    const todos = get(todosState);
    const filter = get(filterState);
    if (filter === 'active') return todos.filter((t) => !t.completed);
    if (filter === 'completed') return todos.filter((t) => t.completed);
    return todos;
  },
});

export const todoStatsSelector = selector<{ total: number; completed: number; active: number }>({
  key: 'todoStatsSelector',
  get: ({ get }) => {
    const todos = get(todosState);
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const active = total - completed;
    return { total, completed, active };
  },
});
