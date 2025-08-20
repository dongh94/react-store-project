import { AuthProvider, useAuth } from './contexts/AuthContext';
import {
  NotificationProvider,
  useNotification,
} from './contexts/NotificationContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import ContextLoginPanel from './components/contexts/ContextAuthPanel';
import ContextThemePanel from './components/contexts/ContextThemePanel';
import ContextNotificationPanel from './components/contexts/ContextNotificationPanel';
import ReduxCounterPanel from './components/redux/ReduxCounterPanel';
import ReduxTodoPanel from './components/redux/ReduxTodoPanel';
import RecoilCounterPanel from './components/recoil/RecoilCounterPanel';
import JotaiCounterPanel from './components/jotai/JotaiCounterPanel';

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
            <ContextLoginPanel />
            <ContextThemePanel />
            <ContextNotificationPanel />
            <ReduxCounterPanel />
            <ReduxTodoPanel />
            <RecoilCounterPanel />
            <JotaiCounterPanel />
          </NotificationProvider>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}
