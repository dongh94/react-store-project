import { createContext, ReactNode, useContext, useReducer } from 'react';
import {
  NotificationAction,
  NotificationContextProps,
  NotificationState,
} from '../types/notification';

// 초기 상태
const initialState: NotificationState = {
  notifications: [],
};

// 리듀서
function notificationReducer(
  state: NotificationState,
  action: NotificationAction,
): NotificationState {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload,
        ),
      };
    default:
      return state;
  }
}

// Context
export const NotificationContext = createContext<NotificationContextProps>({
  state: initialState,
  addNotification: () => {},
  removeNotification: () => {},
});

// Provider
export function NotificationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(notificationReducer, initialState);
  const addNotification = (msg: string) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: { id: Date.now(), msg } });
  };
  const removeNotification = (id: number) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  };
  return (
    <NotificationContext.Provider
      value={{ state, addNotification, removeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

// Hook
export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider',
    );
  }
  return context;
}
