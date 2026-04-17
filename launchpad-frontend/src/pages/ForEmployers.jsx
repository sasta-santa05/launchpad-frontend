// ForEmployers.jsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { talentProfiles } from '../data/talentData';
import StudentProfileModal from '../components/StudentProfileModal';
import './ForEmployers.css';

const DOMAINS   = ['All', 'Engineering', 'Data Science', 'Design', 'Marketing', 'Finance'];
const OPEN_TO   = ['All', 'Internship', 'Full-time'];

function TalentCard({ student, onView }) {
  const { name, initials, avatarColor, college, degree, year,
          skills, openTo, bio, location, remote, domainColor, featured } = student;

  const colorMap = {
    lavender: { accent: '#C4B5FD', dim: 'rgba(196,181,253,0.12)' },
    mint:     { accent: '#86EFAC', dim: 'rgba(134,239,172,0.12)' },
    peach:    { accent: '#FCA5A5', dim: 'rgba(252,165,165,0.12)' },
    cyan:     { accent: '#67E8F9', dim: 'rgba(103,232,249,0.12)' },
    amber:    { accent: '#FCD34D', dim: 'rgba(252,211,77,0.12)'  },
  };
  const colors = colorMap[domainColor] || colorMap.lavender;

  return (
    <div className="tcard-talent" onClick={() => onView(student)}>
      {featured && <span className="tcard-talent__featured">⭐ Featured</span>}

      {/* Avatar + name */}
      <div className="tcard-talent__top">
        <div
          className="tcard-talent__avatar"
          style={{ borderColor: colors.accent, color: colors.accent, background: colors.dim }}
        >
          {initials}
        </div>
        <div className="tcard-talent__identity">
          <h4 className="tcard-talent__name">{name}</h4>
          <p className="tcard-talent__college">{college}</p>
          <p className="tcard-talent__degree">{degree} · {year}</p>
        </div>
      </div>

      {/* Bio */}
      <p className="tcard-talent__bio">{bio}</p>

      {/* Skills */}
      <div className="tcard-talent__skills">
        {skills.slice(0, 4).map(s => (
          <span
            key={s}
            className="tcard-talent__skill"
            style={{ background: colors.dim, color: colors.accent }}
          >
            {s}
          </span>
        ))}
        {skills.length > 4 && (
          <span className="tcard-talent__skill-more">+{skills.length - 4}</span>
        )}
      </div>

      {/* Footer */}
      <div className="tcard-talent__footer">
        <div className="tcard-talent__meta">
          <span>📍 {remote ? `${location} · Remote` : location}</span>
        </div>
        <div className="tcard-talent__open">
          {openTo.map(o => (
            <span key={o} className="tcard-talent__open-tag">
              {o === 'Internship' ? '🎓' : '💼'} {o}
            </span>
          ))}
        </div>
      </div>

      <div className="tcard-talent__cta">
        View Profile →
      </div>
    </div>
  );
}

