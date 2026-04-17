// pages/student/MyTrainings.jsx
import React, { useState, useEffect } from 'react';
import './MyTrainings.css';
import './MyTrainingsNew.css';

export default function MyTrainings() {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [tab, setTab]             = useState('all');
  const [enrolling, setEnrolling] = useState(null);

  const token = localStorage.getItem('token');

  // Fetch all available trainings — student sees what they can enroll in
  // In future this would be a separate "enrolled" endpoint
  useEffect(() => {
    fetch('http://localhost:8080/api/trainings', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setTrainings(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleEnroll = async (trainingId) => {
    setEnrolling(trainingId);
    try {
      const res = await fetch(`http://localhost:8080/api/trainings/${trainingId}/enroll`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setTrainings(ts => ts.map(t =>
          t.id === trainingId
            ? { ...t, enrolled: (t.enrolled || 0) + 1, enrolledByMe: true }
            : t
        ));
      }
    } catch { /* silent */ }
    finally { setEnrolling(null); }
  };

  const TABS = ['all', 'active', 'free'];
  const filtered = trainings.filter(t => {
    if (tab === 'active') return t.status === 'active';
    if (tab === 'free')   return t.price === 0;
    return true;
  });

  const STATS = [
    { icon: '🎓', label: 'Available Courses', value: trainings.length },
    { icon: '🆓', label: 'Free Courses',       value: trainings.filter(t => t.price === 0).length },
    { icon: '👥', label: 'Total Enrolled',     value: trainings.reduce((s, t) => s + (t.enrolled || 0), 0) },
    { icon: '⭐', label: 'Avg. Rating',        value: trainings.length
      ? (trainings.reduce((s, t) => s + (t.rating || 0), 0) / trainings.length).toFixed(1)
      : '—' },
  ];

  return (
    <div className="mytr page-enter">
      <h1 className="dashboard-title">Trainings</h1>

      {/* Stats */}
      <div className="mytr__stats">
        {STATS.map(s => (
          <div key={s.label} className="mytr__stat">
            <span className="mytr__stat-icon">{s.icon}</span>
            <span className="mytr__stat-value">{s.value}</span>
            <span className="mytr__stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mytr__tabs">
        {TABS.map(t => (
          <button key={t}
            className={`filter-chip ${tab === t ? 'filter-chip--active' : ''}`}
            onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {loading && (
        <div className="ilist__empty">
          <span className="ilist__empty-icon">⏳</span>
          <h3>Loading courses...</h3>
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="ilist__empty">
          <span className="ilist__empty-icon">🎓</span>
          <h3>No courses available yet</h3>
          <p>Employers will post training courses here. Check back soon!</p>
        </div>
      )}

      {/* Training cards */}
      {!loading && filtered.length > 0 && (
        <div className="mytr__grid">
          {filtered.map(t => (
            <div key={t.id} className="mytr__card">
              {/* Thumbnail */}
              <div className={`mytr__thumb mytr__thumb--${t.tagColor || 'lavender'}`}>
                <span className={`tag tag-${t.tagColor || 'lavender'}`}>{t.category}</span>
                {t.level && <span className="mytr__level">{t.level}</span>}
              </div>

              {/* Body */}
              <div className="mytr__card-body">
                <h3 className="mytr__card-title">{t.title}</h3>
                <p className="mytr__card-desc">{t.description}</p>

                <div className="mytr__card-meta">
                  {t.duration  && <span>⏱ {t.duration}</span>}
                  {t.lessons   && <span>📚 {t.lessons} lessons</span>}
                  {t.chapters  && <span>📂 {t.chapters} chapters</span>}
                  {(t.rating > 0) && <span>⭐ {t.rating} ({t.reviews || 0})</span>}
                </div>

                <div className="mytr__card-footer">
                  <span className="mytr__price">
                    {t.price === 0
                      ? <span style={{ color: 'var(--mint)', fontWeight: 700 }}>🆓 Free</span>
                      : <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>₹{t.price?.toLocaleString()}</span>
                    }
                  </span>
                  <span className="mytr__enrolled">
                    👥 {t.enrolled || 0} enrolled
                  </span>
                  <button
                    className={`btn btn-sm ${t.enrolledByMe ? 'mytr__btn-enrolled' : 'btn-primary'}`}
                    disabled={t.enrolledByMe || enrolling === t.id}
                    onClick={() => !t.enrolledByMe && handleEnroll(t.id)}>
                    {enrolling === t.id ? '⏳' : t.enrolledByMe ? '✓ Enrolled' : 'Enroll Now'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
