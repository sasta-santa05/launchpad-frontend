// components/NotificationBell.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NotificationBell.css';

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1)   return 'just now';
  if (m < 60)  return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24)  return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

const TYPE_COLOR = {
  applicant: 'lavender',
  message:   'cyan',
  training:  'mint',
  listing:   'amber',
  status:    'cyan',
  match:     'mint',
  deadline:  'peach',
};

export default function NotificationBell({ notifications, unread, onRead, onReadAll }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleClick = (n) => {
    onRead(n.id);
    setOpen(false);
    if (n.link) navigate(n.link);
  };

  return (
    <div className="notif-bell" ref={ref}>
      <button className="notif-bell__btn" onClick={() => setOpen(o => !o)} aria-label="Notifications">
        <span className="notif-bell__icon">🔔</span>
        {unread > 0 && (
          <span className="notif-bell__badge">{unread > 9 ? '9+' : unread}</span>
        )}
      </button>

      {open && (
        <div className="notif-bell__dropdown">
          <div className="notif-bell__header">
            <span className="notif-bell__title">Notifications</span>
            {unread > 0 && (
              <button className="notif-bell__read-all" onClick={() => { onReadAll(); }}>
                Mark all read
              </button>
            )}
          </div>

          <div className="notif-bell__list">
            {notifications.length === 0 && (
              <div className="notif-bell__empty">
                <span>🔕</span>
                <p>You're all caught up!</p>
              </div>
            )}
            {notifications.map(n => (
              <div
                key={n.id}
                className={`notif-bell__item notif-bell__item--${TYPE_COLOR[n.type]} ${!n.read ? 'notif-bell__item--unread' : ''}`}
                onClick={() => handleClick(n)}
              >
                <span className="notif-bell__item-icon">{n.icon}</span>
                <div className="notif-bell__item-body">
                  <p className="notif-bell__item-title">{n.title}</p>
                  <p className="notif-bell__item-text">{n.body}</p>
                  <span className="notif-bell__item-time">{timeAgo(n.time)}</span>
                </div>
                {!n.read && <span className="notif-bell__dot" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
