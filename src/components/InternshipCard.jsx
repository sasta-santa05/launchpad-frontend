/* InternshipCard.jsx */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './InternshipCard.css';

export default function InternshipCard({ internship, variant = 'default', basePath = '/internships' }) {
  const {
    id, role, category, location, remote, stipend,
    duration, skills = [], tagColor, description,
    openings = 1, featured,
  } = internship;

  const [applied, setApplied]   = useState(false);
  const [applying, setApplying] = useState(false);

  const handleApply = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const token    = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    if (!token || userRole !== 'student') {
      alert('Please log in as a student to apply.');
      return;
    }

    setApplying(true);
    try {
      const res = await fetch('http://localhost:8080/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ internshipId: id }),
      });

      const data = await res.json();
      if (res.ok) {
        setApplied(true);
      } else {
        alert(data.error || 'Could not apply. Please try again.');
      }
    } catch {
      alert('Cannot connect to server. Make sure backend is running.');
    } finally {
      setApplying(false);
    }
  };

  const displayTags = skills.length > 0 ? skills : (internship.tags || []);
  const color = tagColor || 'lavender';

  return (
    <Link to={`${basePath}/${id}`} className={`icard icard--${variant}`}>
      <div className="icard__header">
        <div className="icard__logo" style={{ '--logo-color': `var(--${color})` }}>
          {category?.slice(0, 2).toUpperCase() || 'IN'}
        </div>
        <div className="icard__meta">
          <h4 className="icard__role">{role}</h4>
          <span className="icard__company">{category}</span>
        </div>
      </div>

      <div className="icard__badges">
        {featured && <span className="icard__badge icard__badge--featured">Featured</span>}
        <span className={`icard__remote-badge ${remote ? 'icard__remote-badge--yes' : ''}`}>
          {remote ? '🌐 Remote' : `📍 ${location}`}
        </span>
      </div>

      {variant !== 'compact' && (
        <p className="icard__desc">{description}</p>
      )}

      <div className="icard__tags">
        {displayTags.slice(0, 4).map(tag => (
          <span key={tag} className={`tag tag-${color}`}>{tag}</span>
        ))}
      </div>

      <div className="icard__footer">
        <div className="icard__stats">
          <span className="icard__stat">
            <span className="icard__stat-icon">💰</span>
            ₹{stipend?.toLocaleString()}/mo
          </span>
          <span className="icard__stat">
            <span className="icard__stat-icon">📅</span>
            {duration}
          </span>
          <span className="icard__stat">
            <span className="icard__stat-icon">👥</span>
            {openings} opening{openings > 1 ? 's' : ''}
          </span>
        </div>

        <button
          className={`icard__apply-btn ${applied ? 'icard__apply-btn--applied' : ''}`}
          onClick={handleApply}
          disabled={applying || applied}>
          {applying ? '⏳' : applied ? '✓ Applied' : 'Apply'}
        </button>
      </div>
    </Link>
  );
}
