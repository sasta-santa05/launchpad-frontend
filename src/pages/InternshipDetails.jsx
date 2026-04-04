/* InternshipDetails.jsx */
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import InternshipCard from '../components/InternshipCard';

export default function InternshipDetails({ backPath = '/internships' }) {
  const { id } = useParams();
  const [internship, setInternship] = useState(null);
  const [similar, setSimilar]       = useState([]);
  const [loading, setLoading]       = useState(true);
  const [applied, setApplied]       = useState(false);
  const [applying, setApplying]     = useState(false);
  const [saved, setSaved]           = useState(false);

  const token    = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8080/api/internships/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setInternship(data);
        setLoading(false);
      })
      .catch(() => {
        setInternship(null);
        setLoading(false);
      });
  }, [id]);

  // Fetch similar internships after main one loads
  useEffect(() => {
    if (!internship) return;
    fetch('http://localhost:8080/api/internships')
      .then(res => res.json())
      .then(all => {
        if (Array.isArray(all)) {
          setSimilar(
            all.filter(i => i.id !== id && i.category === internship.category).slice(0, 2)
          );
        }
      })
      .catch(() => {});
  }, [internship, id]);

  const handleApply = async () => {
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
      if (res.ok) setApplied(true);
      else alert(data.error || 'Could not apply. You may have already applied to this internship.');
    } catch {
      alert('Cannot connect to server.');
    } finally {
      setApplying(false);
    }
  };

  if (loading) return (
    <div className="idetail__not-found page-enter">
      <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>⏳</div>
      <h2>Loading internship...</h2>
    </div>
  );

  if (!internship) return (
    <div className="idetail__not-found page-enter">
      <h2>Internship not found</h2>
      <Link to={backPath} className="btn btn-primary">Browse All Internships</Link>
    </div>
  );

  const {
    role, location, remote, stipend, duration,
    tags = [], skills = [], tagColor,
    description, responsibilities, requirements,
    openings = 1, applicants = 0, category,
    perks = [], postedDate,
  } = internship;

  const color        = tagColor || 'lavender';
  const displayTags  = (skills.length > 0 ? skills : tags).filter(Boolean);
  const logoText     = (category || 'IN').slice(0, 2).toUpperCase();

  const responsibilityList = typeof responsibilities === 'string'
    ? responsibilities.split('\n').filter(s => s.trim())
    : Array.isArray(responsibilities) ? responsibilities : [];

  return (
    <div className="idetail page-enter">
      {/* BANNER */}
      <div className="idetail__banner" style={{ '--accent': `var(--${color})` }}>
        <div className="idetail__banner-glow"></div>
        <div className="container idetail__banner-inner">
          <Link to={backPath} className="idetail__back">← Back to Internships</Link>
          <div className="idetail__banner-main">
            <div className="idetail__banner-logo" style={{ color: `var(--${color})` }}>
              {logoText}
            </div>
            <div className="idetail__banner-info">
              <div className="idetail__category-tag">
                <span className={`tag tag-${color}`}>{category}</span>
                {remote && <span className="tag tag-mint">🌐 Remote</span>}
              </div>
              <h1 className="idetail__role">{role}</h1>
              <div className="idetail__company-row">
                <span className="idetail__location">
                  📍 {remote ? 'Remote' : location}
                </span>
                <span className="idetail__separator">·</span>
                <span className="idetail__openings">
                  {openings} Opening{openings > 1 ? 's' : ''}
                </span>
                {postedDate && (
                  <>
                    <span className="idetail__separator">·</span>
                    <span className="idetail__openings">
                      Posted {new Date(postedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="container idetail__body">
        {/* LEFT */}
        <div className="idetail__content">

          {description && (
            <section className="idetail__section">
              <h3 className="idetail__section-title">Role Description</h3>
              <p>{description}</p>
            </section>
          )}

          {responsibilityList.length > 0 && (
            <>
              <div className="divider"></div>
              <section className="idetail__section">
                <h3 className="idetail__section-title">Responsibilities</h3>
                <ul className="idetail__list">
                  {responsibilityList.map((r, i) => (
                    <li key={i} className="idetail__list-item">
                      <span className="idetail__list-bullet">✦</span>{r}
                    </li>
                  ))}
                </ul>
              </section>
            </>
          )}

          {requirements && (
            <>
              <div className="divider"></div>
              <section className="idetail__section">
                <h3 className="idetail__section-title">Requirements</h3>
                <p>{requirements}</p>
              </section>
            </>
          )}

          {displayTags.length > 0 && (
            <>
              <div className="divider"></div>
              <section className="idetail__section">
                <h3 className="idetail__section-title">Skills Required</h3>
                <div className="idetail__skills">
                  {displayTags.map(s => (
                    <span key={s} className={`tag tag-${color} idetail__skill-tag`}>{s}</span>
                  ))}
                </div>
              </section>
            </>
          )}

          {perks.length > 0 && (
            <>
              <div className="divider"></div>
              <section className="idetail__section">
                <h3 className="idetail__section-title">Perks & Benefits</h3>
                <div className="idetail__skills">
                  {perks.map(p => (
                    <span key={p} className="tag tag-mint">✓ {p}</span>
                  ))}
                </div>
              </section>
            </>
          )}

          {similar.length > 0 && (
            <>
              <div className="divider"></div>
              <section className="idetail__section">
                <h3 className="idetail__section-title">Similar Opportunities</h3>
                <div className="idetail__similar-grid">
                  {similar.map(i => (
                    <InternshipCard key={i.id} internship={i} variant="compact" basePath={backPath} />
                  ))}
                </div>
              </section>
            </>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="idetail__sidebar">
          <div className="idetail__apply-panel">
            <div className="idetail__stats-grid">
              {[
                { icon: '💰', label: 'Stipend',    value: `₹${stipend?.toLocaleString()}/mo` },
                { icon: '📅', label: 'Duration',   value: duration },
                { icon: '👥', label: 'Openings',   value: `${openings} position${openings > 1 ? 's' : ''}` },
                { icon: '📈', label: 'Applicants', value: `${applicants}+` },
              ].map(stat => (
                <div key={stat.label} className="idetail__stat">
                  <span className="idetail__stat-icon">{stat.icon}</span>
                  <div>
                    <span className="idetail__stat-label">{stat.label}</span>
                    <span className="idetail__stat-value">{stat.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="divider" style={{ margin: '0' }}></div>

            {displayTags.length > 0 && (
              <div className="idetail__panel-tags">
                {displayTags.slice(0, 5).map(t => (
                  <span key={t} className={`tag tag-${color}`}>{t}</span>
                ))}
              </div>
            )}

            {/* Apply CTA */}
            {token && userRole === 'student' ? (
              <button
                className={`btn btn-lg idetail__apply-btn ${!applied ? 'btn-primary' : ''}`}
                style={applied ? {
                  background: 'var(--mint-dim)', color: 'var(--mint)',
                  border: '1.5px solid var(--mint)', cursor: 'default',
                } : {}}
                onClick={handleApply}
                disabled={applying || applied}>
                {applying ? '⏳ Applying...' : applied ? '✓ Application Submitted!' : '🚀 Apply Now'}
              </button>
            ) : (
              <Link to="/login" className="btn btn-primary btn-lg idetail__apply-btn">
                Login to Apply
              </Link>
            )}

            <button
              className={`btn idetail__save-btn ${saved ? 'idetail__save-btn--saved' : 'btn-ghost'}`}
              onClick={() => setSaved(!saved)}>
              {saved ? '♥ Saved' : '♡ Save for Later'}
            </button>

            <p className="idetail__apply-note">
              🔐 Applications are tracked in your student dashboard.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
