// pages/employer/ManageInternships.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ManageInternships.css';

const STATUS_CYCLE = { active: 'paused', paused: 'active', closed: 'closed' };
const STATUS_LABEL = { active: 'Active', paused: 'Paused', closed: 'Closed' };
const STATUS_COLOR = { active: 'mint', paused: 'amber', closed: 'peach' };
const CATEGORIES   = ['Engineering','Data Science','Design','Marketing','DevOps','Product'];
const LOCATIONS    = ['Bangalore','Mumbai','Hyderabad','Delhi','Chennai','Pune','Remote'];
const DURATIONS    = ['1 Month','2 Months','3 Months','4 Months','6 Months'];

function EditModal({ item, onSave, onClose }) {
  const [draft, setDraft] = useState({ ...item });
  const d = (k, v) => setDraft(dr => ({ ...dr, [k]: v }));

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const esc = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', esc);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', esc); };
  }, [onClose]);

  return (
    <div className="manage-int__modal-overlay" onClick={onClose}>
      <div className="manage-int__edit-panel" onClick={e => e.stopPropagation()}>
        <div className="manage-int__edit-header">
          <h3>Edit Internship</h3>
          <button className="manage-int__edit-close" onClick={onClose}>✕</button>
        </div>
        <div className="manage-int__edit-body">
          <div className="post-int__grid-2">
            <div className="form-group">
              <label className="form-label">Role Title</label>
              <input className="form-input" value={draft.role} onChange={e => d('role', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-select" value={draft.category} onChange={e => d('category', e.target.value)}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="post-int__grid-3">
            <div className="form-group">
              <label className="form-label">Location</label>
              <select className="form-select" value={draft.location} onChange={e => d('location', e.target.value)}>
                {LOCATIONS.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Duration</label>
              <select className="form-select" value={draft.duration} onChange={e => d('duration', e.target.value)}>
                {DURATIONS.map(du => <option key={du}>{du}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Openings</label>
              <input className="form-input" type="number" min="1" value={draft.openings} onChange={e => d('openings', Number(e.target.value))} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Stipend (₹/month)</label>
            <input className="form-input" type="number" value={draft.stipend} onChange={e => d('stipend', Number(e.target.value))} />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-input form-textarea" rows={3} value={draft.description} onChange={e => d('description', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label post-int__toggle-label">
              <button type="button" className={`post-int__toggle ${draft.remote ? 'post-int__toggle--on' : ''}`} onClick={() => d('remote', !draft.remote)}>
                <span className="post-int__toggle-knob" />
              </button>
              Remote / Work From Home
            </label>
          </div>
        </div>
        <div className="manage-int__edit-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={() => onSave(draft)}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

export default function ManageInternships() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [filter, setFilter]           = useState('all');
  const [deleteId, setDeleteId]       = useState(null);
  const [editItem, setEditItem]       = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:8080/api/internships/employer/my', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => { setInternships(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const toggleStatus = async (id) => {
    const item = internships.find(i => i.id === id);
    if (!item || item.status === 'closed') return;
    const newStatus = STATUS_CYCLE[item.status];
    await fetch(`http://localhost:8080/api/internships/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status: newStatus }),
    });
    setInternships(list => list.map(i => i.id === id ? { ...i, status: newStatus } : i));
  };

  const doDelete = async () => {
    await fetch(`http://localhost:8080/api/internships/${deleteId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    setInternships(list => list.filter(i => i.id !== deleteId));
    setDeleteId(null);
  };

  const saveEdit = async (updated) => {
    const res = await fetch(`http://localhost:8080/api/internships/${updated.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(updated),
    });
    const data = await res.json();
    if (res.ok) setInternships(list => list.map(i => i.id === data.id ? data : i));
    setEditItem(null);
  };

  const filtered = filter === 'all' ? internships : internships.filter(i => i.status === filter);

  return (
    <div className="manage-int page-enter">
      {deleteId && (
        <div className="manage-int__modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="manage-int__modal" onClick={e => e.stopPropagation()}>
            <h3>Delete Internship?</h3>
            <p>This action cannot be undone.</p>
            <div className="manage-int__modal-actions">
              <button className="btn btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={doDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
      {editItem && <EditModal item={editItem} onSave={saveEdit} onClose={() => setEditItem(null)} />}

      <div className="manage-int__header">
        <div>
          <div className="section-label">Employer</div>
          <h1 className="manage-int__title">Manage Internships</h1>
        </div>
        <Link to="/employer/post-internship" className="btn btn-primary">+ Post New Role</Link>
      </div>

      <div className="manage-int__summary">
        {['all', 'active', 'paused', 'closed'].map(s => {
          const count = s === 'all' ? internships.length : internships.filter(i => i.status === s).length;
          return (
            <button key={s} className={`manage-int__summary-chip ${filter === s ? 'manage-int__summary-chip--active' : ''}`} onClick={() => setFilter(s)}>
              <span className={`manage-int__summary-dot manage-int__summary-dot--${s === 'all' ? 'all' : STATUS_COLOR[s]}`} />
              {s.charAt(0).toUpperCase() + s.slice(1)} <strong>{count}</strong>
            </button>
          );
        })}
      </div>

      {loading && (
        <div className="manage-int__empty"><span>⏳</span><p>Loading internships...</p></div>
      )}

      <div className="manage-int__list">
        {!loading && filtered.length === 0 && (
          <div className="manage-int__empty">
            <span>📋</span>
            <p>No internships found.</p>
            <Link to="/employer/post-internship" className="btn btn-primary btn-sm">Post One →</Link>
          </div>
        )}
        {filtered.map(i => (
          <div key={i.id} className={`manage-int__card manage-int__card--${STATUS_COLOR[i.status]}`}>
            <div className="manage-int__card-left">
              <div className="manage-int__card-title-row">
                <h3 className="manage-int__card-role">{i.role}</h3>
                <span className={`manage-int__status-badge manage-int__status-badge--${STATUS_COLOR[i.status]}`}>
                  {STATUS_LABEL[i.status]}
                </span>
              </div>
              <div className="manage-int__card-meta">
                <span className={`tag tag-${i.tagColor || 'lavender'}`}>{i.category}</span>
                <span>{i.remote ? '🌐 Remote' : `📍 ${i.location}`}</span>
                <span>💰 ₹{i.stipend?.toLocaleString()}/mo</span>
                <span>📅 {i.duration}</span>
                <span>👥 {i.openings} opening{i.openings > 1 ? 's' : ''}</span>
              </div>
              <div className="manage-int__card-stats">
                <div className="manage-int__stat"><strong>{i.applicants || 0}</strong><span>Applied</span></div>
                <div className="manage-int__stat-divider" />
                <div className="manage-int__stat"><strong>{i.shortlisted || 0}</strong><span>Shortlisted</span></div>
                <div className="manage-int__stat-divider" />
                <div className="manage-int__stat"><strong>{i.hired || 0}</strong><span>Hired</span></div>
                <div className="manage-int__stat-divider" />
                <div className="manage-int__stat">
                  <strong>{i.postedDate ? new Date(i.postedDate).toLocaleDateString('en-IN', { day:'numeric', month:'short' }) : '—'}</strong>
                  <span>Posted</span>
                </div>
              </div>
            </div>
            <div className="manage-int__card-actions">
              <Link to="/employer/applicants" className="btn btn-secondary btn-sm">👥 Applicants</Link>
              <button className="btn btn-secondary btn-sm" onClick={() => setEditItem(i)}>✏ Edit</button>
              {i.status !== 'closed' && (
                <button className={`btn btn-sm ${i.status === 'active' ? 'manage-int__btn-pause' : 'manage-int__btn-activate'}`} onClick={() => toggleStatus(i.id)}>
                  {i.status === 'active' ? '⏸ Pause' : '▶ Activate'}
                </button>
              )}
              <button className="btn btn-sm manage-int__btn-delete" onClick={() => setDeleteId(i.id)}>🗑 Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
