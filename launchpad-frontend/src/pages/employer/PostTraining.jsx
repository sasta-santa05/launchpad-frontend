// pages/employer/PostTraining.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostTraining.css';

const CATEGORIES = ['Engineering', 'Data Science', 'Design', 'Marketing', 'DevOps', 'Product', 'Finance'];
const LEVELS     = ['Beginner', 'Intermediate', 'Advanced'];
const TAG_COLORS = ['lavender', 'mint', 'peach', 'cyan', 'amber'];

const INITIAL_FORM = {
  title: '', category: 'Engineering', level: 'Beginner',
  price: '', duration: '', tagColor: 'lavender', description: '', whatYouLearn: '',
};
const INITIAL_CURRICULUM = [
  { id: 1, title: 'Introduction & Setup', lessons: 3 },
  { id: 2, title: 'Core Concepts',        lessons: 5 },
];

export default function PostTraining() {
  const [form, setForm]           = useState(INITIAL_FORM);
  const [curriculum, setCurriculum] = useState(INITIAL_CURRICULUM);
  const [newChapter, setNewChapter] = useState({ title: '', lessons: 1 });
  const [submitted, setSubmitted]   = useState(false);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');
  const navigate = useNavigate();

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const addChapter = () => {
    if (!newChapter.title.trim()) return;
    setCurriculum(c => [...c, { id: Date.now(), ...newChapter }]);
    setNewChapter({ title: '', lessons: 1 });
  };
  const removeChapter = (id) => setCurriculum(c => c.filter(ch => ch.id !== id));
  const updateChapter = (id, key, val) =>
    setCurriculum(c => c.map(ch => ch.id === id ? { ...ch, [key]: val } : ch));

  const totalLessons = curriculum.reduce((s, c) => s + Number(c.lessons), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const token = localStorage.getItem('token');
    try {
      const whatYouLearnList = form.whatYouLearn
        .split('\n').map(s => s.trim()).filter(Boolean);
      const res = await fetch('http://localhost:8080/api/trainings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          ...form,
          price:       Number(form.price) || 0,
          chapters:    curriculum.length,
          lessons:     totalLessons,
          curriculum:  curriculum.map(c => ({ title: c.title, lessons: Number(c.lessons) })),
          whatYouLearn: whatYouLearnList,
        }),
      });
      const data = await res.json();
      if (res.ok) { setSubmitted(true); setTimeout(() => navigate('/employer/trainings'), 2000); }
      else setError(data.message || 'Could not post training.');
    } catch { setError('Cannot connect to server.'); }
    finally { setLoading(false); }
  };

  if (submitted) return (
    <div className="post-tr__success page-enter">
      <div className="post-tr__success-card">
        <div className="post-tr__success-icon">🎓</div>
        <h2>Training Published!</h2>
        <p>Your course is now live. Redirecting…</p>
      </div>
    </div>
  );

  return (
    <div className="post-tr page-enter">
      <div className="post-tr__header">
        <div>
          <div className="section-label">Employer</div>
          <h1 className="post-tr__title">Post a Training</h1>
          <p className="post-tr__subtitle">Create a course and enroll students from our platform.</p>
        </div>
      </div>

      {error && (
        <div style={{ background:'var(--peach-dim)', border:'1px solid rgba(252,165,165,0.3)', borderRadius:'var(--radius-md)', padding:'10px 14px', fontSize:'0.85rem', color:'var(--peach)', marginBottom:'var(--space-md)' }}>
          ⚠ {error}
        </div>
      )}

      <div className="post-tr__layout">
        <form className="post-tr__form" onSubmit={handleSubmit}>

          <div className="post-tr__section">
            <h3 className="post-tr__section-title"><span className="post-int__step">01</span> Course Details</h3>
            <div className="form-group">
              <label className="form-label">Course Title *</label>
              <input className="form-input" required placeholder="e.g. Full Stack Web Development Bootcamp"
                value={form.title} onChange={e => set('title', e.target.value)} />
            </div>
            <div className="post-int__grid-3">
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-select" value={form.category} onChange={e => set('category', e.target.value)}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Level</label>
                <select className="form-select" value={form.level} onChange={e => set('level', e.target.value)}>
                  {LEVELS.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Duration</label>
                <input className="form-input" placeholder="e.g. 8 Weeks"
                  value={form.duration} onChange={e => set('duration', e.target.value)} />
              </div>
            </div>
            <div className="post-int__grid-2">
              <div className="form-group">
                <label className="form-label">Price (₹) — 0 for free</label>
                <input className="form-input" type="number" min="0" placeholder="e.g. 4999"
                  value={form.price} onChange={e => set('price', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Card Color</label>
                <div className="post-int__color-row">
                  {TAG_COLORS.map(c => (
                    <button type="button" key={c}
                      className={`post-int__color-swatch post-int__color-swatch--${c} ${form.tagColor === c ? 'post-int__color-swatch--active' : ''}`}
                      onClick={() => set('tagColor', c)} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="post-tr__section">
            <h3 className="post-tr__section-title"><span className="post-int__step">02</span> Description</h3>
            <div className="form-group">
              <label className="form-label">About this course *</label>
              <textarea className="form-input form-textarea" rows={4} required
                placeholder="Describe what students will learn and who it's for..."
                value={form.description} onChange={e => set('description', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">What you'll learn (one per line)</label>
              <textarea className="form-input form-textarea" rows={4}
                placeholder="Build full-stack web applications&#10;Work with REST APIs&#10;Deploy to cloud"
                value={form.whatYouLearn} onChange={e => set('whatYouLearn', e.target.value)} />
            </div>
          </div>

          <div className="post-tr__section">
            <h3 className="post-tr__section-title"><span className="post-int__step">03</span> Curriculum</h3>
            <div className="post-tr__curriculum">
              {curriculum.map((ch, idx) => (
                <div key={ch.id} className="post-tr__chapter">
                  <span className="post-tr__chapter-num">{String(idx + 1).padStart(2, '0')}</span>
                  <input className="form-input post-tr__chapter-input" value={ch.title}
                    onChange={e => updateChapter(ch.id, 'title', e.target.value)} placeholder="Chapter title" />
                  <div className="post-tr__chapter-lessons">
                    <input className="form-input post-tr__lessons-input" type="number" min="1" max="20"
                      value={ch.lessons} onChange={e => updateChapter(ch.id, 'lessons', e.target.value)} />
                    <span className="post-tr__lessons-label">lessons</span>
                  </div>
                  <button type="button" className="post-tr__chapter-del" onClick={() => removeChapter(ch.id)}>✕</button>
                </div>
              ))}
            </div>
            <div className="post-tr__add-chapter">
              <input className="form-input" placeholder="New chapter title..."
                value={newChapter.title}
                onChange={e => setNewChapter(n => ({ ...n, title: e.target.value }))}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addChapter(); }}} />
              <input className="form-input post-tr__lessons-input" type="number" min="1" max="20"
                value={newChapter.lessons}
                onChange={e => setNewChapter(n => ({ ...n, lessons: Number(e.target.value) }))} />
              <button type="button" className="btn btn-secondary" onClick={addChapter}>+ Add</button>
            </div>
            <p className="post-tr__curriculum-summary">
              <strong style={{ color:'var(--text-primary)' }}>{curriculum.length}</strong> chapters ·
              <strong style={{ color:'var(--text-primary)' }}> {totalLessons}</strong> total lessons
            </p>
          </div>

          <div className="post-int__submit-row">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/employer/trainings')}>Cancel</button>
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              {loading ? '⏳ Publishing...' : '🎓 Publish Training'}
            </button>
          </div>
        </form>

        {/* PREVIEW */}
        <aside className="post-int__preview-panel">
          <div className="post-int__preview-label">Live Preview</div>
          <div className="post-tr__preview-card">
            <div className={`post-tr__preview-thumb post-tr__preview-thumb--${form.tagColor}`}>
              <span className="post-tr__preview-category">{form.category}</span>
              <span className="post-tr__preview-level">{form.level}</span>
            </div>
            <div className="post-tr__preview-body">
              <h4 className="post-tr__preview-title">{form.title || 'Course Title'}</h4>
              <p className="post-tr__preview-desc">{form.description?.slice(0, 90) || 'Description...'}{form.description?.length > 90 ? '…' : ''}</p>
              <div className="post-tr__preview-meta">
                {form.duration && <span>⏱ {form.duration}</span>}
                <span>📚 {totalLessons} lessons</span>
                {form.price !== '' && <span className="post-tr__preview-price">
                  {Number(form.price) === 0 ? '🆓 Free' : `₹${Number(form.price).toLocaleString()}`}
                </span>}
              </div>
            </div>
          </div>

          {curriculum.length > 0 && (
            <div className="post-tr__preview-curriculum">
              <p className="post-int__preview-perks-title">Curriculum preview</p>
              {curriculum.map((ch, i) => (
                <div key={ch.id} className="post-tr__preview-chapter">
                  <span className="post-tr__preview-chapter-num">{String(i+1).padStart(2,'0')}</span>
                  <span>{ch.title || 'Untitled chapter'}</span>
                  <span className="post-tr__preview-chapter-count">{ch.lessons}L</span>
                </div>
              ))}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
