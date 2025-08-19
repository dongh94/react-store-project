// 상태 타입
export interface ThemeState {
  theme: 'light' | 'dark';
}

export type ThemeAction = { type: 'TOGGLE_THEME' };

// Context 타입
export interface ThemeContextProps {
  state: ThemeState;
  toggleTheme: () => void;
}
