// pages/NotFound.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const dashboardLink = role === 'student'
    ? '/student'
    : role === 'employer'
    ? '/employer'
    : '/';

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-xl)',
      padding: 'var(--space-2xl)',
      textAlign: 'center',
      background: 'var(--bg-base)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background orbs */}
      <div style={{
        position: 'absolute', width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(196,181,253,0.08), transparent 70%)',
        top: '-100px', right: '-100px', filter: 'blur(80px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(134,239,172,0.06), transparent 70%)',
        bottom: '-80px', left: '-80px', filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(6rem, 20vw, 12rem)',
          fontWeight: 800,
          color: 'var(--lavender)',
          opacity: 0.15,
          lineHeight: 1,
          marginBottom: '-20px',
        }}>
          404
        </div>

        <div style={{ fontSize: '3rem', marginBottom: 'var(--space-lg)' }}>🔭</div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          color: 'var(--text-primary)',
          marginBottom: 'var(--space-md)',
        }}>
          Page not found
        </h1>

        <p style={{
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          maxWidth: '400px',
          lineHeight: 1.7,
          marginBottom: 'var(--space-xl)',
        }}>
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            ← Go Back
          </button>
          <Link to={dashboardLink} className="btn btn-primary">
            🏠 Go to Dashboard
          </Link>
          <Link to="/internships" className="btn btn-secondary">
            🔍 Browse Internships
          </Link>
        </div>
      </div>
    </div>
  );
}
