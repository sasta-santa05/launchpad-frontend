// pages/employer/CompanyDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CompanyDashboard.css';

const STATUS_COLOR = { active: 'mint', paused: 'amber', closed: 'peach' };

export default function CompanyDashboard() {
  const [internships, setInternships]   = useState([]);
  const [applicants, setApplicants]     = useState([]);
  const [trainings, setTrainings]       = useState([]);
  const [profile, setProfile]           = useState(null);
  const [loading, setLoading]           = useState(true);

  const token = localStorage.getItem('token');
  const name  = localStorage.getItem('name') || 'Company';

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:8080/api/internships/employer/my',  { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
      fetch('http://localhost:8080/api/applications/employer',    { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
      fetch('http://localhost:8080/api/trainings/employer/my',    { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
      fetch('http://localhost:8080/api/employers/profile',        { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
    ]).then(([ints, apps, trns, prof]) => {
      setInternships(Array.isArray(ints) ? ints : []);
      setApplicants(Array.isArray(apps) ? apps : []);
      setTrainings(Array.isArray(trns) ? trns : []);
      setProfile(prof);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const totalApplicants = applicants.length;
  const totalHired      = applicants.filter(a => a.status === 'hired').length;
  const activeRoles     = internships.filter(i => i.status === 'active').length;
  const recentApplicants = [...applicants]
    .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
    .slice(0, 5);

  const STATS = [
    { icon: '📋', label: 'Active Roles',     value: activeRoles,       color: 'lavender', link: '/employer/internships' },
    { icon: '👥', label: 'Total Applicants', value: totalApplicants,   color: 'mint',     link: '/employer/applicants'  },
    { icon: '✅', label: 'Hired',            value: totalHired,        color: 'cyan',     link: '/employer/applicants'  },
    { icon: '🎓', label: 'Trainings',        value: trainings.length,  color: 'amber',    link: '/employer/trainings'   },
  ];

  const logoText  = (profile?.name || name)?.slice(0, 2).toUpperCase() || 'CO';
  const companyName = profile?.name || name;
  const tagline   = profile?.tagline || 'Welcome to your employer dashboard';

  return (
    <div className="emp-dash page-enter">

      {/* WELCOME BANNER */}
      <div className="emp-dash__welcome">
        <div className="emp-dash__welcome-orb" />
        <div className="emp-dash__welcome-left">
          <div className="emp-dash__company-logo" style={{ '--cl': '#C4B5FD' }}>
            {logoText}
          </div>
          <div>
            <p className="emp-dash__welcome-label">Welcome back</p>
            <h1 className="emp-dash__welcome-name">{companyName}</h1>
            <p className="emp-dash__welcome-sub">{tagline}</p>
          </div>
        </div>
        <div className="emp-dash__welcome-actions">
          <Link to="/employer/post-internship" className="btn btn-primary">+ Post Internship</Link>
          <Link to="/employer/post-training"   className="btn btn-secondary">+ Post Training</Link>
        </div>
      </div>

      {loading ? (
        <div className="ilist__empty"><span className="ilist__empty-icon">⏳</span><h3>Loading dashboard...</h3></div>
      ) : (
        <>
          {/* STATS */}
          <div className="emp-dash__stats">
            {STATS.map(s => (
              <Link key={s.label} to={s.link} className={`emp-dash__stat-card emp-dash__stat-card--${s.color}`}>
                <span className="emp-dash__stat-icon">{s.icon}</span>
                <span className="emp-dash__stat-value">{s.value}</span>
                <span className="emp-dash__stat-label">{s.label}</span>
                <div className="emp-dash__stat-glow" />
              </Link>
            ))}
          </div>

          <div className="emp-dash__body">
            {/* ACTIVE LISTINGS */}
            <section className="emp-dash__section emp-dash__listings">
              <div className="emp-dash__section-header">
                <h2 className="emp-dash__section-title">Active Listings</h2>
                <Link to="/employer/internships" className="emp-dash__see-all">Manage all →</Link>
              </div>
              {internships.filter(i => i.status !== 'closed').length === 0 ? (
                <div style={{ textAlign:'center', padding:'var(--space-xl)', color:'var(--text-muted)' }}>
                  <p>No active listings yet.</p>
                  <Link to="/employer/post-internship" className="btn btn-primary btn-sm" style={{ marginTop:'8px' }}>Post your first role →</Link>
                </div>
              ) : (
                <div className="emp-dash__listings-list">
                  {internships.filter(i => i.status !== 'closed').map(i => (
                    <div key={i.id} className="emp-dash__listing-row">
                      <div className="emp-dash__listing-info">
                        <span className={`tag tag-${i.tagColor || 'lavender'}`}>{i.category}</span>
                        <div>
                          <p className="emp-dash__listing-role">{i.role}</p>
                          <p className="emp-dash__listing-meta">
                            {i.remote ? '🌐 Remote' : `📍 ${i.location}`} · ₹{i.stipend?.toLocaleString()}/mo · {i.duration}
                          </p>
                        </div>
                      </div>
                      <div className="emp-dash__listing-right">
                        <div className="emp-dash__listing-counts">
                          <span className="emp-dash__count"><strong>{i.applicants || 0}</strong> applied</span>
                          <span className="emp-dash__count"><strong>{i.shortlisted || 0}</strong> shortlisted</span>
                        </div>
                        <span className={`emp-dash__status-badge emp-dash__status-badge--${STATUS_COLOR[i.status]}`}>
                          {i.status}
                        </span>
                        <Link to="/employer/applicants" className="btn btn-secondary btn-sm">View →</Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* RECENT APPLICANTS */}
            <section className="emp-dash__section emp-dash__recent">
              <div className="emp-dash__section-header">
                <h2 className="emp-dash__section-title">Recent Applicants</h2>
                <Link to="/employer/applicants" className="emp-dash__see-all">View all →</Link>
              </div>
              {recentApplicants.length === 0 ? (
                <p style={{ color:'var(--text-muted)', fontSize:'0.85rem', textAlign:'center', padding:'var(--space-lg)' }}>
                  No applicants yet. Post an internship to get started.
                </p>
              ) : (
                <div className="emp-dash__applicants-list">
                  {recentApplicants.map(a => (
                    <div key={a.id} className="emp-dash__applicant-row">
                      <div className="emp-dash__applicant-av" style={{ '--av': '#C4B5FD' }}>
                        {a.studentId?.slice(-2).toUpperCase() || 'ST'}
                      </div>
                      <div className="emp-dash__applicant-info">
                        <p className="emp-dash__applicant-name">Applicant #{a.studentId?.slice(-4)}</p>
                        <p className="emp-dash__applicant-meta">{a.internshipRole}</p>
                      </div>
                      <span className={`emp-dash__pipeline-badge emp-dash__pipeline-badge--${a.status}`}>
                        {a.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </>
      )}
    </div>
  );
}
