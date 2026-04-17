// Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [userType, setUserType] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: userType }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save to localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('name', data.name);
        localStorage.setItem('userId', data.userId);

        // Notify App
        if (onLogin) onLogin(data.role);
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('Cannot connect to server. Make sure the backend is running on port 8080.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page page-enter">
      {/* LEFT — Visual */}
      <div className="login-visual">
        <div className="login-visual__orb login-visual__orb--1"></div>
        <div className="login-visual__orb login-visual__orb--2"></div>
        <div className="login-visual__orb login-visual__orb--3"></div>
        <div className="login-visual__grid"></div>

        <div className="login-visual__content">
          <Link to="/" className="login-visual__logo">
            <span className="login-visual__logo-icon">◈</span>
            <span>Launch<span>pad</span></span>
          </Link>

          <div className="login-visual__headline">
            <h2>Your next big<br />opportunity awaits.</h2>
            <p>Join 850,000+ students and professionals who've kickstarted their careers through Launchpad.</p>
          </div>

          <div className="login-visual__cards">
            <div className="login-visual__card">
              <span className="login-visual__card-val">12K+</span>
              <span className="login-visual__card-label">Live Internships</span>
            </div>
            <div className="login-visual__card login-visual__card--offset">
              <span className="login-visual__card-val">94%</span>
              <span className="login-visual__card-label">Placement Rate</span>
            </div>
            <div className="login-visual__card">
              <span className="login-visual__card-val">3.2K+</span>
              <span className="login-visual__card-label">Hiring Partners</span>
            </div>
          </div>

          <div className="login-visual__testimonial">
            <p className="login-visual__quote">
              "Launchpad helped me land my dream internship at a Series B startup straight out of second year."
            </p>
            <div className="login-visual__testimonial-meta">
              <div className="login-visual__avatar">AK</div>
              <div>
                <span className="login-visual__author">Ananya Krishnan</span>
                <span className="login-visual__role">SDE Intern @ Novarix Labs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT — Form */}
      <div className="login-form-wrap">
        <div className="login-form-card">
          <div className="login-form__header">
            <h3 className="login-form__title">Welcome back</h3>
            <p className="login-form__sub">
              Don't have an account?{' '}
              <Link to="/register" className="login-form__link">Sign up free</Link>
            </p>
          </div>

          {/* User Type Toggle */}
          <div className="login-type-toggle">
            <button
              type="button"
              className={`login-type-btn ${userType === 'student' ? 'login-type-btn--active' : ''}`}
              onClick={() => { setUserType('student'); setError(''); }}>
              🎓 Student
            </button>
            <button
              type="button"
              className={`login-type-btn ${userType === 'employer' ? 'login-type-btn--active' : ''}`}
              onClick={() => { setUserType('employer'); setError(''); }}>
              🏢 Employer
            </button>
          </div>

          <div className="login-or-row">
            <div className="login-or-line"></div>
            <span className="login-or-text">email & password</span>
            <div className="login-or-line"></div>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              background: 'var(--peach-dim)',
              border: '1px solid rgba(252,165,165,0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 14px',
              fontSize: '0.85rem',
              color: 'var(--peach)',
              marginBottom: 'var(--space-md)'
            }}>
              ⚠ {error}
            </div>
          )}

          {/* Form */}
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                className="form-input"
                type="email"
                placeholder={userType === 'student' ? 'you@college.edu' : 'hr@company.com'}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <div className="login-pass-label">
                <label className="form-label">Password</label>
                <a href="#" className="login-form__link login-form__link--small">Forgot password?</a>
              </div>
              <div className="login-pass-wrap">
                <input
                  className="form-input"
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="login-pass-toggle"
                  onClick={() => setShowPass(!showPass)}>
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg login-submit"
              disabled={loading}>
              {loading
                ? '⏳ Signing in...'
                : userType === 'student'
                  ? '🎓 Sign In as Student'
                  : '🏢 Sign In as Employer'}
            </button>
          </form>

          <p className="login-form__terms">
            By continuing, you agree to our{' '}
            <a href="#" className="login-form__link">Terms of Service</a> and{' '}
            <a href="#" className="login-form__link">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
