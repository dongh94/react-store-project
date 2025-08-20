import { atom } from 'recoil';

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export type TodoFilter = 'all' | 'active' | 'completed';

export const todosState = atom<Todo[]>({
  key: 'todosState',
  default: [],
});

export const filterState = atom<TodoFilter>({
  key: 'filterState',
  default: 'all',
});
