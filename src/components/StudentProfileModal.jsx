// StudentProfileModal.jsx
import React, { useEffect, useState } from 'react';
import './StudentProfileModal.css';

export default function StudentProfileModal({ student, onClose }) {
  const [contacted, setContacted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  if (!student) return null;

  const {
    name, initials, avatarColor, college, degree, year,
    skills, openTo, bio, location, remote, domain, domainColor,
    gpa, projects, certifications
  } = student;

  const colorMap = {
    lavender: { accent: '#C4B5FD', dim: 'rgba(196,181,253,0.12)' },
    mint:     { accent: '#86EFAC', dim: 'rgba(134,239,172,0.12)' },
    peach:    { accent: '#FCA5A5', dim: 'rgba(252,165,165,0.12)' },
    cyan:     { accent: '#67E8F9', dim: 'rgba(103,232,249,0.12)' },
    amber:    { accent: '#FCD34D', dim: 'rgba(252,211,77,0.12)'  },
  };
  const colors = colorMap[domainColor] || colorMap.lavender;

  return (
    <div className="sprofile-overlay" onClick={onClose}>
      <div className="sprofile-panel page-enter" onClick={e => e.stopPropagation()}>
        <button className="sprofile-close" onClick={onClose}>✕</button>

        {/* Header band */}
        <div className="sprofile-header" style={{ '--scolor': colors.accent, '--scolor-dim': colors.dim }}>
          <div className="sprofile-header__bg" />
          <div className="sprofile-header__content">
            <div className="sprofile-avatar" style={{ borderColor: colors.accent, color: colors.accent }}>
              {initials}
            </div>
            <div className="sprofile-header__info">
              <h2 className="sprofile-name">{name}</h2>
              <p className="sprofile-college">{degree} · {college}</p>
              <p className="sprofile-year">{year} · 📍 {remote ? `${location} (Open to Remote)` : location}</p>
              <div className="sprofile-open-to">
                {openTo.map(o => (
                  <span key={o} className="sprofile-badge" style={{ background: colors.dim, color: colors.accent }}>
                    {o === 'Internship' ? '🎓' : '💼'} Open to {o}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="sprofile-body">
          {/* Left */}
          <div className="sprofile-left">
            {/* Stats row */}
            <div className="sprofile-stats">
              {[
                { icon: '⭐', label: 'GPA', value: gpa },
                { icon: '🚀', label: 'Projects', value: projects },
                { icon: '🏆', label: 'Certs', value: certifications },
              ].map(s => (
                <div key={s.label} className="sprofile-stat">
                  <span className="sprofile-stat__icon">{s.icon}</span>
                  <span className="sprofile-stat__value" style={{ color: colors.accent }}>{s.value}</span>
                  <span className="sprofile-stat__label">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Bio */}
            <section className="sprofile-section">
              <h4 className="sprofile-section-title">About</h4>
              <p className="sprofile-bio">{bio}</p>
            </section>

            {/* Skills */}
            <section className="sprofile-section">
              <h4 className="sprofile-section-title">Skills</h4>
              <div className="sprofile-skills">
                {skills.map(skill => (
                  <span
                    key={skill}
                    className="sprofile-skill-tag"
                    style={{ background: colors.dim, color: colors.accent }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Activity */}
            <section className="sprofile-section">
              <h4 className="sprofile-section-title">Activity</h4>
              <div className="sprofile-activity">
                {[
                  { icon: '💻', text: `${projects} projects on GitHub` },
                  { icon: '📄', text: 'Resume verified & up to date' },
                  { icon: '🏆', text: `${certifications} industry certifications` },
                  { icon: '🌐', text: remote ? 'Available for remote roles' : 'Prefers on-site' },
                ].map(a => (
                  <div key={a.text} className="sprofile-activity-item">
                    <span>{a.icon}</span>
                    <span>{a.text}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right CTA */}
          <aside className="sprofile-cta">
            <div className="sprofile-cta__card">
              <h4 className="sprofile-cta__title">Interested in {name.split(' ')[0]}?</h4>
              <p className="sprofile-cta__sub">Send a message or schedule a quick intro call.</p>

              <button
                className={`btn btn-lg sprofile-cta__btn ${contacted ? 'sprofile-cta__btn--done' : 'btn-primary'}`}
                style={!contacted ? { background: colors.accent, color: '#0D1017' } : {}}
                onClick={() => setContacted(true)}
                disabled={contacted}
              >
                {contacted ? '✓ Request Sent!' : '✉️ Contact Candidate'}
              </button>

              <button className="btn btn-secondary btn-lg sprofile-cta__btn">
                📄 Download Resume
              </button>

              <div className="sprofile-cta__divider" />

              <div className="sprofile-cta__details">
                {[
                  { label: 'Domain', value: domain },
                  { label: 'Location', value: location },
                  { label: 'Availability', value: 'Immediate' },
                  { label: 'Preferred Mode', value: remote ? 'Remote / Hybrid' : 'On-site' },
                ].map(d => (
                  <div key={d.label} className="sprofile-cta__row">
                    <span className="sprofile-cta__label">{d.label}</span>
                    <span className="sprofile-cta__value">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="sprofile-cta__login-note">
              <span>🔒</span>
              <p>Login as employer to unlock full contact details, portfolio link, and direct messaging.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
