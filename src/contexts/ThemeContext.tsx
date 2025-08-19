import { ThemeAction, ThemeContextProps, ThemeState } from '../types/theme';
import { createContext, ReactNode, useContext, useReducer } from 'react';

// 초기 상태
const initialState: ThemeState = {
  theme: 'light',
};

// Reducer
function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    default:
      return state;
  }
}

// Context
export const ThemeContext = createContext<ThemeContextProps>({
  state: initialState,
  toggleTheme: () => {},
});

// Provider
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(themeReducer, initialState);
  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };
  return (
    <ThemeContext.Provider value={{ state, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
