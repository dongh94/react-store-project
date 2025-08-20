import { configureStore } from '@reduxjs/toolkit';
import { default as counterReducer } from './slices/counterSlice';
import { default as todoReducer } from './slices/todoSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todoReducer,
  },
});

// 타입 추론
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
