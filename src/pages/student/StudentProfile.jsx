// pages/student/StudentProfile.jsx
import React, { useState, useEffect } from 'react';
import './StudentProfileNew.css';

const DEGREES  = ['B.Tech', 'B.E.', 'B.Sc', 'BCA', 'MBA', 'MCA', 'M.Tech', 'B.Des', 'BBA', 'Other'];
const BRANCHES = ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Civil', 'MBA', 'Design', 'Other'];
const YEARS    = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate'];
const ALL_SKILLS = ['React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Java', 'CSS', 'SQL', 'MongoDB', 'Git', 'Figma', 'AWS', 'Docker', 'Spring Boot', 'Machine Learning', 'Data Analysis', 'Tableau', 'Excel'];

export default function StudentProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [draft, setDraft]     = useState({});
  const [saving, setSaving]   = useState(false);
  const [toast, setToast]     = useState(false);
  const [error, setError]     = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/api/students/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => { setProfile(data); setLoading(false); })
      .catch(() => { setError('Could not load profile.'); setLoading(false); });
  }, []);

  const startEdit = (section) => { setEditing(section); setDraft({ ...profile }); };
  const cancelEdit = () => { setEditing(null); setDraft({}); };

  const saveEdit = async () => {
    setSaving(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:8080/api/students/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(draft),
      });
      const data = await res.json();
      if (res.ok) {
        setProfile(data);
        setEditing(null);
        setToast(true);
        setTimeout(() => setToast(false), 2500);
      }
    } catch { alert('Cannot connect to server.'); }
    finally { setSaving(false); }
  };

  const d = (key, val) => setDraft(dr => ({ ...dr, [key]: val }));

  const toggleSkill = (skill) => {
    const curr = draft.skills || [];
    d('skills', curr.includes(skill) ? curr.filter(s => s !== skill) : [...curr, skill]);
  };

  const completion = () => {
    if (!profile) return 0;
    const fields = [profile.firstName, profile.lastName, profile.email, profile.phone,
      profile.college, profile.degree, profile.year, profile.cgpa, profile.skills?.length, profile.linkedin, profile.github];
    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  };

  const initials = profile
    ? `${profile.firstName?.[0] || ''}${profile.lastName?.[0] || ''}`.toUpperCase()
    : '??';

  const SaveCancelBtns = () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <button className="btn btn-primary btn-sm" onClick={saveEdit} disabled={saving}>
        {saving ? '⏳ Saving...' : 'Save'}
      </button>
      <button className="btn btn-secondary btn-sm" onClick={cancelEdit}>Cancel</button>
    </div>
  );

  if (loading) return (
    <div className="ilist__empty page-enter">
      <span className="ilist__empty-icon">⏳</span><h3>Loading profile...</h3>
    </div>
  );
  if (error) return (
    <div className="ilist__empty page-enter">
      <span className="ilist__empty-icon">⚠️</span><h3>{error}</h3>
    </div>
  );

  return (
    <div className="std-profile page-enter">
      {toast && <div className="std-profile__toast">✓ Profile saved successfully</div>}

      {/* Hero */}
      <div className="std-profile__hero">
        <div className="std-profile__hero-left">
          <div className="std-profile__avatar">{initials}</div>
          <div>
            <h1 className="std-profile__name">{profile?.firstName} {profile?.lastName}</h1>
            <p className="std-profile__sub">
              {[profile?.degree, profile?.branch, profile?.college].filter(Boolean).join(' · ')}
            </p>
            <div className="std-profile__completion">
              <div className="std-profile__completion-bar">
                <div className="std-profile__completion-fill" style={{ width: `${completion()}%` }} />
              </div>
              <span className="std-profile__completion-label">{completion()}% complete</span>
            </div>
          </div>
        </div>
      </div>

      {/* BASIC INFO */}
      <div className="std-profile__section">
        <div className="std-profile__section-header">
          <h3 className="std-profile__section-title">Basic Info</h3>
          {editing === 'basic' ? <SaveCancelBtns /> : <button className="btn btn-secondary btn-sm" onClick={() => startEdit('basic')}>✏ Edit</button>}
        </div>
        {editing === 'basic' ? (
          <div className="std-profile__edit-grid">
            {[['firstName','First Name','text'],['lastName','Last Name','text'],['email','Email','email'],['phone','Phone','tel']].map(([key, label, type]) => (
              <div key={key} className="form-group">
                <label className="form-label">{label}</label>
                <input className="form-input" type={type} value={draft[key] || ''} onChange={e => d(key, e.target.value)} />
              </div>
            ))}
            <div className="form-group std-profile__full">
              <label className="form-label">Bio</label>
              <textarea className="form-input form-textarea" rows={3} value={draft.bio || ''} onChange={e => d('bio', e.target.value)} />
            </div>
          </div>
        ) : (
          <div className="std-profile__info-grid">
            <div><span className="std-profile__info-label">Name</span><span>{profile?.firstName} {profile?.lastName}</span></div>
            <div><span className="std-profile__info-label">Email</span><span>{profile?.email || '—'}</span></div>
            <div><span className="std-profile__info-label">Phone</span><span>{profile?.phone || '—'}</span></div>
            {profile?.bio && <div className="std-profile__full"><span className="std-profile__info-label">Bio</span><span>{profile.bio}</span></div>}
          </div>
        )}
      </div>

      {/* EDUCATION */}
      <div className="std-profile__section">
        <div className="std-profile__section-header">
          <h3 className="std-profile__section-title">Education</h3>
          {editing === 'education' ? <SaveCancelBtns /> : <button className="btn btn-secondary btn-sm" onClick={() => startEdit('education')}>✏ Edit</button>}
        </div>
        {editing === 'education' ? (
          <div className="std-profile__edit-grid">
            <div className="form-group std-profile__full">
              <label className="form-label">College</label>
              <input className="form-input" value={draft.college || ''} onChange={e => d('college', e.target.value)} />
            </div>
            {[['degree','Degree',DEGREES],['branch','Branch',BRANCHES],['year','Year',YEARS]].map(([key, label, opts]) => (
              <div key={key} className="form-group">
                <label className="form-label">{label}</label>
                <select className="form-select" value={draft[key] || ''} onChange={e => d(key, e.target.value)}>
                  <option value="">Select</option>
                  {opts.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <div className="form-group">
              <label className="form-label">CGPA</label>
              <input className="form-input" type="number" step="0.1" min="0" max="10" value={draft.cgpa || ''} onChange={e => d('cgpa', e.target.value)} />
            </div>
          </div>
        ) : (
          <div className="std-profile__info-grid">
            {[['College', profile?.college],['Degree', profile?.degree],['Branch', profile?.branch],['Year', profile?.year],['CGPA', profile?.cgpa]].map(([label, val]) => (
              <div key={label}><span className="std-profile__info-label">{label}</span><span>{val || '—'}</span></div>
            ))}
          </div>
        )}
      </div>

      {/* SKILLS */}
      <div className="std-profile__section">
        <div className="std-profile__section-header">
          <h3 className="std-profile__section-title">Skills</h3>
          {editing === 'skills' ? <SaveCancelBtns /> : <button className="btn btn-secondary btn-sm" onClick={() => startEdit('skills')}>✏ Edit</button>}
        </div>
        {editing === 'skills' ? (
          <div className="std-profile__pills">
            {ALL_SKILLS.map(s => (
              <button key={s} type="button"
                className={`register-skill-pill ${(draft.skills || []).includes(s) ? 'register-skill-pill--active' : ''}`}
                onClick={() => toggleSkill(s)}>{s}
              </button>
            ))}
          </div>
        ) : (
          <div className="icard__tags" style={{ padding: 'var(--space-md) 0' }}>
            {profile?.skills?.length
              ? profile.skills.map(s => <span key={s} className="tag tag-lavender">{s}</span>)
              : <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No skills added yet — click Edit to add some!</span>}
          </div>
        )}
      </div>

      {/* LINKS */}
      <div className="std-profile__section">
        <div className="std-profile__section-header">
          <h3 className="std-profile__section-title">Links & Resume</h3>
          {editing === 'links' ? <SaveCancelBtns /> : <button className="btn btn-secondary btn-sm" onClick={() => startEdit('links')}>✏ Edit</button>}
        </div>
        {editing === 'links' ? (
          <div className="std-profile__edit-grid">
            {[['linkedin','LinkedIn URL'],['github','GitHub URL'],['portfolio','Portfolio URL'],['resumeUrl','Resume URL']].map(([key, label]) => (
              <div key={key} className="form-group">
                <label className="form-label">{label}</label>
                <input className="form-input" type="url" placeholder="https://..." value={draft[key] || ''} onChange={e => d(key, e.target.value)} />
              </div>
            ))}
          </div>
        ) : (
          <div className="std-profile__links-list">
            {[['🔷 LinkedIn', profile?.linkedin],['⌥ GitHub', profile?.github],['🌐 Portfolio', profile?.portfolio],['📄 Resume', profile?.resumeUrl]].map(([label, val]) => (
              <div key={label} className="std-profile__link-row">
                <span>{label}</span>
                {val ? <a href={val} target="_blank" rel="noreferrer" className="std-profile__link-val">{val}</a>
                     : <span style={{ color: 'var(--text-muted)' }}>Not added</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
