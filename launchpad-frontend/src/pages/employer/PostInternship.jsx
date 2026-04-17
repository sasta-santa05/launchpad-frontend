// pages/employer/PostInternship.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostInternship.css';

const CATEGORIES = ['Engineering', 'Data Science', 'Design', 'Marketing', 'DevOps', 'Product', 'Finance', 'Operations'];
const LOCATIONS  = ['Bangalore', 'Mumbai', 'Hyderabad', 'Delhi', 'Chennai', 'Pune', 'Remote'];
const DURATIONS  = ['1 Month', '2 Months', '3 Months', '4 Months', '6 Months'];
const TAG_COLORS = ['lavender', 'mint', 'peach', 'cyan', 'amber'];
const ALL_PERKS  = ['Certificate', 'Letter of Recommendation', 'Pre-Placement Offer', 'Flexible Hours', 'Mentorship', 'Remote Work'];
const SKILL_SUGGESTIONS = ['React', 'Node.js', 'Python', 'Java', 'TypeScript', 'SQL', 'Figma', 'AWS', 'Docker', 'Spring Boot', 'MongoDB', 'Git'];

const INITIAL = {
  role: '', category: 'Engineering', location: 'Bangalore', remote: false,
  stipend: '', duration: '3 Months', openings: 1, tagColor: 'lavender',
  description: '', skills: [], perks: [], requirements: '', responsibilities: '',
};

