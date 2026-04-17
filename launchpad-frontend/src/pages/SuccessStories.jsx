// pages/SuccessStories.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SuccessStories.css';

const STORIES = [
  {
    id: 's1', name: 'Ananya Krishnan', initials: 'AK', avatarColor: '#C4B5FD',
    role: 'SDE Intern → Full-Time Offer', company: 'Novarix Labs', companyLogo: 'NL',
    college: 'IIT Bombay', degree: 'B.Tech CSE', batch: '2024',
    category: 'Engineering', tagColor: 'lavender',
    headline: 'Landed my dream role straight out of 2nd year',
    story: "I'd been applying to companies for months with zero responses. Launchpad's profile match feature told me exactly which skills I was missing. I upskilled in React and TypeScript through their training section, updated my profile, and within 2 weeks had 4 interview calls. Novarix Labs gave me a full-time offer after my internship.",
    outcome: 'Full-Time Offer · ₹18 LPA',
    duration: '3 Month Internship',
    rating: 5,
    featured: true,
  },
  {
    id: 's2', name: 'Rohan Mehta', initials: 'RM', avatarColor: '#86EFAC',
    role: 'Data Science Intern', company: 'Ether Analytics', companyLogo: 'EA',
    college: 'BITS Pilani', degree: 'B.E. CS', batch: '2024',
    category: 'Data Science', tagColor: 'mint',
    headline: 'From 0 industry experience to published ML model in 6 months',
    story: "I was struggling to break into data science without prior work experience. Launchpad connected me with Ether Analytics where I worked on real Fortune 500 datasets. The mentorship was incredible — I co-authored a research paper that got accepted at an industry workshop. It completely transformed my career trajectory.",
    outcome: 'Research Publication + PPO',
    duration: '6 Month Internship',
    rating: 5,
    featured: true,
  },
  {
    id: 's3', name: 'Priya Sharma', initials: 'PS', avatarColor: '#FCA5A5',
    role: 'UI/UX Design Intern', company: 'Lumen Studio', companyLogo: 'LS',
    college: 'NID Ahmedabad', degree: 'B.Des', batch: '2023',
    category: 'Design', tagColor: 'peach',
    headline: 'My portfolio went from 0 to 50k users in production',
    story: "As a design student I had great skills but no real-world portfolio. Through Launchpad I got placed at Lumen Studio where I redesigned a fintech app that now has 50,000+ active users. The experience of presenting to actual clients and getting live feedback was invaluable. I got 3 job offers from my portfolio projects alone.",
    outcome: '3 Job Offers · Selected 28 LPA',
    duration: '2 Month Internship',
    rating: 5,
    featured: false,
  },
  {
    id: 's4', name: 'Arjun Nair', initials: 'AN', avatarColor: '#67E8F9',
    role: 'Backend Engineering Intern', company: 'CloudMesh', companyLogo: 'CM',
    college: 'VIT Vellore', degree: 'B.Tech IT', batch: '2024',
    category: 'Engineering', tagColor: 'cyan',
    headline: 'Built microservices handling 2M+ transactions a day',
    story: "Most internships give students dummy projects. At CloudMesh I was writing production code from week one — real microservices, real scale, real consequences. The mentorship was structured and senior engineers genuinely invested time in code reviews. I got AWS certified during the internship and had a return offer before I'd even finished.",
    outcome: 'Return Offer · AWS Certified',
    duration: '4 Month Internship',
    rating: 5,
    featured: true,
  },
  {
    id: 's5', name: 'Sneha Patel', initials: 'SP', avatarColor: '#FCD34D',
    role: 'Growth Marketing Intern', company: 'Drift Social', companyLogo: 'DS',
    college: 'IIM Kozhikode', degree: 'MBA', batch: '2023',
    category: 'Marketing', tagColor: 'amber',
    headline: 'Grew organic traffic 22x and got hired full-time',
    story: "I applied to 40+ companies before finding Launchpad. The platform's filters helped me target exactly the kind of startup culture I wanted. At Drift Social I owned actual budgets and ran campaigns with real data. The skills I built in 3 months were more practical than anything from coursework. I now lead growth for the entire SEO function.",
    outcome: 'Full-Time Growth Lead',
    duration: '3 Month Internship',
    rating: 5,
    featured: false,
  },
  {
    id: 's6', name: 'Karan Verma', initials: 'KV', avatarColor: '#A5B4FC',
    role: 'DevOps Intern', company: 'Stratos Cloud', companyLogo: 'SC',
    college: 'DTU Delhi', degree: 'B.Tech ECE', batch: '2024',
    category: 'Engineering', tagColor: 'lavender',
    headline: 'Automated pipelines that saved the team 20 hours a week',
    story: "DevOps internships are hard to find — most companies want experienced engineers. Launchpad matched me with Stratos Cloud who had a structured program for students. I rewrote their deployment pipeline from scratch, cutting release time by 70%. The real ownership and trust the team gave me was something I'd never experienced in a classroom.",
    outcome: 'Kubernetes Certified · PPO',
    duration: '6 Month Internship',
    rating: 5,
    featured: false,
  },
];

