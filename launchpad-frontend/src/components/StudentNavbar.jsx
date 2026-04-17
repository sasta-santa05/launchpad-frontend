// components/StudentNavbar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import NotificationBell from './NotificationBell';
import { useNotifications } from '../NotificationContext';

export default function StudentNavbar({ user, logout }) {
  const navigate = useNavigate();
  const { studentNotifs, studentUnread, markReadStudent, markAllReadStudent } = useNotifications();
  const [dropOpen, setDropOpen] = useState(false);
  const [msgUnread, setMsgUnread] = useState(0);

  const token = localStorage.getItem('token');

  // Fetch real message unread count on mount
  useEffect(() => {
    if (!token) return;
    fetch('http://localhost:8080/api/messages/student/threads', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setMsgUnread(data.reduce((s, t) => s + (t.unread || 0), 0));
        }
      })
      .catch(() => {});
  }, [token]);

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : 'ST';

  const handleLogout = () => { logout(); navigate('/login'); };

  const NAV_LINKS = [
    { to: '/student',              label: 'Home',         end: true  },
    { to: '/student/browse',       label: 'Browse',       end: false },
    { to: '/student/applications', label: 'Applications', end: false },
    { to: '/student/trainings',    label: 'Trainings',    end: false },
    { to: '/student/messages',     label: 'Messages',     end: false, badge: msgUnread },
  ];

  return (
    <nav className="student-nav navbar">
      <div className="navbar__inner">
        {/* Logo */}
        <Link to="/student" className="navbar__logo">
          <span className="navbar__logo-icon">◈</span>
          <span className="navbar__logo-text">
            Launch<span className="navbar__logo-accent">pad</span>
          </span>
          <span className="emp-nav__logo-badge"
            style={{ background: 'var(--lavender-dim)', color: 'var(--lavender)', border: '1px solid var(--lavender-glow)' }}>
            Student
          </span>
        </Link>

        {/* Links */}
        <div className="navbar__links s-nav__links">
          {NAV_LINKS.map(({ to, label, end, badge }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) =>
                `navbar__link s-nav__link ${isActive ? 'navbar__link--active' : ''}`
              }>
              {label}
              {badge > 0 && (
                <span className="emp-nav__link-badge">{badge}</span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Right */}
        <div className="navbar__cta emp-nav__right">
          <NotificationBell
            notifications={studentNotifs}
            unread={studentUnread}
            onRead={markReadStudent}
            onReadAll={markAllReadStudent}
          />

          {/* Avatar dropdown */}
          <div className="emp-nav__avatar-wrap" onClick={() => setDropOpen(!dropOpen)}>
            <div className="emp-nav__avatar" style={{ '--emp-logo-color': '#C4B5FD' }}>
              {initials}
            </div>
            <span className="emp-nav__company-name">
              {user?.name?.split(' ')[0] || 'Student'}
            </span>
            <span className="emp-nav__chevron"
              style={{ transform: dropOpen ? 'rotate(180deg)' : '' }}>▾</span>

            {dropOpen && (
              <div className="emp-nav__dropdown">
                <Link to="/student/profile"
                  className="emp-nav__drop-item"
                  onClick={() => setDropOpen(false)}>
                  👤 My Profile
                </Link>
                <Link to="/student/messages"
                  className="emp-nav__drop-item"
                  onClick={() => setDropOpen(false)}>
                  💬 Messages {msgUnread > 0 && `(${msgUnread})`}
                </Link>
                <div className="emp-nav__drop-divider" />
                <button
                  className="emp-nav__drop-item emp-nav__drop-item--danger"
                  onClick={handleLogout}>
                  ⎋ Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
