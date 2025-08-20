import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TodoItem = {
  id: string;
  text: string;
  completed: boolean;
};

type TodoState = {
  items: TodoItem[];
};

const initialState: TodoState = {
  items: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const text = action.payload.trim();
      if (!text) return;
      state.items.push({ id: crypto.randomUUID(), text, completed: false });
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const todo = state.items.find((t) => t.id === id);
      if (todo) todo.completed = !todo.completed;
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.items = state.items.filter((t) => t.id !== id);
    },
    clearCompleted: (state) => {
      state.items = state.items.filter((t) => !t.completed);
    },
  },
});

export const { addTodo, toggleTodo, removeTodo, clearCompleted } = todoSlice.actions;
export default todoSlice.reducer;