const IMPACT_STATS = [
  { icon: '🎓', value: '8.5L+', label: 'Students placed', sub: 'across all domains' },
  { icon: '🏢', value: '3,200+', label: 'Hiring companies', sub: 'from startups to MNCs' },
  { icon: '💰', value: '₹12L+', label: 'Average package', sub: 'for placed students' },
  { icon: '⭐', value: '94%', label: 'Would recommend', sub: 'based on exit surveys' },
];

const CATEGORIES = ['All', 'Engineering', 'Data Science', 'Design', 'Marketing'];

function StoryCard({ story, onOpen }) {
  return (
    <div className="scard" onClick={() => onOpen(story)}>
      {story.featured && <span className="scard__badge">⭐ Featured</span>}
      <div className="scard__header">
        <div className="scard__avatar" style={{ '--av': story.avatarColor }}>
          {story.initials}
        </div>
        <div className="scard__meta">
          <h4 className="scard__name">{story.name}</h4>
          <span className="scard__role">{story.role}</span>
          <span className="scard__company">@ {story.company}</span>
        </div>
        <div className="scard__company-logo">{story.companyLogo}</div>
      </div>

      <p className="scard__headline">"{story.headline}"</p>

      <p className="scard__excerpt">
        {story.story.slice(0, 120)}…
      </p>

      <div className="scard__footer">
        <div className="scard__tags">
          <span className={`tag tag-${story.tagColor}`}>{story.category}</span>
          <span className="tag tag-mint">{story.outcome.split('·')[0].trim()}</span>
        </div>
        <span className="scard__read-more">Read story →</span>
      </div>
    </div>
  );
}

