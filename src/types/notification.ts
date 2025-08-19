// 알림 타입
interface Notification {
  id: number;
  msg: string;
}

export interface NotificationState {
  notifications: Notification[];
}

export type NotificationAction =
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'REMOVE_NOTIFICATION'; payload: number };

// Context 타입
export interface NotificationContextProps {
  state: NotificationState;
  addNotification: (msg: string) => void;
  removeNotification: (id: number) => void;
}
