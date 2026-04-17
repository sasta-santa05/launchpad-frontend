// TrainingModal.jsx
import React, { useEffect, useState } from 'react';
import './TrainingModal.css';

function StarRating({ rating }) {
  const r = rating || 0;
  return (
    <div className="tmodal__stars">
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{
          color: i <= Math.round(r) ? '#FCD34D' : 'var(--text-muted)',
          fontSize: '1rem'
        }}>★</span>
      ))}
      <span style={{ fontWeight: 700, color: '#FCD34D', marginLeft: 6 }}>
        {r.toFixed(1)}
      </span>
    </div>
  );
}

export default function TrainingModal({ training, onClose }) {
  const [enrolledState, setEnrolledState] = useState(false);
  const [enrolling, setEnrolling]         = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  if (!training) return null;

  // Safe destructuring with defaults for both real and mock data
  const {
    id,
    title          = 'Untitled Course',
    category       = 'General',
    tagColor       = 'lavender',
    level          = 'Beginner',
    description    = '',
    duration       = '',
    price          = 0,
    originalPrice,
    rating         = 0,
    reviews        = 0,
    enrolled: enrolledCount = 0,
    whatYouLearn   = [],
    curriculum     = [],
    tags           = [],
    provider,
    providerLogo,
    logoColor,
  } = training;

  const color       = tagColor || 'lavender';
  const displayTags = Array.isArray(tags) && tags.length > 0 ? tags : [category];
  const logoText    = providerLogo || category?.slice(0, 2).toUpperCase() || '🎓';
  const discount    = originalPrice && originalPrice > price
    ? Math.round((1 - price / originalPrice) * 100)
    : null;

  // Use real curriculum if available, otherwise fallback
  const fallbackCurriculum = [
    'Introduction & Setup',
    'Core Concepts',
    'Hands-on Projects',
    'Advanced Topics',
    'Real-world Applications',
    'Final Project & Certification',
  ];
  const curriculumList = curriculum.length > 0
    ? curriculum.map(c => typeof c === 'string' ? c : c.title || c)
    : fallbackCurriculum;

  // Use real whatYouLearn if available, otherwise fallback
  const learnList = whatYouLearn.length > 0 ? whatYouLearn : [
    'Build real-world projects for your portfolio',
    'Industry-standard tools and workflows',
    'Job-ready skills validated by hiring managers',
    'Hands-on labs with real data and environments',
    'Mentorship from working professionals',
    'Certificate recognized by 500+ companies',
  ];

  const handleEnroll = async () => {
    const token    = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    if (!token || userRole !== 'student') {
      alert('Please log in as a student to enroll.');
      return;
    }
    setEnrolling(true);
    try {
      const res = await fetch(`http://localhost:8080/api/trainings/${id}/enroll`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setEnrolledState(true);
      else alert('Could not enroll. Please try again.');
    } catch { alert('Cannot connect to server.'); }
    finally { setEnrolling(false); }
  };

  return (
    <div className="tmodal__overlay" onClick={onClose}>
      <div className="tmodal__panel page-enter" onClick={e => e.stopPropagation()}>
        <button className="tmodal__close" onClick={onClose}>✕</button>

        {/* Header */}
        <div className="tmodal__header"
          style={{ '--thumb-color': logoColor || `var(--${color})` }}>
          <div className="tmodal__header-bg" />
          <div className="tmodal__header-content">
            <div className="tmodal__logo">{logoText}</div>
            <div>
              <div className="tmodal__tags">
                {displayTags.slice(0, 3).map(t => (
                  <span key={t} className={`tag tag-${color}`}>{t}</span>
                ))}
                <span className="tag tag-amber">🏆 Certificate</span>
              </div>
              <h2 className="tmodal__title">{title}</h2>
              <p className="tmodal__provider">by {provider || category}</p>
            </div>
          </div>
        </div>

        <div className="tmodal__body">
          {/* Left col */}
          <div className="tmodal__left">
            <div className="tmodal__stats-row">
              <StarRating rating={rating} />
              <span className="tmodal__stat-text">
                ({(reviews || 0).toLocaleString()} reviews)
              </span>
              <span className="tmodal__stat-divider">·</span>
              <span className="tmodal__stat-text">
                👥 {enrolledCount >= 1000
                  ? `${(enrolledCount / 1000).toFixed(1)}k`
                  : enrolledCount} students
              </span>
            </div>

            <div className="tmodal__meta-chips">
              {duration && <span className="tmodal__chip">📅 {duration}</span>}
              {level    && <span className="tmodal__chip">📶 {level}</span>}
              <span className="tmodal__chip">🌐 Online</span>
              <span className="tmodal__chip tmodal__chip--gold">🏆 Certificate Included</span>
            </div>

            <section className="tmodal__section">
              <h4 className="tmodal__section-title">About This Course</h4>
              <p className="tmodal__desc">{description}</p>
            </section>

            {learnList.length > 0 && (
              <section className="tmodal__section">
                <h4 className="tmodal__section-title">What You'll Learn</h4>
                <div className="tmodal__learn-grid">
                  {learnList.map((item, i) => (
                    <div key={i} className="tmodal__learn-item">
                      <span className="tmodal__learn-check">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="tmodal__section">
              <h4 className="tmodal__section-title">Curriculum Overview</h4>
              <div className="tmodal__curriculum">
                {curriculumList.map((chapter, i) => (
                  <div key={i} className="tmodal__chapter">
                    <span className="tmodal__chapter-num">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="tmodal__chapter-name">{chapter}</span>
                    <span className="tmodal__chapter-tag">Module</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right col — CTA */}
          <aside className="tmodal__cta-panel">
            <div className="tmodal__price-block">
              {price === 0
                ? <span className="tmodal__price" style={{ color: 'var(--mint)' }}>🆓 Free</span>
                : <>
                    <span className="tmodal__price">₹{price.toLocaleString()}</span>
                    {originalPrice && originalPrice > price && (
                      <>
                        <span className="tmodal__original">₹{originalPrice.toLocaleString()}</span>
                        {discount && <span className="tmodal__discount">{discount}% off</span>}
                      </>
                    )}
                  </>
              }
            </div>
            {price > 0 && <p className="tmodal__offer-note">⚡ Offer ends in 2 days</p>}

            <button
              className={`btn btn-lg tmodal__enroll-btn ${enrolledState ? 'tmodal__enroll-btn--done' : 'btn-primary'}`}
              onClick={handleEnroll}
              disabled={enrolledState || enrolling}>
              {enrolling ? '⏳ Enrolling...' : enrolledState ? '✓ Enrolled!' : '🎓 Enroll Now'}
            </button>
            <button className="btn btn-secondary btn-lg tmodal__wishlist-btn">
              ♡ Save for Later
            </button>

            <div className="tmodal__guarantees">
              {[
                '30-day money-back guarantee',
                'Lifetime access to course materials',
                'Access on mobile & desktop',
                'Direct mentor support',
              ].map(g => (
                <div key={g} className="tmodal__guarantee">
                  <span>✓</span><span>{g}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
