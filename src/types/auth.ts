export interface User {
  name: string;
}

export interface AuthState {
  user: User | null;
}

export type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' };

export interface AuthContextProps {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}
