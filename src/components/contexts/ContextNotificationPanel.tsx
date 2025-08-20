import { useNotification } from '../../contexts/NotificationContext';

export default function ContextNotificationPanel() {
  const { state, addNotification, removeNotification } = useNotification();
  return (
    <div className="w-full max-w-sm p-8 space-y-6 bg-gray-800 rounded-lg shadow-xl">
      <p className="text-lg text-gray-300 mb-4">Context Notification Panel</p>
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
