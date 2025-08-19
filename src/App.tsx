import { AuthProvider, useAuth } from './contexts/AuthContext';
import {
  NotificationProvider,
  useNotification,
} from './contexts/NotificationContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

function LoginPanel() {
  const { user, login, logout } = useAuth();

  return (
    <div className="w-full max-w-sm p-8 space-y-6 bg-gray-800 rounded-lg shadow-xl">
      {user ? (
        <div className="text-center">
          <p className="text-2xl text-white">👤 {user.name}님, 환영합니다!</p>
          <button
            onClick={logout}
            className="w-full px-4 py-2 mt-6 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-300"
          >
            로그아웃
          </button>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg text-gray-300 mb-4">
            로그인하여 서비스를 이용하세요.
          </p>
          <button
            onClick={() => login({ name: '동희' })}
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
          >
            로그인
          </button>
        </div>
      )}
    </div>
  );
}

function NotificationPanel() {
  const { state, addNotification, removeNotification } = useNotification();
  return (
    <div className="w-full max-w-sm p-8 space-y-6 bg-gray-800 rounded-lg shadow-xl">
      <p className="text-lg text-gray-300 mb-4">Notification Panel</p>
      <button
        onClick={() =>
          addNotification(
            '새 알람이 도착했습니다.!' + state.notifications.length,
          )
        }
      >
        알림 추가
      </button>
      <ul>
        {state.notifications.map((notification) => (
          <li key={notification.id}>
            {notification.msg}
            <button onClick={() => removeNotification(notification.id)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ThemePanel() {
  const { state, toggleTheme } = useTheme();
  return (
    <div className="w-full max-w-sm p-8 space-y-6 bg-gray-800 rounded-lg shadow-xl">
      <p className="text-lg text-gray-300 mb-4">Theme Panel</p>
      <button onClick={() => toggleTheme()}>
        {state.theme === 'light' ? '🌞' : '🌜'}
      </button>
    </div>
  );
}

// 최상위 App
export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-sans">
      <AuthProvider>
        <ThemeProvider>
          <NotificationProvider>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold tracking-tight">
                📦 Context API 실전 예제
              </h1>
              <p className="text-gray-400 mt-2">Tailwind CSS로 스타일링</p>
            </div>
            <LoginPanel />
            <NotificationPanel />
            <ThemePanel />
          </NotificationProvider>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}
