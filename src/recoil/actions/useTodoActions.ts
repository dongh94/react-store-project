import { useRecoilCallback } from 'recoil';
import { todosState, type Todo } from '../atoms/todoAtoms';

export function useTodoActions() {
  const add = useRecoilCallback(({ set }) => (text: string) => {
    const value = text.trim();
    if (!value) return;
    const todo: Todo = { id: Date.now(), text: value, completed: false };
    set(todosState, (prev) => [todo, ...prev]);
  }, []);

  const toggle = useRecoilCallback(({ set }) => (id: number) => {
    set(todosState, (prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }, []);

  const remove = useRecoilCallback(({ set }) => (id: number) => {
    set(todosState, (prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearCompleted = useRecoilCallback(({ set }) => () => {
    set(todosState, (prev) => prev.filter((t) => !t.completed));
  }, []);

  return { add, toggle, remove, clearCompleted } as const;
}
