// ThemeToggle.jsx
import React from 'react';
import { useTheme } from '../ThemeContext';
import './ThemeToggle.css';

export default function ThemeToggle() {
  const { isDark, setIsDark } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={() => setIsDark(!isDark)}
      aria-label="Toggle light/dark mode"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <div className={`theme-toggle__track ${isDark ? 'dark' : 'light'}`}>
        <span className="theme-toggle__icon theme-toggle__icon--sun">☀️</span>
        <span className="theme-toggle__icon theme-toggle__icon--moon">🌙</span>
        <div className="theme-toggle__thumb" />
      </div>
    </button>
  );
}
