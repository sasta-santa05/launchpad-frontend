// pages/employer/CompanyProfile.jsx
import React, { useState, useEffect } from 'react';
import './CompanyProfile.css';

const INDUSTRIES = ['SaaS / FinTech', 'E-Commerce', 'EdTech', 'HealthTech', 'Consulting', 'Media', 'Gaming', 'Other'];
const SIZES      = ['1–10 employees', '11–50 employees', '51–200 employees', '201–1000 employees', '1000+ employees'];
const LOGO_COLORS = ['#C4B5FD', '#86EFAC', '#FCA5A5', '#67E8F9', '#FCD34D', '#A5B4FC', '#6EE7B7'];

export default function CompanyProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [draft, setDraft]     = useState({});
  const [saving, setSaving]   = useState(false);
  const [toast, setToast]     = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:8080/api/employers/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => { setProfile(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const startEdit = (section) => { setEditing(section); setDraft({ ...profile }); };
  const cancelEdit = () => { setEditing(null); setDraft({}); };

  const saveEdit = async () => {
    setSaving(true);
    try {
      const res = await fetch('http://localhost:8080/api/employers/profile', {
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

  const SaveCancelBtns = () => (
    <div style={{ display:'flex', gap:'8px' }}>
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

  const logoColor = profile?.logoColor || '#C4B5FD';
  const logoText  = profile?.logo || profile?.name?.slice(0,2).toUpperCase() || 'CO';

  return (
    <div className="co-profile page-enter">
      {toast && <div className="co-profile__toast">✓ Profile updated successfully</div>}

      <div className="co-profile__header">
        <div className="section-label">Employer</div>
        <h1 className="co-profile__title">Company Profile</h1>
        <p className="co-profile__sub">This information appears on your job listings and to applicants.</p>
      </div>

      {/* HERO */}
      <div className="co-profile__hero">
        <div className="co-profile__hero-bg" style={{ '--cl': logoColor }} />
        <div className="co-profile__hero-inner">
          <div className="co-profile__logo-wrap">
            <div className="co-profile__logo" style={{ '--cl': logoColor }}>{logoText}</div>
            {editing === 'branding' && (
              <div className="co-profile__logo-colors">
                {LOGO_COLORS.map(c => (
                  <button key={c} type="button"
                    className={`co-profile__logo-color ${draft.logoColor === c ? 'co-profile__logo-color--active' : ''}`}
                    style={{ background: c }} onClick={() => d('logoColor', c)} />
                ))}
              </div>
            )}
          </div>
          <div className="co-profile__hero-info">
            {editing === 'branding' ? (
              <div className="co-profile__edit-row">
                <div className="form-group" style={{ flex:1 }}>
                  <label className="form-label">Company Name</label>
                  <input className="form-input" value={draft.name || ''} onChange={e => d('name', e.target.value)} />
                </div>
                <div className="form-group" style={{ width:80 }}>
                  <label className="form-label">Logo (2 chars)</label>
                  <input className="form-input" maxLength={3} value={draft.logo || ''} onChange={e => d('logo', e.target.value)} />
                </div>
                <div className="form-group" style={{ flex:1 }}>
                  <label className="form-label">Tagline</label>
                  <input className="form-input" value={draft.tagline || ''} onChange={e => d('tagline', e.target.value)} />
                </div>
              </div>
            ) : (
              <>
                <h2 className="co-profile__company-name">{profile?.name || 'Company Name'}</h2>
                <p className="co-profile__tagline">{profile?.tagline || 'Add a tagline...'}</p>
              </>
            )}
            <div className="co-profile__hero-chips">
              <span className="tag tag-lavender">{profile?.industry || 'Industry'}</span>
              <span className="tag tag-mint">{profile?.size || 'Company Size'}</span>
              {profile?.location && <span className="tag tag-cyan">📍 {profile.location}</span>}
            </div>
          </div>
          <div className="co-profile__hero-actions">
            {editing === 'branding' ? <SaveCancelBtns /> :
              <button className="btn btn-secondary btn-sm" onClick={() => startEdit('branding')}>✏ Edit</button>}
          </div>
        </div>
      </div>

      <div className="co-profile__body">
        {/* ABOUT */}
        <div className="co-profile__section">
          <div className="co-profile__section-header">
            <h3 className="co-profile__section-title">About</h3>
            {editing === 'about' ? <SaveCancelBtns /> :
              <button className="btn btn-secondary btn-sm" onClick={() => startEdit('about')}>✏ Edit</button>}
          </div>
          {editing === 'about' ? (
            <textarea className="form-input form-textarea co-profile__about-ta" rows={5}
              value={draft.about || ''} onChange={e => d('about', e.target.value)} />
          ) : (
            <p className="co-profile__about-text">{profile?.about || 'Add a description of your company...'}</p>
          )}
        </div>

        {/* DETAILS */}
        <div className="co-profile__section">
          <div className="co-profile__section-header">
            <h3 className="co-profile__section-title">Company Details</h3>
            {editing === 'details' ? <SaveCancelBtns /> :
              <button className="btn btn-secondary btn-sm" onClick={() => startEdit('details')}>✏ Edit</button>}
          </div>
          {editing === 'details' ? (
            <div className="co-profile__details-grid">
              <div className="form-group">
                <label className="form-label">Industry</label>
                <select className="form-select" value={draft.industry || ''} onChange={e => d('industry', e.target.value)}>
                  <option value="">Select</option>
                  {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Company Size</label>
                <select className="form-select" value={draft.size || ''} onChange={e => d('size', e.target.value)}>
                  <option value="">Select</option>
                  {SIZES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Headquarters</label>
                <input className="form-input" value={draft.location || ''} onChange={e => d('location', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Founded</label>
                <input className="form-input" value={draft.founded || ''} onChange={e => d('founded', e.target.value)} />
              </div>
            </div>
          ) : (
            <div className="co-profile__details-grid">
              {[['🏭','Industry',profile?.industry],['👥','Size',profile?.size],['📍','Headquarters',profile?.location],['🗓','Founded',profile?.founded]].map(([icon, label, val]) => (
                <div key={label} className="co-profile__detail-item">
                  <span className="co-profile__detail-icon">{icon}</span>
                  <div>
                    <span className="co-profile__detail-label">{label}</span>
                    <span className="co-profile__detail-val">{val || '—'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CONTACT */}
        <div className="co-profile__section">
          <div className="co-profile__section-header">
            <h3 className="co-profile__section-title">Contact & Links</h3>
            {editing === 'contact' ? <SaveCancelBtns /> :
              <button className="btn btn-secondary btn-sm" onClick={() => startEdit('contact')}>✏ Edit</button>}
          </div>
          {editing === 'contact' ? (
            <div className="co-profile__details-grid">
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" value={draft.email || ''} onChange={e => d('email', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input className="form-input" value={draft.phone || ''} onChange={e => d('phone', e.target.value)} />
              </div>
              <div className="form-group" style={{ gridColumn:'1/-1' }}>
                <label className="form-label">Website</label>
                <input className="form-input" value={draft.website || ''} onChange={e => d('website', e.target.value)} />
              </div>
            </div>
          ) : (
            <div className="co-profile__contact-list">
              {[['📧','Email',profile?.email],['📞','Phone',profile?.phone],['🌐','Website',profile?.website]].map(([icon, label, val]) => (
                <div key={label} className="co-profile__contact-row">
                  <span>{icon} <strong>{label}:</strong></span>
                  <span className="co-profile__contact-val">{val || '—'}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
