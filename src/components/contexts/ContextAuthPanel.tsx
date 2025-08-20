import { useAuth } from '../../contexts/AuthContext';

export default function ContextLoginPanel() {
  const { user, login, logout } = useAuth();

  return (
    <div className="w-full max-w-sm p-8 space-y-6 bg-gray-800 rounded-lg shadow-xl">
      <p className="text-lg text-gray-300 mb-4">Context Auth Panel</p>

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
