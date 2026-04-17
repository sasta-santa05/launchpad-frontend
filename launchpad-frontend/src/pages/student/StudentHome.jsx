// pages/student/StudentHome.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InternshipCard from '../../components/InternshipCard';
import './StudentHome.css';
import './StudentHomeNew.css';

export default function StudentHome({ user }) {
  const [internships, setInternships]   = useState([]);
  const [applications, setApplications] = useState([]);
  const [profile, setProfile]           = useState(null);
  const [loading, setLoading]           = useState(true);

  const token = localStorage.getItem('token');
  const name  = user?.name || localStorage.getItem('name') || 'Student';
  const firstName = name.split(' ')[0];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:8080/api/internships').then(r => r.json()),
      fetch('http://localhost:8080/api/applications/my', {
        headers: { Authorization: `Bearer ${token}` },
      }).then(r => r.json()),
      fetch('http://localhost:8080/api/students/profile', {
        headers: { Authorization: `Bearer ${token}` },
      }).then(r => r.json()),
    ])
      .then(([ints, apps, prof]) => {
        setInternships(Array.isArray(ints)  ? ints  : []);
        setApplications(Array.isArray(apps) ? apps  : []);
        setProfile(prof);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Profile completion
  const completion = () => {
    if (!profile) return 0;
    const fields = [
      profile.firstName, profile.lastName, profile.email, profile.phone,
      profile.college, profile.degree, profile.year, profile.cgpa,
      profile.skills?.length, profile.linkedin, profile.github,
    ];
    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  };

  const pct = completion();

  const STATS = [
    { icon: '📋', label: 'Applications',    value: applications.length,                                    color: 'lavender', link: '/student/applications' },
    { icon: '🎯', label: 'Profile Match',   value: `${pct}%`,                                              color: 'mint',     link: '/student/profile'      },
    { icon: '🎙️', label: 'Interviews',      value: applications.filter(a => a.status === 'interview').length, color: 'cyan',  link: '/student/applications' },
    { icon: '✅', label: 'Offers',          value: applications.filter(a => a.status === 'hired').length,  color: 'amber',    link: '/student/applications' },
  ];

  const recommended = internships.slice(0, 3);

  const recentActivity = applications.slice(0, 5).map(a => ({
    icon: '📥',
    text: `Applied to ${a.internshipRole}`,
    time: new Date(a.appliedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
    color: 'lavender',
  }));

  return (
    <div className="shome page-enter">
      {/* WELCOME BANNER */}
      <div className="shome__welcome">
        <div className="shome__welcome-orb" />
        <div className="shome__welcome-content">
          <p className="shome__greeting">{greeting}, {firstName} 👋</p>
          <h1 className="shome__headline">Ready to find your next opportunity?</h1>
          <p className="shome__sub">
            {applications.length > 0
              ? `You have ${applications.length} active application${applications.length > 1 ? 's' : ''}. Keep going!`
              : 'Start browsing internships and apply to your first one today.'}
          </p>
          <div className="shome__welcome-actions">
            <Link to="/student/browse" className="btn btn-primary">🔍 Browse Internships</Link>
            <Link to="/student/profile" className="btn btn-secondary">Complete Profile →</Link>
          </div>
        </div>

        {/* Profile completion ring */}
        <div className="shome__ring-wrap">
          <svg className="shome__ring" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="var(--bg-elevated)" strokeWidth="10" />
            <circle cx="60" cy="60" r="50" fill="none"
              stroke="var(--lavender)" strokeWidth="10" strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 50}`}
              strokeDashoffset={`${2 * Math.PI * 50 * (1 - pct / 100)}`}
              transform="rotate(-90 60 60)" />
            <text x="60" y="55" textAnchor="middle" fill="var(--text-primary)"
              fontSize="18" fontWeight="800" fontFamily="var(--font-display)">{pct}%</text>
            <text x="60" y="72" textAnchor="middle" fill="var(--text-muted)" fontSize="9">Profile</text>
          </svg>
        </div>
      </div>

      {/* STATS */}
      <div className="shome__stats">
        {STATS.map(s => (
          <Link key={s.label} to={s.link} className={`shome__stat shome__stat--${s.color}`}>
            <span className="shome__stat-icon">{s.icon}</span>
            <span className="shome__stat-value">{s.value}</span>
            <span className="shome__stat-label">{s.label}</span>
          </Link>
        ))}
      </div>

      <div className="shome__body">
        {/* LEFT */}
        <div className="shome__left">
          {/* RECOMMENDED INTERNSHIPS */}
          <section className="shome__section">
            <div className="shome__section-header">
              <h2 className="shome__section-title">Recommended Internships</h2>
              <Link to="/student/browse" className="shome__see-all">View all →</Link>
            </div>
            {loading ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Loading...</p>
            ) : recommended.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 'var(--space-xl)', color: 'var(--text-muted)' }}>
                <p>No internships available yet.</p>
                <p style={{ fontSize: '0.8rem', marginTop: '8px' }}>
                  Employers need to post internships first.
                </p>
              </div>
            ) : (
              <div className="shome__internships">
                {recommended.map(i => (
                  <InternshipCard
                    key={i.id}
                    internship={i}
                    variant="compact"
                    basePath="/student/browse"
                  />
                ))}
              </div>
            )}
          </section>

          {/* UPCOMING DEADLINES */}
          <section className="shome__section">
            <div className="shome__section-header">
              <h2 className="shome__section-title">Application Status</h2>
              <Link to="/student/applications" className="shome__see-all">View all →</Link>
            </div>
            {applications.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', padding: 'var(--space-md) 0' }}>
                No applications yet. Start applying to internships!
              </p>
            ) : (
              <div className="shome__deadlines">
                {applications.slice(0, 3).map(a => (
                  <div key={a.id} className="shome__deadline-item">
                    <div className={`shome__deadline-dot shome__deadline-dot--${
                      a.status === 'hired' ? 'mint' : a.status === 'interview' ? 'cyan' : a.status === 'shortlisted' ? 'amber' : a.status === 'rejected' ? 'peach' : 'lavender'
                    }`} />
                    <div className="shome__deadline-info">
                      <p className="shome__deadline-role">{a.internshipRole}</p>
                      <p className="shome__deadline-date">Status: <strong>{a.status?.charAt(0).toUpperCase() + a.status?.slice(1)}</strong></p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* RIGHT */}
        <div className="shome__right">
          {/* RECENT ACTIVITY */}
          <section className="shome__section">
            <div className="shome__section-header">
              <h2 className="shome__section-title">Recent Activity</h2>
            </div>
            {recentActivity.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', padding: 'var(--space-md) 0' }}>
                No recent activity.
              </p>
            ) : (
              <div className="shome__activity">
                {recentActivity.map((a, i) => (
                  <div key={i} className="shome__activity-item">
                    <span className="shome__activity-icon">{a.icon}</span>
                    <div className="shome__activity-info">
                      <p className="shome__activity-text">{a.text}</p>
                      <span className="shome__activity-time">{a.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* PROFILE NUDGE */}
          {pct < 100 && (
            <section className="shome__section shome__nudge">
              <div className="shome__nudge-icon">💡</div>
              <h3 className="shome__nudge-title">Complete your profile</h3>
              <p className="shome__nudge-sub">
                Profiles with {'>'}80% completion get 3x more employer views.
              </p>
              <Link to="/student/profile" className="btn btn-primary btn-sm" style={{ marginTop: 'var(--space-md)' }}>
                Complete Profile →
              </Link>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
