import { useSetAtom } from 'jotai';
import { todosAtom, type Todo } from '../atoms/todo';

export function useTodoActions() {
  const setTodos = useSetAtom(todosAtom);

  const add = (text: string) => {
    const value = text.trim();
    if (!value) return;
    const newTodo: Todo = { id: Date.now(), text: value, completed: false };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggle = (id: number) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const remove = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  return { add, toggle, remove, clearCompleted } as const;
}
