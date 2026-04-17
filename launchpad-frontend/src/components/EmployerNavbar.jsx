// components/EmployerNavbar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import NotificationBell from './NotificationBell';
import { useNotifications } from '../NotificationContext';
import './EmployerNavbar.css';

export default function EmployerNavbar({ employer, logout }) {
  const [dropOpen, setDropOpen] = useState(false);
  const [msgUnread, setMsgUnread] = useState(0);
  const navigate = useNavigate();
  const { employerNotifs, employerUnread, markReadEmployer, markAllReadEmployer } = useNotifications();

  const token = localStorage.getItem('token');

  // Fetch real message unread count on mount
  useEffect(() => {
    if (!token) return;
    fetch('http://localhost:8080/api/messages/employer/threads', {
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

  const handleLogout = () => { logout(); navigate('/login'); };

  const NAV_LINKS = [
    { to: '/employer',             label: 'Dashboard',   icon: '▦',  end: true  },
    { to: '/employer/internships', label: 'Internships', icon: '📋', end: false },
    { to: '/employer/applicants',  label: 'Applicants',  icon: '👥', end: false },
    { to: '/employer/trainings',   label: 'Trainings',   icon: '🎓', end: false },
    { to: '/employer/analytics',   label: 'Analytics',   icon: '📊', end: false },
    { to: '/employer/messages',    label: 'Messages',    icon: '💬', end: false, badge: msgUnread },
  ];

  return (
    <nav className="emp-nav">
      <div className="emp-nav__inner">
        <Link to="/employer" className="emp-nav__logo">
          <span className="emp-nav__logo-icon">◈</span>
          <span className="emp-nav__logo-text">
            Launch<span className="emp-nav__logo-accent">pad</span>
          </span>
          <span className="emp-nav__logo-badge">Employer</span>
        </Link>

        <div className="emp-nav__links">
          {NAV_LINKS.map(({ to, label, icon, end, badge }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) =>
                `emp-nav__link ${isActive ? 'emp-nav__link--active' : ''}`
              }>
              <span className="emp-nav__link-icon">{icon}</span>
              {label}
              {badge > 0 && (
                <span className="emp-nav__link-badge">{badge}</span>
              )}
            </NavLink>
          ))}
        </div>

        <div className="emp-nav__right">
          <NotificationBell
            notifications={employerNotifs}
            unread={employerUnread}
            onRead={markReadEmployer}
            onReadAll={markAllReadEmployer}
          />

          <Link to="/employer/post-internship" className="btn btn-primary btn-sm">
            + Post Role
          </Link>

          <div className="emp-nav__avatar-wrap" onClick={() => setDropOpen(!dropOpen)}>
            <div className="emp-nav__avatar"
              style={{ '--emp-logo-color': employer?.logoColor || '#C4B5FD' }}>
              {employer?.logo || 'CO'}
            </div>
            <span className="emp-nav__company-name">
              {employer?.name || 'Company'}
            </span>
            <span className="emp-nav__chevron"
              style={{ transform: dropOpen ? 'rotate(180deg)' : '' }}>▾</span>

            {dropOpen && (
              <div className="emp-nav__dropdown">
                <Link to="/employer/profile"
                  className="emp-nav__drop-item"
                  onClick={() => setDropOpen(false)}>
                  🏢 Company Profile
                </Link>
                <Link to="/employer/post-internship"
                  className="emp-nav__drop-item"
                  onClick={() => setDropOpen(false)}>
                  + Post Internship
                </Link>
                <Link to="/employer/post-training"
                  className="emp-nav__drop-item"
                  onClick={() => setDropOpen(false)}>
                  + Post Training
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
