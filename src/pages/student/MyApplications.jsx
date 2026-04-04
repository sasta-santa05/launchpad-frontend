// pages/student/MyApplications.jsx
import React, { useState, useEffect } from 'react';
import './MyApplicationsExtra.css';

const STATUS_COLOR = {
  applied:     'status-applied',
  shortlisted: 'status-review',
  interview:   'status-interview',
  hired:       'status-offer',
  rejected:    'status-rejected',
};

const STATUS_STEPS = ['applied', 'shortlisted', 'interview', 'hired'];

function StatusTracker({ status }) {
  const currentIndex = STATUS_STEPS.indexOf(status);
  return (
    <div className="status-tracker">
      {STATUS_STEPS.map((step, i) => (
        <div key={step}
          className={`status-tracker__step ${i <= currentIndex ? 'status-tracker__step--done' : ''}`}>
          <div className="status-tracker__dot" />
          <span className="status-tracker__label">
            {step.charAt(0).toUpperCase() + step.slice(1)}
          </span>
          {i < STATUS_STEPS.length - 1 && <div className="status-tracker__line" />}
        </div>
      ))}
    </div>
  );
}

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState('');
  const [expanded, setExpanded]         = useState(null);
  const [filter, setFilter]             = useState('all');
  const [withdrawing, setWithdrawing]   = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/api/applications/my', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setApplications(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load applications.');
        setLoading(false);
      });
  }, []);

  const handleWithdraw = async (applicationId) => {
    if (!window.confirm('Are you sure you want to withdraw?')) return;
    setWithdrawing(applicationId);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:8080/api/applications/${applicationId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setApplications(prev => prev.filter(a => a.id !== applicationId));
    } catch {
      alert('Could not withdraw. Please try again.');
    } finally {
      setWithdrawing(null);
    }
  };

  const filtered = filter === 'all'
    ? applications
    : applications.filter(a => a.status === filter);

  const STATS = [
    { label: 'Total Applied', value: applications.length },
    { label: 'In Review',     value: applications.filter(a => a.status === 'shortlisted').length },
    { label: 'Interviews',    value: applications.filter(a => a.status === 'interview').length },
    { label: 'Offers',        value: applications.filter(a => a.status === 'hired').length },
  ];

  return (
    <div className="my-apps page-enter">
      <h1 className="dashboard-title">My Applications</h1>

      {/* Stats */}
      <div className="my-apps__stats">
        {STATS.map(s => (
          <div key={s.label} className="my-apps__stat">
            <span className="my-apps__stat-value">{s.value}</span>
            <span className="my-apps__stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Filter chips */}
      <div className="my-apps__filters">
        {['all', 'applied', 'shortlisted', 'interview', 'hired', 'rejected'].map(f => (
          <button key={f}
            className={`filter-chip ${filter === f ? 'filter-chip--active' : ''}`}
            onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {loading && (
        <div className="ilist__empty">
          <span className="ilist__empty-icon">⏳</span>
          <h3>Loading applications...</h3>
        </div>
      )}

      {error && (
        <div className="ilist__empty">
          <span className="ilist__empty-icon">⚠️</span>
          <h3>{error}</h3>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="ilist__empty">
          <span className="ilist__empty-icon">📭</span>
          <h3>No applications yet</h3>
          <p>Start applying to internships to track them here.</p>
        </div>
      )}

      {!loading && !error && filtered.map(app => (
        <div key={app.id}
          className={`app-card ${expanded === app.id ? 'app-card--expanded' : ''}`}
          onClick={() => setExpanded(expanded === app.id ? null : app.id)}>
          <div className="app-card__info">
            <h4>{app.internshipRole}</h4>
            <p>Applied on {new Date(app.appliedDate).toLocaleDateString('en-IN', {
              day: 'numeric', month: 'short', year: 'numeric',
            })}</p>
            {app.note && <p className="app-card__note">📝 {app.note}</p>}
          </div>
          <div className="app-card__right">
            <span className={`status-badge ${STATUS_COLOR[app.status] || 'status-applied'}`}>
              {app.status?.charAt(0).toUpperCase() + app.status?.slice(1)}
            </span>
          </div>

          {expanded === app.id && (
            <div className="app-card__detail" onClick={e => e.stopPropagation()}>
              <StatusTracker status={app.status} />
              {app.status !== 'hired' && app.status !== 'rejected' && (
                <button
                  className="btn btn-sm"
                  style={{
                    background: 'var(--peach-dim)', color: 'var(--peach)',
                    border: '1px solid rgba(252,165,165,0.2)', marginTop: 'var(--space-md)',
                  }}
                  disabled={withdrawing === app.id}
                  onClick={() => handleWithdraw(app.id)}>
                  {withdrawing === app.id ? '⏳ Withdrawing...' : 'Withdraw Application'}
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
