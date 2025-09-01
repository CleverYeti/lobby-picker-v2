import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import "./notificationSystem.css"

const DEFAULT_NOTIFICATION_DURATION = 7000;

interface Notification {
  title: string,
  content: string,
  duration?: number,
  id?: string,
  color?: number,
}

export let showNotification = (_notification: Notification) => {};

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Array<Notification>>([]);

  function localShowNotification(notification: Notification) {
    const id = crypto.randomUUID();
    setNotifications((prev) => [...prev, { ...notification, id: id}]);

    // Remove notification after some time
    setTimeout(() => {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, notification.duration ?? DEFAULT_NOTIFICATION_DURATION);
  }
  showNotification = (notif: Notification) => {
    setTimeout(() => localShowNotification(notif), 0)
  }

  return (
    <div className="notification-system">
      {notifications.map((notif) => (
        <div key={notif.id} className="notification" style={{"--color": `var(--ui-color-${notif.color ?? 9})`} as React.CSSProperties}>
          <div className="title">{notif.title}</div>
          <div className="content">{notif.content}</div>
        </div>
      ))}
    </div>
  );
}