function StoryModal({ story, onClose }) {
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  return (
    <div className="smodal__overlay" onClick={onClose}>
      <div className="smodal__panel page-enter" onClick={e => e.stopPropagation()}>
        <button className="smodal__close" onClick={onClose}>✕</button>

        <div className="smodal__header" style={{ '--av': story.avatarColor }}>
          <div className="smodal__header-bg" />
          <div className="smodal__avatar">{story.initials}</div>
          <div className="smodal__header-info">
            <h2 className="smodal__name">{story.name}</h2>
            <p className="smodal__role">{story.role} @ {story.company}</p>
            <p className="smodal__college">{story.college} · {story.degree} · Batch {story.batch}</p>
            <div className="smodal__header-tags">
              <span className={`tag tag-${story.tagColor}`}>{story.category}</span>
              <span className="tag tag-mint">✓ {story.outcome}</span>
              <span className="tag tag-cyan">📅 {story.duration}</span>
            </div>
          </div>
        </div>

        <div className="smodal__body">
          <div className="smodal__quote-icon">"</div>
          <h3 className="smodal__headline">{story.headline}</h3>
          <p className="smodal__story">{story.story}</p>

          <div className="smodal__outcome-card">
            <span className="smodal__outcome-icon">🏆</span>
            <div>
              <span className="smodal__outcome-label">Outcome</span>
              <span className="smodal__outcome-val">{story.outcome}</span>
            </div>
          </div>

          <div className="smodal__stars">
            {'★'.repeat(story.rating)}{'☆'.repeat(5 - story.rating)}
            <span className="smodal__stars-label">Experience rating</span>
          </div>
        </div>

        <div className="smodal__footer">
          <p className="smodal__cta-text">Ready to write your own success story?</p>
          <Link to="/register" className="btn btn-primary" onClick={onClose}>
            🚀 Get Started Free
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessStories() {
  const [selectedStory, setSelectedStory] = useState(null);
  const [category, setCategory] = useState('All');

  const filtered = category === 'All' ? STORIES : STORIES.filter(s => s.category === category);

  return (
    <div className="stories page-enter">
      {selectedStory && <StoryModal story={selectedStory} onClose={() => setSelectedStory(null)} />}

      {/* ── HERO ── */}
      <section className="stories__hero">
        <div className="stories__hero-orb stories__hero-orb--1" />
        <div className="stories__hero-orb stories__hero-orb--2" />
        <div className="container stories__hero-content">
          <div className="section-label">Real People. Real Results.</div>
          <h1 className="stories__headline">
            Success stories from<br />
            <span className="stories__headline-accent">students like you</span>
          </h1>
          <p className="stories__sub">
            From first-year students to final-year graduates — see how Launchpad has helped
            thousands launch careers they're proud of.
          </p>
          <Link to="/register" className="btn btn-primary btn-lg">
            🎯 Start Your Story
          </Link>
        </div>
      </section>

      {/* ── IMPACT STATS ── */}
      <section className="stories__stats">
        <div className="container stories__stats-grid">
          {IMPACT_STATS.map(s => (
            <div key={s.label} className="stories__stat">
              <span className="stories__stat-icon">{s.icon}</span>
              <span className="stories__stat-value">{s.value}</span>
              <span className="stories__stat-label">{s.label}</span>
              <span className="stories__stat-sub">{s.sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED STORY ── */}
      <section className="stories__featured">
        <div className="container">
          <div className="section-label">Editor's Pick</div>
          <div className="stories__featured-card" onClick={() => setSelectedStory(STORIES[0])}>
            <div className="stories__featured-bg" style={{ '--av': STORIES[0].avatarColor }} />
            <div className="stories__featured-content">
              <div className="stories__featured-avatar" style={{ '--av': STORIES[0].avatarColor }}>
                {STORIES[0].initials}
              </div>
              <div className="stories__featured-text">
                <span className={`tag tag-${STORIES[0].tagColor}`}>{STORIES[0].category}</span>
                <h2 className="stories__featured-headline">"{STORIES[0].headline}"</h2>
                <p className="stories__featured-excerpt">{STORIES[0].story.slice(0, 200)}…</p>
                <div className="stories__featured-meta">
                  <strong>{STORIES[0].name}</strong>
                  <span>·</span>
                  <span>{STORIES[0].role} @ {STORIES[0].company}</span>
                  <span>·</span>
                  <span style={{ color: 'var(--mint)' }}>{STORIES[0].outcome}</span>
                </div>
                <button className="btn btn-primary" onClick={e => { e.stopPropagation(); setSelectedStory(STORIES[0]); }}>
                  Read Full Story →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ALL STORIES GRID ── */}
      <section className="stories__grid-section">
        <div className="container">
          <div className="stories__grid-header">
            <div>
              <div className="section-label">All Stories</div>
              <h2 className="stories__grid-title">Browse by domain</h2>
            </div>
          </div>

          <div className="stories__filters">
            {CATEGORIES.map(c => (
              <button key={c}
                className={`filter-chip ${category === c ? 'filter-chip--active' : ''}`}
                onClick={() => setCategory(c)}>
                {c}
              </button>
            ))}
          </div>

          <div className="stories__grid">
            {filtered.map(s => (
              <StoryCard key={s.id} story={s} onOpen={setSelectedStory} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="stories__bottom-cta">
        <div className="container">
          <div className="stories__cta-box">
            <div className="stories__cta-orb" />
            <h2>Your story starts here.</h2>
            <p>Join 8.5L+ students who've found their path through Launchpad.</p>
            <div className="stories__cta-btns">
              <Link to="/register" className="btn btn-primary btn-lg">🎓 Create Free Account</Link>
              <Link to="/internships" className="btn btn-secondary btn-lg">🔍 Browse Internships</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
