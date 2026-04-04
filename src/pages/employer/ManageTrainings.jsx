// pages/employer/ManageTrainings.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ManageTrainings.css';

const STATUS_COLOR = { active: 'mint', paused: 'amber' };

export default function ManageTrainings() {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [deleteId, setDeleteId]   = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:8080/api/trainings/employer/my', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => { setTrainings(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const toggleStatus = async (id) => {
    const item = trainings.find(t => t.id === id);
    const newStatus = item.status === 'active' ? 'paused' : 'active';
    await fetch(`http://localhost:8080/api/trainings/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status: newStatus }),
    });
    setTrainings(t => t.map(x => x.id === id ? { ...x, status: newStatus } : x));
  };

  const doDelete = async () => {
    await fetch(`http://localhost:8080/api/trainings/${deleteId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    setTrainings(t => t.filter(x => x.id !== deleteId));
    setDeleteId(null);
  };

  const totalEnrolled = trainings.reduce((s, t) => s + (t.enrolled || 0), 0);
  const totalRevenue  = trainings.reduce((s, t) => s + (t.revenue || 0), 0);
  const avgRating     = trainings.length
    ? (trainings.reduce((s, t) => s + (t.rating || 0), 0) / trainings.length).toFixed(1)
    : '0.0';

  return (
    <div className="manage-tr page-enter">
      {deleteId && (
        <div className="manage-int__modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="manage-int__modal" onClick={e => e.stopPropagation()}>
            <h3>Delete Training?</h3>
            <p>This will remove the course and all enrollment data permanently.</p>
            <div className="manage-int__modal-actions">
              <button className="btn btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={doDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <div className="manage-tr__header">
        <div>
          <div className="section-label">Employer</div>
          <h1 className="manage-tr__title">Manage Trainings</h1>
        </div>
        <Link to="/employer/post-training" className="btn btn-primary">+ Post New Training</Link>
      </div>

      <div className="manage-tr__summary">
        {[
          { icon: '🎓', value: trainings.length,          label: 'Courses Posted' },
          { icon: '👥', value: totalEnrolled.toLocaleString(), label: 'Total Enrolled' },
          { icon: '💰', value: `₹${(totalRevenue/100000).toFixed(1)}L`, label: 'Total Revenue' },
          { icon: '⭐', value: avgRating,                 label: 'Avg. Rating' },
        ].map(s => (
          <div key={s.label} className="manage-tr__summary-card">
            <span className="manage-tr__summary-icon">{s.icon}</span>
            <span className="manage-tr__summary-value">{s.value}</span>
            <span className="manage-tr__summary-label">{s.label}</span>
          </div>
        ))}
      </div>

      {loading && (
        <div className="manage-int__empty"><span>⏳</span><p>Loading trainings...</p></div>
      )}

      <div className="manage-tr__list">
        {!loading && trainings.length === 0 && (
          <div className="manage-int__empty">
            <span>🎓</span>
            <p>No trainings posted yet.</p>
            <Link to="/employer/post-training" className="btn btn-primary btn-sm">Post One →</Link>
          </div>
        )}
        {trainings.map(t => (
          <div key={t.id} className={`manage-tr__card manage-tr__card--${STATUS_COLOR[t.status] || 'mint'}`}>
            <div className="manage-tr__thumb" style={{ '--tc': `var(--${t.tagColor || 'lavender'})` }}>
              <span className={`tag tag-${t.tagColor || 'lavender'}`}>{t.category}</span>
              <span className="manage-tr__level-badge">{t.level || 'Beginner'}</span>
            </div>
            <div className="manage-tr__card-body">
              <div className="manage-tr__card-top">
                <div>
                  <h3 className="manage-tr__card-title">{t.title}</h3>
                  <p className="manage-tr__card-desc">{t.description}</p>
                </div>
                <span className={`manage-int__status-badge manage-int__status-badge--${STATUS_COLOR[t.status] || 'mint'}`}>
                  {t.status || 'active'}
                </span>
              </div>
              <div className="manage-tr__card-stats">
                <div className="manage-tr__stat"><strong>{t.enrolled || 0}</strong><span>Enrolled</span></div>
                <div className="manage-int__stat-divider" />
                <div className="manage-tr__stat"><strong>{t.chapters || 0}</strong><span>Chapters</span></div>
                <div className="manage-int__stat-divider" />
                <div className="manage-tr__stat"><strong>{t.lessons || 0}</strong><span>Lessons</span></div>
                <div className="manage-int__stat-divider" />
                <div className="manage-tr__stat"><strong>⭐ {t.rating || '0.0'}</strong><span>{t.reviews || 0} reviews</span></div>
                <div className="manage-int__stat-divider" />
                <div className="manage-tr__stat">
                  <strong>{t.price === 0 ? 'Free' : `₹${t.price?.toLocaleString()}`}</strong><span>Price</span>
                </div>
                {t.revenue > 0 && <>
                  <div className="manage-int__stat-divider" />
                  <div className="manage-tr__stat">
                    <strong style={{ color: 'var(--mint)' }}>₹{(t.revenue/100000).toFixed(1)}L</strong><span>Revenue</span>
                  </div>
                </>}
              </div>
              <div className="manage-tr__card-actions">
                <button className={`btn btn-sm ${t.status === 'active' ? 'manage-int__btn-pause' : 'manage-int__btn-activate'}`}
                  onClick={() => toggleStatus(t.id)}>
                  {t.status === 'active' ? '⏸ Pause' : '▶ Activate'}
                </button>
                <button className="btn btn-sm manage-int__btn-delete" onClick={() => setDeleteId(t.id)}>🗑 Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