export default function ForEmployers() {
  const [filters, setFilters] = useState({ domain: 'All', openTo: 'All', remote: false, search: '' });
  const [selected, setSelected] = useState(null);
  const set = (k, v) => setFilters(f => ({ ...f, [k]: v }));

  const filtered = useMemo(() => {
    return talentProfiles.filter(s => {
      if (filters.search &&
        !s.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !s.skills.some(sk => sk.toLowerCase().includes(filters.search.toLowerCase())) &&
        !s.college.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.domain !== 'All' && s.domain !== filters.domain) return false;
      if (filters.openTo !== 'All' && !s.openTo.includes(filters.openTo)) return false;
      if (filters.remote && !s.remote) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="employers-page page-enter">
      {selected && (
        <StudentProfileModal student={selected} onClose={() => setSelected(null)} />
      )}

      {/* ── HERO ── */}
      <section className="emp-hero">
        <div className="emp-hero__orb emp-hero__orb--1" />
        <div className="emp-hero__orb emp-hero__orb--2" />
        <div className="emp-hero__grid" />
        <div className="container emp-hero__content">
          <div className="section-label">For Companies</div>
          <h1 className="emp-hero__headline">
            India's sharpest<br />
            <span className="emp-hero__accent">young talent</span>,<br />
            ready to ship.
          </h1>
          <p className="emp-hero__sub">
            Browse pre-vetted students from 500+ colleges. Filter by skill, domain, and availability.
            Post a role or reach out directly — all in one place.
          </p>
          <div className="emp-hero__ctas">
            <Link to="/register" className="btn btn-primary btn-lg">
              🏢 Post a Role Free
            </Link>
            <a href="#talent" className="btn btn-secondary btn-lg">
              👀 Browse Talent
            </a>
          </div>

          {/* Trust stats */}
          <div className="emp-hero__stats">
            {[
              { val: '8.5L+', label: 'Verified students' },
              { val: '500+', label: 'Partner colleges' },
              { val: '48 hrs', label: 'Avg. time to match' },
              { val: '94%', label: 'Offer acceptance rate' },
            ].map(s => (
              <div key={s.label} className="emp-hero__stat">
                <span className="emp-hero__stat-val">{s.val}</span>
                <span className="emp-hero__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="emp-how">
        <div className="container">
          <div className="section-label">Process</div>
          <h2 className="emp-how__title">Hire in 3 steps</h2>
          <div className="emp-how__steps">
            {[
              { num: '01', icon: '📋', title: 'Post Your Role', desc: 'Describe the role, skills needed, stipend range, and timeline. Takes under 5 minutes.' },
              { num: '02', icon: '🤖', title: 'Get Matched', desc: 'Our AI surfaces the top 10 profiles ranked by skill match, GPA, and availability.' },
              { num: '03', icon: '🤝', title: 'Hire Directly', desc: 'Message candidates, schedule interviews, and make offers — all inside the platform.' },
            ].map(step => (
              <div key={step.num} className="emp-how__step">
                <div className="emp-how__step-num">{step.num}</div>
                <div className="emp-how__step-icon">{step.icon}</div>
                <h4 className="emp-how__step-title">{step.title}</h4>
                <p className="emp-how__step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TALENT BROWSE ── */}
      <section className="emp-talent" id="talent">
        <div className="container">
          <div className="emp-talent__header">
            <div>
              <div className="section-label">Talent Pool</div>
              <h2 className="emp-talent__title">Students open to work</h2>
            </div>
            <Link to="/register" className="btn btn-primary">Post a Role →</Link>
          </div>

          {/* Filters */}
          <div className="emp-filters">
            <div className="emp-filters__search-wrap">
              <span>🔍</span>
              <input
                className="emp-filters__search"
                type="text"
                placeholder="Search by name, skill, or college..."
                value={filters.search}
                onChange={e => set('search', e.target.value)}
              />
            </div>

            <div className="emp-filters__row">
              {/* Domain chips */}
              <div className="emp-filter-group">
                <span className="emp-filter-label">Domain</span>
                <div className="emp-filter-chips">
                  {DOMAINS.map(d => (
                    <button
                      key={d}
                      className={`emp-filter-chip ${filters.domain === d ? 'active' : ''}`}
                      onClick={() => set('domain', d)}
                    >{d}</button>
                  ))}
                </div>
              </div>

              {/* Open to */}
              <div className="emp-filter-group">
                <span className="emp-filter-label">Open to</span>
                <div className="emp-filter-chips">
                  {OPEN_TO.map(o => (
                    <button
                      key={o}
                      className={`emp-filter-chip ${filters.openTo === o ? 'active' : ''}`}
                      onClick={() => set('openTo', o)}
                    >{o}</button>
                  ))}
                </div>
              </div>

              {/* Remote toggle */}
              <button
                className={`emp-filter-chip emp-filter-chip--toggle ${filters.remote ? 'active' : ''}`}
                onClick={() => set('remote', !filters.remote)}
              >
                🌐 Remote only
              </button>
            </div>

            <p className="emp-filters__count">
              <strong style={{ color: 'var(--text-primary)' }}>{filtered.length}</strong>
              <span style={{ color: 'var(--text-muted)' }}> candidates found</span>
            </p>
          </div>

          {/* Talent grid */}
          <div className="emp-talent__grid">
            {filtered.map(s => (
              <TalentCard key={s.id} student={s} onView={setSelected} />
            ))}
          </div>

          {/* Locked teaser row */}
          <div className="emp-talent__locked">
            <div className="emp-talent__locked-inner">
              <span className="emp-talent__lock-icon">🔒</span>
              <div>
                <h4>See 8,50,000+ more verified profiles</h4>
                <p>Create a free employer account to unlock full contact details, direct messaging, AI matching, and bulk outreach.</p>
              </div>
              <Link to="/register" className="btn btn-primary">Get Full Access →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPANY LOGOS ── */}
      <section className="emp-logos">
        <div className="container">
          <p className="emp-logos__label">Trusted by 3,200+ companies</p>
          <div className="emp-logos__row">
            {['Novarix Labs', 'Ether Analytics', 'Lumen Studio', 'CloudMesh', 'Drift Social', 'Stratos Cloud'].map(c => (
              <div key={c} className="emp-logos__item">{c}</div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