export default function PostInternship() {
  const [form, setForm]             = useState(INITIAL);
  const [skillInput, setSkillInput] = useState('');
  const [submitted, setSubmitted]   = useState(false);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');
  const navigate = useNavigate();

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const addSkill   = (s) => { const t = s.trim(); if (t && !form.skills.includes(t)) set('skills', [...form.skills, t]); setSkillInput(''); };
  const removeSkill = (s) => set('skills', form.skills.filter(x => x !== s));
  const togglePerk  = (p) => set('perks', form.perks.includes(p) ? form.perks.filter(x => x !== p) : [...form.perks, p]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:8080/api/internships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, stipend: Number(form.stipend), openings: Number(form.openings), tags: form.skills }),
      });
      const data = await res.json();
      if (res.ok) { setSubmitted(true); setTimeout(() => navigate('/employer/internships'), 2000); }
      else setError(data.message || 'Could not post internship.');
    } catch { setError('Cannot connect to server.'); }
    finally { setLoading(false); }
  };

  if (submitted) return (
    <div className="post-int__success page-enter">
      <div className="post-int__success-card">
        <div className="post-int__success-icon">🚀</div>
        <h2>Internship Posted!</h2>
        <p>Your listing is now live. Redirecting…</p>
      </div>
    </div>
  );

  return (
    <div className="post-int page-enter">
      <div className="post-int__header">
        <div>
          <div className="section-label">Employer</div>
          <h1 className="post-int__title">Post an Internship</h1>
          <p className="post-int__subtitle">Fill in the details below to publish your listing to 8.5L+ students.</p>
        </div>
      </div>

      {error && (
        <div style={{ background:'var(--peach-dim)', border:'1px solid rgba(252,165,165,0.3)', borderRadius:'var(--radius-md)', padding:'10px 14px', fontSize:'0.85rem', color:'var(--peach)', marginBottom:'var(--space-md)' }}>
          ⚠ {error}
        </div>
      )}

      <div className="post-int__layout">
        <form className="post-int__form" onSubmit={handleSubmit}>
          <div className="post-int__section">
            <h3 className="post-int__section-title"><span className="post-int__step">01</span> Basic Info</h3>
            <div className="post-int__grid-2">
              <div className="form-group">
                <label className="form-label">Role Title *</label>
                <input className="form-input" required placeholder="e.g. Frontend Developer Intern" value={form.role} onChange={e => set('role', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select className="form-select" value={form.category} onChange={e => set('category', e.target.value)}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="post-int__grid-3">
              <div className="form-group">
                <label className="form-label">Location</label>
                <select className="form-select" value={form.location} onChange={e => set('location', e.target.value)}>
                  {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Duration</label>
                <select className="form-select" value={form.duration} onChange={e => set('duration', e.target.value)}>
                  {DURATIONS.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Openings</label>
                <input className="form-input" type="number" min="1" max="50" value={form.openings} onChange={e => set('openings', Number(e.target.value))} />
              </div>
            </div>
            <div className="post-int__grid-2">
              <div className="form-group">
                <label className="form-label">Monthly Stipend (₹)</label>
                <input className="form-input" type="number" min="0" placeholder="e.g. 15000" value={form.stipend} onChange={e => set('stipend', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Card Accent Color</label>
                <div className="post-int__color-row">
                  {TAG_COLORS.map(c => (
                    <button type="button" key={c} className={`post-int__color-swatch post-int__color-swatch--${c} ${form.tagColor === c ? 'post-int__color-swatch--active' : ''}`} onClick={() => set('tagColor', c)} />
                  ))}
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label post-int__toggle-label">
                <button type="button" className={`post-int__toggle ${form.remote ? 'post-int__toggle--on' : ''}`} onClick={() => set('remote', !form.remote)}>
                  <span className="post-int__toggle-knob" />
                </button>
                Remote / Work From Home
              </label>
            </div>
          </div>

          <div className="post-int__section">
            <h3 className="post-int__section-title"><span className="post-int__step">02</span> Description</h3>
            <div className="form-group">
              <label className="form-label">About the Role *</label>
              <textarea className="form-input form-textarea" rows={4} required placeholder="Describe what the intern will be working on..." value={form.description} onChange={e => set('description', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Responsibilities</label>
              <textarea className="form-input form-textarea" rows={4} placeholder="List the key responsibilities..." value={form.responsibilities} onChange={e => set('responsibilities', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Requirements</label>
              <textarea className="form-input form-textarea" rows={3} placeholder="What qualifications do you expect?" value={form.requirements} onChange={e => set('requirements', e.target.value)} />
            </div>
          </div>

          <div className="post-int__section">
            <h3 className="post-int__section-title"><span className="post-int__step">03</span> Skills Required</h3>
            <div className="form-group">
              <label className="form-label">Add Skills</label>
              <div className="post-int__skill-input-row">
                <input className="form-input" placeholder="Type a skill and press Enter" value={skillInput} onChange={e => setSkillInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill(skillInput); }}} />
                <button type="button" className="btn btn-secondary" onClick={() => addSkill(skillInput)}>Add</button>
              </div>
              <div className="post-int__skill-suggestions">
                {SKILL_SUGGESTIONS.filter(s => !form.skills.includes(s)).map(s => (
                  <button type="button" key={s} className="post-int__suggestion" onClick={() => addSkill(s)}>+ {s}</button>
                ))}
              </div>
              {form.skills.length > 0 && (
                <div className="post-int__skills-selected">
                  {form.skills.map(s => (
                    <span key={s} className={`tag tag-${form.tagColor} post-int__skill-tag`}>
                      {s}<button type="button" onClick={() => removeSkill(s)} className="post-int__skill-remove">✕</button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="post-int__section">
            <h3 className="post-int__section-title"><span className="post-int__step">04</span> Perks & Benefits</h3>
            <div className="post-int__perks-grid">
              {ALL_PERKS.map(p => (
                <button type="button" key={p} className={`post-int__perk-chip ${form.perks.includes(p) ? 'post-int__perk-chip--active' : ''}`} onClick={() => togglePerk(p)}>
                  {form.perks.includes(p) ? '✓ ' : '+ '}{p}
                </button>
              ))}
            </div>
          </div>

          <div className="post-int__submit-row">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/employer/internships')}>Cancel</button>
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              {loading ? '⏳ Publishing...' : '🚀 Publish Internship'}
            </button>
          </div>
        </form>

        <aside className="post-int__preview-panel">
          <div className="post-int__preview-label">Live Preview</div>
          <div className="post-int__preview-card icard icard--default">
            <div className="icard__header">
              <div className="icard__logo" style={{ '--logo-color': 'var(--lavender)' }}>{form.category?.slice(0,2).toUpperCase() || 'IN'}</div>
              <div className="icard__meta">
                <h4 className="icard__role">{form.role || 'Role Title'}</h4>
                <span className="icard__company">{form.category}</span>
              </div>
            </div>
            <div className="icard__badges">
              <span className={`icard__remote-badge ${form.remote ? 'icard__remote-badge--yes' : ''}`}>
                {form.remote ? '🌐 Remote' : `📍 ${form.location}`}
              </span>
            </div>
            <p className="icard__desc">{form.description || 'Role description will appear here.'}</p>
            <div className="icard__tags">
              {form.skills.slice(0,4).map(s => <span key={s} className={`tag tag-${form.tagColor}`}>{s}</span>)}
              {!form.skills.length && <span className={`tag tag-${form.tagColor}`}>Skills</span>}
            </div>
            <div className="icard__footer">
              <div className="icard__stats">
                <span className="icard__stat">💰 ₹{form.stipend ? Number(form.stipend).toLocaleString() : '–'}/mo</span>
                <span className="icard__stat">📅 {form.duration}</span>
                <span className="icard__stat">👥 {form.openings} opening{form.openings > 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
