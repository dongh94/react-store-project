import { useTheme } from '../../contexts/ThemeContext';

export default function ContextThemePanel() {
  const { state, toggleTheme } = useTheme();
  return (
    <div className="w-full max-w-sm p-8 space-y-6 bg-gray-800 rounded-lg shadow-xl">
      <p className="text-lg text-gray-300 mb-4">ContextTheme Panel</p>
      <button onClick={() => toggleTheme()}>
        {state.theme === 'light' ? '🌞' : '🌜'}
      </button>
    </div>
  );
}
