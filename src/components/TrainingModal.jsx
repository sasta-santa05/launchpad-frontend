// TrainingModal.jsx
import React, { useEffect, useState } from 'react';
import './TrainingModal.css';

function StarRating({ rating }) {
  return (
    <div className="tmodal__stars">
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= Math.round(rating) ? '#FCD34D' : 'var(--text-muted)', fontSize: '1rem' }}>★</span>
      ))}
      <span style={{ fontWeight: 700, color: '#FCD34D', marginLeft: 6 }}>{rating}</span>
    </div>
  );
}

// Curriculum chapters per category
const curriculumMap = {
  Development: ['HTML, CSS & JavaScript Fundamentals', 'React & Component Architecture', 'Node.js & Express APIs', 'MongoDB & Database Design', 'Deployment & DevOps Basics', 'Capstone Projects'],
  'Data Science': ['Python & Numpy Foundations', 'Pandas for Data Wrangling', 'Machine Learning Algorithms', 'Deep Learning with TensorFlow', 'NLP & Computer Vision', 'Capstone: End-to-End ML Pipeline'],
  Design: ['Design Thinking & Research', 'Wireframing & Information Architecture', 'Figma Mastery', 'Prototyping & Animation', 'Portfolio Projects', 'Design Handoff & Collaboration'],
  DevOps: ['Linux & Bash Scripting', 'Docker & Containerization', 'Kubernetes Orchestration', 'CI/CD Pipelines', 'AWS Cloud Services', 'Monitoring & Incident Response'],
  Marketing: ['SEO Fundamentals', 'Content Strategy', 'Google & Meta Ads', 'Email Marketing Automation', 'Analytics & Reporting', 'Growth Hacking Techniques'],
  Web3: ['Blockchain Fundamentals', 'Solidity Programming', 'Smart Contract Development', 'DeFi Protocols', 'NFT & Token Standards', 'Deploying to Mainnet'],
};

export default function TrainingModal({ training, onClose }) {
  const [enrolled, setEnrolled] = useState(false);

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

  const { title, provider, providerLogo, logoColor, rating, reviews,
          duration, level, price, originalPrice, tags, tagColor,
          enrolled: enrolledCount, certificate, description, category } = training;

  const discount = Math.round((1 - price / originalPrice) * 100);
  const curriculum = curriculumMap[category] || curriculumMap['Development'];

  return (
    <div className="tmodal__overlay" onClick={onClose}>
      <div className="tmodal__panel page-enter" onClick={e => e.stopPropagation()}>
        {/* Close */}
        <button className="tmodal__close" onClick={onClose}>✕</button>

        {/* Header */}
        <div className="tmodal__header" style={{ '--thumb-color': logoColor }}>
          <div className="tmodal__header-bg" />
          <div className="tmodal__header-content">
            <div className="tmodal__logo">{providerLogo}</div>
            <div>
              <div className="tmodal__tags">
                {tags.map(t => (
                  <span key={t} className={`tag tag-${tagColor}`}>{t}</span>
                ))}
                {certificate && <span className="tag tag-amber">🏆 Certificate</span>}
              </div>
              <h2 className="tmodal__title">{title}</h2>
              <p className="tmodal__provider">by {provider}</p>
            </div>
          </div>
        </div>

        <div className="tmodal__body">
          {/* Left col */}
          <div className="tmodal__left">
            {/* Stats row */}
            <div className="tmodal__stats-row">
              <StarRating rating={rating} />
              <span className="tmodal__stat-text">({reviews.toLocaleString()} reviews)</span>
              <span className="tmodal__stat-divider">·</span>
              <span className="tmodal__stat-text">👥 {(enrolledCount/1000).toFixed(1)}k students</span>
            </div>

            <div className="tmodal__meta-chips">
              <span className="tmodal__chip">📅 {duration}</span>
              <span className="tmodal__chip">📶 {level}</span>
              <span className="tmodal__chip">🌐 Online</span>
              {certificate && <span className="tmodal__chip tmodal__chip--gold">🏆 Certificate Included</span>}
            </div>

            {/* Description */}
            <section className="tmodal__section">
              <h4 className="tmodal__section-title">About This Course</h4>
              <p className="tmodal__desc">{description} This program is designed to take you from foundational concepts to production-level proficiency through hands-on projects, live mentorship sessions, and a structured curriculum used by top companies to upskill their teams.</p>
            </section>

            {/* What you'll learn */}
            <section className="tmodal__section">
              <h4 className="tmodal__section-title">What You'll Learn</h4>
              <div className="tmodal__learn-grid">
                {['Build real-world projects for your portfolio', 'Industry-standard tools and workflows', 'Job-ready skills validated by hiring managers', 'Hands-on labs with real data and environments', 'Mentorship from working professionals', 'Certificate recognized by 500+ companies'].map(item => (
                  <div key={item} className="tmodal__learn-item">
                    <span className="tmodal__learn-check">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum */}
            <section className="tmodal__section">
              <h4 className="tmodal__section-title">Curriculum Overview</h4>
              <div className="tmodal__curriculum">
                {curriculum.map((chapter, i) => (
                  <div key={chapter} className="tmodal__chapter">
                    <span className="tmodal__chapter-num">{String(i+1).padStart(2,'0')}</span>
                    <span className="tmodal__chapter-name">{chapter}</span>
                    <span className="tmodal__chapter-tag">Module</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right col — sticky CTA */}
          <aside className="tmodal__cta-panel">
            <div className="tmodal__price-block">
              <span className="tmodal__price">₹{price.toLocaleString()}</span>
              <span className="tmodal__original">₹{originalPrice.toLocaleString()}</span>
              <span className="tmodal__discount">{discount}% off</span>
            </div>
            <p className="tmodal__offer-note">⚡ Offer ends in 2 days</p>

            <button
              className={`btn btn-lg tmodal__enroll-btn ${enrolled ? 'tmodal__enroll-btn--done' : 'btn-primary'}`}
              onClick={() => setEnrolled(true)}
              disabled={enrolled}
            >
              {enrolled ? '✓ Enrolled!' : '🎓 Enroll Now'}
            </button>
            <button className="btn btn-secondary btn-lg tmodal__wishlist-btn">
              ♡ Save for Later
            </button>

            <div className="tmodal__guarantees">
              {['30-day money-back guarantee', 'Lifetime access to course materials', 'Access on mobile & desktop', 'Direct mentor support'].map(g => (
                <div key={g} className="tmodal__guarantee">
                  <span>✓</span>
                  <span>{g}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
