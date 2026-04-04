// pages/Employers.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Employers.css';

/* ── MOCK TALENT DATA ── */
const TALENT = [
  {
    id: 't1', name: 'Ananya Krishnan', initials: 'AK', avatarColor: '#C4B5FD',
    role: 'Frontend Developer', college: 'IIT Bombay', degree: 'B.Tech CSE', year: '3rd Year',
    location: 'Mumbai', remote: true, skills: ['React', 'TypeScript', 'Figma', 'CSS', 'Node.js'],
    cgpa: '9.1', available: 'Jun 2025', lookingFor: 'Internship',
    bio: 'Passionate about building delightful web experiences. Contributed to 3 open-source projects with 200+ stars. Won Smart India Hackathon 2024.',
    projects: ['E-Commerce Platform (React + Node)', 'AI Resume Parser', 'Real-time Chat App'],
    linkedin: '#', github: '#', tagColor: 'lavender', featured: true,
  },
  {
    id: 't2', name: 'Rohan Mehta', initials: 'RM', avatarColor: '#86EFAC',
    role: 'Data Scientist', college: 'BITS Pilani', degree: 'B.E. CS', year: '4th Year',
    location: 'Hyderabad', remote: true, skills: ['Python', 'TensorFlow', 'SQL', 'Pandas', 'Tableau'],
    cgpa: '8.7', available: 'Jul 2025', lookingFor: 'Internship',
    bio: 'ML enthusiast with hands-on experience in NLP and computer vision. Published research paper on sentiment analysis at ICML workshop.',
    projects: ['Stock Price Predictor (LSTM)', 'Medical Image Classifier', 'Twitter Sentiment Dashboard'],
    linkedin: '#', github: '#', tagColor: 'mint', featured: true,
  },
  {
    id: 't3', name: 'Priya Sharma', initials: 'PS', avatarColor: '#FCA5A5',
    role: 'UI/UX Designer', college: 'NID Ahmedabad', degree: 'B.Des', year: 'Graduate',
    location: 'Bangalore', remote: false, skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Motion Design'],
    cgpa: '8.4', available: 'Immediate', lookingFor: 'Full-Time',
    bio: 'Design thinker with a user-first philosophy. Portfolio includes 12 end-to-end product designs, 2 of which are live with 50k+ users.',
    projects: ['FinTech App Redesign', 'EdTech Onboarding Flow', 'Design System for B2B SaaS'],
    linkedin: '#', github: '#', tagColor: 'peach', featured: false,
  },
  {
    id: 't4', name: 'Arjun Nair', initials: 'AN', avatarColor: '#67E8F9',
    role: 'Backend Engineer', college: 'VIT Vellore', degree: 'B.Tech IT', year: '4th Year',
    location: 'Chennai', remote: true, skills: ['Java', 'Spring Boot', 'MongoDB', 'Docker', 'AWS'],
    cgpa: '8.9', available: 'May 2025', lookingFor: 'Internship',
    bio: 'Backend specialist who has built and deployed 3 production-grade microservices handling 10k+ daily requests. AWS Certified Cloud Practitioner.',
    projects: ['Payment Gateway Integration', 'Inventory Management System', 'Scalable URL Shortener'],
    linkedin: '#', github: '#', tagColor: 'cyan', featured: true,
  },
  {
    id: 't5', name: 'Sneha Patel', initials: 'SP', avatarColor: '#FCD34D',
    role: 'Growth Marketer', college: 'IIM Kozhikode', degree: 'MBA Marketing', year: 'Graduate',
    location: 'Delhi', remote: true, skills: ['SEO', 'Meta Ads', 'Google Analytics', 'Copywriting', 'HubSpot'],
    cgpa: '7.8', available: 'Immediate', lookingFor: 'Full-Time',
    bio: 'Managed ₹15L+ in ad spend with 3.2x average ROAS. Grew organic traffic for a D2C brand from 2k to 45k monthly visitors in 6 months.',
    projects: ['D2C Growth Campaign (3x ROAS)', 'SEO Overhaul (22x traffic)', 'Email Drip Automation'],
    linkedin: '#', github: '#', tagColor: 'amber', featured: false,
  },
  {
    id: 't6', name: 'Karan Verma', initials: 'KV', avatarColor: '#A5B4FC',
    role: 'DevOps Engineer', college: 'DTU Delhi', degree: 'B.Tech ECE', year: '4th Year',
    location: 'Remote', remote: true, skills: ['Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'AWS'],
    cgpa: '8.2', available: 'Jun 2025', lookingFor: 'Internship',
    bio: 'Automated CI/CD pipelines reducing deployment time by 70%. Manages a personal homelab running 12 containerized services with zero downtime.',
    projects: ['K8s Auto-Scaling Setup', 'Multi-cloud DR Pipeline', 'GitOps Workflow Automation'],
    linkedin: '#', github: '#', tagColor: 'lavender', featured: false,
  },
];

const STATS = [
  { icon: '🎓', value: '8.5L+', label: 'Verified Students' },
  { icon: '🏫', value: '500+', label: 'Partner Colleges' },
  { icon: '⚡', value: '48hrs', label: 'Avg. First Match' },
  { icon: '✅', value: '94%', label: 'Hire Rate' },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Post Your Role', desc: 'Describe what you need — skills, duration, stipend, and location. Takes under 5 minutes.' },
  { step: '02', title: 'Get Matched', desc: 'Our algorithm surfaces pre-vetted candidates ranked by skill match, availability and college tier.' },
  { step: '03', title: 'Interview & Hire', desc: 'Connect directly with shortlisted candidates. No middlemen, no agency fees.' },
];

/* ── TALENT CARD ── */
function TalentCard({ talent, onOpen }) {
  return (
    <div className="tcard-talent" onClick={() => onOpen(talent)}>
      {talent.featured && <span className="tcard-talent__badge">⭐ Open to Work</span>}
      <div className="tcard-talent__header">
        <div className="tcard-talent__avatar" style={{ '--av': talent.avatarColor }}>
          {talent.initials}
        </div>
        <div className="tcard-talent__meta">
          <h4 className="tcard-talent__name">{talent.name}</h4>
          <span className="tcard-talent__role">{talent.role}</span>
          <span className="tcard-talent__college">{talent.college} · {talent.year}</span>
        </div>
      </div>

      <div className="tcard-talent__chips">
        <span className="tcard-talent__chip">
          {talent.remote ? '🌐 Remote OK' : `📍 ${talent.location}`}
        </span>
        <span className="tcard-talent__chip">📅 {talent.available}</span>
        <span className={`tag tag-${talent.tagColor}`}>{talent.lookingFor}</span>
      </div>

      <div className="tcard-talent__skills">
        {talent.skills.slice(0, 4).map(s => (
          <span key={s} className={`tag tag-${talent.tagColor}`}>{s}</span>
        ))}
        {talent.skills.length > 4 && (
          <span className="tcard-talent__more">+{talent.skills.length - 4}</span>
        )}
      </div>

      <div className="tcard-talent__footer">
        <span className="tcard-talent__cgpa">⭐ CGPA {talent.cgpa}</span>
        <span className="tcard-talent__cta">View Profile →</span>
      </div>
    </div>
  );
}

/* ── TALENT MODAL ── */
function TalentModal({ talent, onClose }) {
  const [contacted, setContacted] = useState(false);

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  return (
    <div className="tmodal-emp__overlay" onClick={onClose}>
      <div className="tmodal-emp__panel page-enter" onClick={e => e.stopPropagation()}>
        <button className="tmodal-emp__close" onClick={onClose}>✕</button>

        {/* Header */}
        <div className="tmodal-emp__header" style={{ '--av': talent.avatarColor }}>
          <div className="tmodal-emp__header-bg" />
          <div className="tmodal-emp__avatar">{talent.initials}</div>
          <div className="tmodal-emp__header-info">
            <h2 className="tmodal-emp__name">{talent.name}</h2>
            <p className="tmodal-emp__role">{talent.role}</p>
            <p className="tmodal-emp__college">{talent.college} · {talent.degree} · {talent.year}</p>
            <div className="tmodal-emp__header-tags">
              <span className={`tag tag-${talent.tagColor}`}>{talent.lookingFor}</span>
              <span className="tag tag-mint">📅 Available {talent.available}</span>
              <span className="tag tag-cyan">⭐ CGPA {talent.cgpa}</span>
              {talent.remote && <span className="tag tag-lavender">🌐 Remote OK</span>}
            </div>
          </div>
        </div>

        <div className="tmodal-emp__body">
          <div className="tmodal-emp__left">
            {/* Bio */}
            <section className="tmodal-emp__section">
              <h4 className="tmodal-emp__section-title">About</h4>
              <p className="tmodal-emp__bio">{talent.bio}</p>
            </section>

            {/* Skills */}
            <section className="tmodal-emp__section">
              <h4 className="tmodal-emp__section-title">Skills</h4>
              <div className="tmodal-emp__skills">
                {talent.skills.map(s => (
                  <span key={s} className={`tag tag-${talent.tagColor} tmodal-emp__skill`}>{s}</span>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section className="tmodal-emp__section">
              <h4 className="tmodal-emp__section-title">Notable Projects</h4>
              <div className="tmodal-emp__projects">
                {talent.projects.map((p, i) => (
                  <div key={i} className="tmodal-emp__project">
                    <span className="tmodal-emp__project-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="tmodal-emp__project-name">{p}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Links */}
            <section className="tmodal-emp__section">
              <h4 className="tmodal-emp__section-title">Links</h4>
              <div className="tmodal-emp__links">
                <a href={talent.linkedin} className="tmodal-emp__link tmodal-emp__link--blue">🔷 LinkedIn</a>
                <a href={talent.github}   className="tmodal-emp__link tmodal-emp__link--dark">⌥ GitHub</a>
              </div>
            </section>
          </div>

          {/* CTA Panel */}
          <aside className="tmodal-emp__cta">
            <div className="tmodal-emp__cta-avatar" style={{ '--av': talent.avatarColor }}>
              {talent.initials}
            </div>
            <p className="tmodal-emp__cta-name">{talent.name}</p>
            <p className="tmodal-emp__cta-sub">{talent.role} · {talent.location}</p>

            <button
              className={`btn btn-lg tmodal-emp__contact-btn ${contacted ? 'tmodal-emp__contact-btn--done' : 'btn-primary'}`}
              onClick={() => setContacted(true)}
              disabled={contacted}>
              {contacted ? '✓ Request Sent!' : '📩 Contact Candidate'}
            </button>
            <button className="btn btn-secondary btn-lg tmodal-emp__save-btn">
              ♡ Save Profile
            </button>

            <div className="tmodal-emp__details">
              {[
                ['📍', 'Location', talent.location],
                ['📅', 'Available', talent.available],
                ['🎯', 'Looking for', talent.lookingFor],
                ['⭐', 'CGPA', talent.cgpa],
              ].map(([icon, label, val]) => (
                <div key={label} className="tmodal-emp__detail-row">
                  <span>{icon} {label}</span>
                  <strong>{val}</strong>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ── MAIN PAGE ── */
export default function Employers() {
  const [selectedTalent, setSelectedTalent] = useState(null);
  const [roleFilter, setRoleFilter] = useState('All');
  const roles = ['All', 'Frontend Developer', 'Data Scientist', 'UI/UX Designer', 'Backend Engineer', 'Growth Marketer', 'DevOps Engineer'];
  const filtered = roleFilter === 'All' ? TALENT : TALENT.filter(t => t.role === roleFilter);

  return (
    <div className="employers page-enter">
      {selectedTalent && (
        <TalentModal talent={selectedTalent} onClose={() => setSelectedTalent(null)} />
      )}

      {/* ── HERO ── */}
      <section className="employers__hero">
        <div className="employers__hero-orb employers__hero-orb--1" />
        <div className="employers__hero-orb employers__hero-orb--2" />
        <div className="employers__hero-grid" />
        <div className="container employers__hero-content">
          <div className="section-label">For Companies</div>
          <h1 className="employers__headline">
            Hire India's sharpest<br />
            <span className="employers__headline-accent">young talent</span>
          </h1>
          <p className="employers__sub">
            Access a pre-vetted pool of 8.5L+ students from 500+ colleges.
            Post roles, browse profiles, and connect directly — no agency fees, no middlemen.
          </p>
          <div className="employers__hero-ctas">
            <Link to="/register" className="btn btn-primary btn-lg">🚀 Post a Role — Free</Link>
            <a href="#talent" className="btn btn-secondary btn-lg">👥 Browse Talent</a>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="employers__stats-row">
        <div className="container employers__stats-inner">
          {STATS.map(s => (
            <div key={s.label} className="employers__stat">
              <span className="employers__stat-icon">{s.icon}</span>
              <span className="employers__stat-value">{s.value}</span>
              <span className="employers__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="employers__how">
        <div className="container">
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: 'var(--space-sm)' }}>Simple Process</div>
          <h2 className="employers__how-title">Hire in 3 steps</h2>
          <div className="employers__how-grid">
            {HOW_IT_WORKS.map((h, i) => (
              <div key={h.step} className="employers__how-card">
                <span className="employers__how-step">{h.step}</span>
                <h3 className="employers__how-card-title">{h.title}</h3>
                <p>{h.desc}</p>
                {i < HOW_IT_WORKS.length - 1 && <div className="employers__how-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TALENT POOL ── */}
      <section className="employers__talent" id="talent">
        <div className="container">
          <div className="employers__talent-header">
            <div>
              <div className="section-label">Ready to hire</div>
              <h2 className="employers__talent-title">Students open to work</h2>
            </div>
            <Link to="/register" className="btn btn-primary">Post a Role →</Link>
          </div>

          {/* Role filter */}
          <div className="employers__role-filters">
            {roles.map(r => (
              <button key={r}
                className={`filter-chip ${roleFilter === r ? 'filter-chip--active' : ''}`}
                onClick={() => setRoleFilter(r)}>
                {r}
              </button>
            ))}
          </div>

          <div className="employers__talent-grid">
            {filtered.map(t => (
              <TalentCard key={t.id} talent={t} onOpen={setSelectedTalent} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="employers__cta-banner">
        <div className="container">
          <div className="employers__cta-inner">
            <div className="employers__cta-orb" />
            <h2 className="employers__cta-title">Ready to find your next intern?</h2>
            <p>Join 3,200+ companies already hiring through Launchpad.</p>
            <div className="employers__cta-btns">
              <Link to="/register" className="btn btn-mint btn-lg">Post a Role — Free</Link>
              <Link to="/login" className="btn btn-secondary btn-lg">Sign In</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
