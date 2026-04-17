/* Home.jsx */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InternshipCard from '../components/InternshipCard';
import TrainingCard from '../components/TrainingCard';

// Static categories — these don't need backend
const CATEGORIES = [
  { name: 'Engineering',   icon: '⚙️',  count: '4.2K+' },
  { name: 'Data Science',  icon: '📊',  count: '1.8K+' },
  { name: 'Design',        icon: '🎨',  count: '1.1K+' },
  { name: 'Marketing',     icon: '📣',  count: '980+'  },
  { name: 'DevOps',        icon: '🚀',  count: '620+'  },
  { name: 'Finance',       icon: '💹',  count: '540+'  },
  { name: 'Product',       icon: '📱',  count: '430+'  },
  { name: 'Operations',    icon: '🏭',  count: '310+'  },
];

function HeroSection() {
  const [activeWord, setActiveWord] = useState(0);
  const words = ['Internships', 'Training', 'Placement', 'Growth'];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWord(w => (w + 1) % words.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero">
      <div className="hero__orb hero__orb--1"></div>
      <div className="hero__orb hero__orb--2"></div>
      <div className="hero__orb hero__orb--3"></div>
      <div className="hero__grid-overlay"></div>

      <div className="container hero__content">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-dot"></span>
          <span>India's most visual career platform</span>
        </div>

        <h1 className="hero__headline">
          Kickstart your career<br />
          with the right{' '}
          <span className="hero__headline-cycle">
            <span key={activeWord} className="hero__cycle-word">
              {words[activeWord]}
            </span>
          </span>
        </h1>

        <p className="hero__sub">
          Discover 12,000+ internships, 400+ training programs, and direct placement support
          from 3,200+ companies actively hiring right now.
        </p>

        <div className="hero__ctas">
          <Link to="/internships" className="btn btn-primary btn-lg hero__btn-explore">
            <span>🎯</span> Explore Internships
          </Link>
          <Link to="/register" className="btn btn-secondary btn-lg">
            <span>🏢</span> Hire Talent
          </Link>
        </div>

        <div className="hero__trust">
          {[
            { label: 'Students placed',   value: '8.5L+' },
            { label: 'Partner companies', value: '3.2K+' },
            { label: 'Active internships',value: '12K+'  },
          ].map(t => (
            <div key={t.label} className="hero__trust-item">
              <span className="hero__trust-value">{t.value}</span>
              <span className="hero__trust-label">{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero__preview">
        <div className="hero__preview-card hero__preview-card--1">
          <div className="hero__preview-logo" style={{ color: '#C4B5FD' }}>NL</div>
          <div>
            <p className="hero__preview-role">Frontend Dev Intern</p>
            <p className="hero__preview-co">Novarix Labs · ₹15k/mo</p>
          </div>
          <span className="hero__preview-tag tag tag-lavender">React</span>
        </div>
        <div className="hero__preview-card hero__preview-card--2">
          <div className="hero__preview-logo" style={{ color: '#86EFAC' }}>EA</div>
          <div>
            <p className="hero__preview-role">Data Science Intern</p>
            <p className="hero__preview-co">Ether Analytics · ₹20k/mo</p>
          </div>
          <span className="hero__preview-tag tag tag-mint">Python</span>
        </div>
      </div>
    </section>
  );
}

function CategoryBrowse() {
  return (
    <section className="categories">
      <div className="container">
        <div className="section-header">
          <div className="section-label">Browse by Domain</div>
          <h2>Find your perfect fit</h2>
        </div>
        <div className="categories__grid">
          {CATEGORIES.map(cat => (
            <Link to="/internships" key={cat.name} className="cat-pill">
              <span className="cat-pill__icon">{cat.icon}</span>
              <span className="cat-pill__name">{cat.name}</span>
              <span className="cat-pill__count">{cat.count}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedInternships() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/internships')
      .then(r => r.json())
      .then(data => {
        const list = Array.isArray(data) ? data : [];
        // Show first 4 active internships as "featured"
        setInternships(list.filter(i => i.status === 'active').slice(0, 4));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="featured-section">
      <div className="container">
        <div className="section-header">
          <div className="section-label">Hot Right Now</div>
          <div className="section-header__row">
            <h2>Featured Internships</h2>
            <Link to="/internships" className="btn btn-ghost btn-sm">View all →</Link>
          </div>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: 'var(--space-2xl)', color: 'var(--text-muted)' }}>
            ⏳ Loading internships...
          </div>
        )}

        {!loading && internships.length === 0 && (
          <div style={{ textAlign: 'center', padding: 'var(--space-2xl)', color: 'var(--text-muted)' }}>
            <p style={{ marginBottom: '12px' }}>No internships posted yet.</p>
            <Link to="/register" className="btn btn-primary btn-sm">
              Post the first one →
            </Link>
          </div>
        )}

        {!loading && internships.length > 0 && (
          <div className="masonry-grid">
            {internships.map(i => (
              <InternshipCard key={i.id} internship={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturedTrainings() {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/trainings')
      .then(r => r.json())
      .then(data => {
        const list = Array.isArray(data) ? data : [];
        setTrainings(list.filter(t => t.status === 'active').slice(0, 3));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="featured-section featured-section--alt">
      <div className="container">
        <div className="section-header">
          <div className="section-label">Level Up</div>
          <div className="section-header__row">
            <h2>Trending Training Programs</h2>
            <Link to="/trainings" className="btn btn-ghost btn-sm">View all →</Link>
          </div>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: 'var(--space-xl)', color: 'var(--text-muted)' }}>
            ⏳ Loading courses...
          </div>
        )}

        {!loading && trainings.length === 0 && (
          <div style={{ textAlign: 'center', padding: 'var(--space-xl)', color: 'var(--text-muted)' }}>
            <p>No training programs posted yet.</p>
          </div>
        )}

        {!loading && trainings.length > 0 && (
          <div className="training-grid">
            {trainings.map(t => (
              <TrainingCard
                key={t.id}
                training={t}
                onOpenModal={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function EmployerBanner() {
  return (
    <section className="employer-banner">
      <div className="container">
        <div className="employer-banner__inner">
          <div className="employer-banner__orb"></div>
          <div className="employer-banner__content">
            <span className="section-label">For Companies</span>
            <h2 className="employer-banner__title">Access India's sharpest young talent</h2>
            <p>Post internships, filter by skills, and connect directly with pre-vetted candidates
               from 500+ colleges — all in one dashboard.</p>
            <div className="employer-banner__ctas">
              <Link to="/register" className="btn btn-mint btn-lg">Post a Role</Link>
              <Link to="/employers" className="btn btn-secondary btn-lg">See How It Works</Link>
            </div>
          </div>
          <div className="employer-banner__visual">
            {[
              { val: '3,200+', label: 'Companies hiring'         },
              { val: '48hrs',  label: 'Avg. time to first match' },
              { val: '94%',    label: 'Conversion rate'          },
            ].map(s => (
              <div key={s.label} className="employer-banner__stat">
                <span className="employer-banner__stat-val">{s.val}</span>
                <span className="employer-banner__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="home page-enter">
      <HeroSection />
      <CategoryBrowse />
      <FeaturedInternships />
      <FeaturedTrainings />
      <EmployerBanner />
    </div>
  );
}
