// pages/employer/ViewApplicants.jsx
import React, { useState, useEffect } from 'react';
import './ViewApplicants.css';

const PIPELINE = [
  { key: 'applied',     label: 'Applied',     color: 'lavender', icon: '📥' },
  { key: 'shortlisted', label: 'Shortlisted',  color: 'amber',    icon: '⭐' },
  { key: 'interview',   label: 'Interview',    color: 'cyan',     icon: '🎙️' },
  { key: 'hired',       label: 'Hired',        color: 'mint',     icon: '✅' },
  { key: 'rejected',    label: 'Rejected',     color: 'peach',    icon: '✕'  },
];

const MOVES = {
  applied:     ['shortlisted', 'rejected'],
  shortlisted: ['interview',   'rejected'],
  interview:   ['hired',       'rejected'],
  hired:       [],
  rejected:    [],
};

function ApplicantCard({ applicant, onMove, onSelect }) {
  const moves = MOVES[applicant.status] || [];
  return (
    <div className="vapp__card" onClick={() => onSelect(applicant)}>
      <div className="vapp__card-header">
        <div className="vapp__avatar" style={{ '--av': '#C4B5FD' }}>
          {applicant.studentId?.slice(0, 2).toUpperCase() || 'ST'}
        </div>
        <div className="vapp__card-meta">
          <p className="vapp__card-name">{applicant.internshipRole}</p>
          <p className="vapp__card-college">Applied: {new Date(applicant.appliedDate).toLocaleDateString('en-IN', { day:'numeric', month:'short' })}</p>
        </div>
      </div>
      {applicant.note && <p style={{ fontSize:'0.75rem', color:'var(--text-muted)', margin:'4px 0' }}>📝 {applicant.note}</p>}
      <div className="vapp__card-date">ID: {applicant.studentId?.slice(-6)}</div>
      {moves.length > 0 && (
        <div className="vapp__card-moves" onClick={e => e.stopPropagation()}>
          {moves.map(next => {
            const col = PIPELINE.find(p => p.key === next);
            return (
              <button key={next} className={`vapp__move-btn vapp__move-btn--${col.color}`}
                onClick={() => onMove(applicant.id, next)}>
                → {col.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ApplicantModal({ applicant, onClose, onMove }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  const moves = MOVES[applicant.status] || [];

  return (
    <div className="vapp__modal-overlay" onClick={onClose}>
      <div className="vapp__modal page-enter" onClick={e => e.stopPropagation()}>
        <button className="vapp__modal-close" onClick={onClose}>✕</button>
        <div className="vapp__modal-header" style={{ '--av': '#C4B5FD' }}>
          <div className="vapp__modal-header-bg" />
          <div className="vapp__modal-avatar">{applicant.studentId?.slice(-2).toUpperCase() || 'ST'}</div>
          <div className="vapp__modal-info">
            <h2>Applicant</h2>
            <p>{applicant.internshipRole}</p>
            <p className="vapp__modal-role">Applied: {new Date(applicant.appliedDate).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</p>
            <div className="vapp__modal-tags">
              <span className={`vapp__status-pill vapp__status-pill--${applicant.status}`}>
                {PIPELINE.find(p => p.key === applicant.status)?.icon} {applicant.status}
              </span>
            </div>
          </div>
        </div>
        <div className="vapp__modal-body">
          {applicant.note && (
            <section>
              <h4 className="vapp__modal-section-title">Notes</h4>
              <p className="vapp__modal-note">{applicant.note}</p>
            </section>
          )}
          {moves.length > 0 && (
            <section>
              <h4 className="vapp__modal-section-title">Move to Stage</h4>
              <div className="vapp__modal-moves">
                {moves.map(next => {
                  const col = PIPELINE.find(p => p.key === next);
                  return (
                    <button key={next} className={`btn btn-lg vapp__move-btn vapp__move-btn--${col.color}`}
                      onClick={() => { onMove(applicant.id, next); onClose(); }}>
                      {col.icon} Move to {col.label}
                    </button>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ViewApplicants() {
  const [applicants, setApplicants] = useState([]);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [filterRole, setFilterRole] = useState('all');
  const [selected, setSelected]     = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch all applicants and internships in parallel
    Promise.all([
      fetch('http://localhost:8080/api/applications/employer', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
      fetch('http://localhost:8080/api/internships/employer/my', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
    ]).then(([apps, ints]) => {
      setApplicants(Array.isArray(apps) ? apps : []);
      setInternships(Array.isArray(ints) ? ints : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const moveApplicant = async (id, newStatus) => {
    const res = await fetch(`http://localhost:8080/api/applications/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status: newStatus }),
    });
    const data = await res.json();
    if (res.ok) {
      setApplicants(list => list.map(a => a.id === id ? { ...a, status: newStatus } : a));
      if (selected?.id === id) setSelected(prev => ({ ...prev, status: newStatus }));
    }
  };

  const filtered = filterRole === 'all'
    ? applicants
    : applicants.filter(a => a.internshipId === filterRole);

  return (
    <div className="vapp page-enter">
      {selected && (
        <ApplicantModal applicant={selected} onClose={() => setSelected(null)} onMove={moveApplicant} />
      )}

      <div className="vapp__header">
        <div>
          <div className="section-label">Employer</div>
          <h1 className="vapp__title">Applicants Pipeline</h1>
        </div>
        <div className="vapp__role-filter">
          <label className="form-label" style={{ margin: 0 }}>Showing:</label>
          <select className="form-select vapp__select" value={filterRole} onChange={e => setFilterRole(e.target.value)}>
            <option value="all">All Internships ({applicants.length})</option>
            {internships.map(i => (
              <option key={i.id} value={i.id}>
                {i.role} ({applicants.filter(a => a.internshipId === i.id).length})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats strip */}
      <div className="vapp__strip">
        {PIPELINE.map(col => {
          const count = filtered.filter(a => a.status === col.key).length;
          return (
            <div key={col.key} className={`vapp__strip-item vapp__strip-item--${col.color}`}>
              <span className="vapp__strip-icon">{col.icon}</span>
              <span className="vapp__strip-count">{count}</span>
              <span className="vapp__strip-label">{col.label}</span>
            </div>
          );
        })}
      </div>

      {loading && (
        <div className="ilist__empty"><span className="ilist__empty-icon">⏳</span><h3>Loading applicants...</h3></div>
      )}

      {/* Kanban board */}
      {!loading && (
        <div className="vapp__board">
          {PIPELINE.map(col => {
            const cards = filtered.filter(a => a.status === col.key);
            return (
              <div key={col.key} className={`vapp__column vapp__column--${col.color}`}>
                <div className="vapp__column-header">
                  <span className="vapp__column-icon">{col.icon}</span>
                  <span className="vapp__column-label">{col.label}</span>
                  <span className="vapp__column-count">{cards.length}</span>
                </div>
                <div className="vapp__column-cards">
                  {cards.length === 0 && <div className="vapp__column-empty">No applicants here</div>}
                  {cards.map(a => (
                    <ApplicantCard key={a.id} applicant={a} onMove={moveApplicant} onSelect={setSelected} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
