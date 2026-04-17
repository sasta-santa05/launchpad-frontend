// pages/student/BrowseInternships.jsx
import React, { useState, useMemo, useEffect } from 'react';
import InternshipCard from '../../components/InternshipCard';

const CATEGORIES = ['All', 'Engineering', 'Data Science', 'Design', 'Marketing', 'DevOps'];
const LOCATIONS  = ['All', 'Remote', 'Bangalore', 'Mumbai', 'Hyderabad', 'Delhi'];
const DURATIONS  = ['All', '2 Months', '3 Months', '4 Months', '6 Months'];

export default function BrowseInternships() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState('');
  const [filters, setFilters] = useState({
    category: 'All', location: 'All', duration: 'All',
    minStipend: 0, remote: false, search: '',
  });
  const [sortBy, setSortBy] = useState('latest');

  // Fetch real internships from backend
  useEffect(() => {
    fetch('http://localhost:8080/api/internships')
      .then(res => res.json())
      .then(data => {
        setInternships(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load internships.');
        setLoading(false);
      });
  }, []);

  const set = (key, value) => setFilters(f => ({ ...f, [key]: value }));

  const filtered = useMemo(() => {
    let result = internships.filter(i => {
      if (filters.search &&
        !i.role?.toLowerCase().includes(filters.search.toLowerCase()) &&
        !i.category?.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.category !== 'All' && i.category !== filters.category) return false;
      if (filters.remote && !i.remote) return false;
      if (filters.location !== 'All') {
        if (filters.location === 'Remote' && !i.remote) return false;
        if (filters.location !== 'Remote' && i.location !== filters.location) return false;
      }
      if (filters.duration !== 'All' && i.duration !== filters.duration) return false;
      if (i.stipend < filters.minStipend) return false;
      return true;
    });
    if (sortBy === 'stipend-high') result = [...result].sort((a, b) => b.stipend - a.stipend);
    if (sortBy === 'applicants')  result = [...result].sort((a, b) => (a.applicants||0) - (b.applicants||0));
    return result;
  }, [filters, sortBy, internships]);

  const resetFilters = () => setFilters({
    category: 'All', location: 'All', duration: 'All',
    minStipend: 0, remote: false, search: '',
  });

  return (
    <div className="ilist page-enter">
      <div className="ilist__header">
        <div className="container">
          <div className="section-label">Opportunities</div>
          <h1 className="ilist__title">Explore Internships</h1>
          <p className="ilist__subtitle">
            Discover {internships.length}+ live internships curated for you.
          </p>
          <div className="ilist__search-wrap">
            <span className="ilist__search-icon">🔍</span>
            <input className="ilist__search" type="text"
              placeholder="Search by role, company, or skill..."
              value={filters.search}
              onChange={e => set('search', e.target.value)} />
            {filters.search && (
              <button className="ilist__search-clear" onClick={() => set('search', '')}>✕</button>
            )}
          </div>
        </div>
      </div>

      <div className="container ilist__body">
        <aside className="ilist__sidebar">
          <div className="filter-panel">
            <div className="filter-panel__header">
              <span className="filter-panel__title">Filters</span>
              <button className="filter-panel__reset" onClick={resetFilters}>Reset</button>
            </div>
            <div className="filter-group">
              <label className="filter-group__label">Work Type</label>
              <button className={`filter-toggle ${filters.remote ? 'filter-toggle--active' : ''}`}
                onClick={() => set('remote', !filters.remote)}>
                <span className="filter-toggle__dot"></span>Remote Only
              </button>
            </div>
            <div className="filter-group">
              <label className="filter-group__label">Category</label>
              <div className="filter-chips">
                {CATEGORIES.map(cat => (
                  <button key={cat}
                    className={`filter-chip ${filters.category === cat ? 'filter-chip--active' : ''}`}
                    onClick={() => set('category', cat)}>{cat}</button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <label className="filter-group__label">Location</label>
              <select className="form-select" value={filters.location}
                onChange={e => set('location', e.target.value)}>
                {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-group__label">Duration</label>
              <div className="filter-chips">
                {DURATIONS.map(d => (
                  <button key={d}
                    className={`filter-chip ${filters.duration === d ? 'filter-chip--active' : ''}`}
                    onClick={() => set('duration', d)}>{d}</button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <label className="filter-group__label">
                Min Stipend: <strong style={{ color: 'var(--mint)' }}>
                  ₹{filters.minStipend.toLocaleString()}
                </strong>
              </label>
              <input type="range" className="filter-range"
                min="0" max="25000" step="1000"
                value={filters.minStipend}
                onChange={e => set('minStipend', Number(e.target.value))} />
              <div className="filter-range-labels"><span>₹0</span><span>₹25K</span></div>
            </div>
          </div>
        </aside>

        <div className="ilist__main">
          <div className="ilist__results-bar">
            <span className="ilist__results-count">
              <strong style={{ color: 'var(--text-primary)' }}>{filtered.length}</strong>
              <span style={{ color: 'var(--text-muted)' }}> internships found</span>
            </span>
            <div className="ilist__sort">
              <label className="filter-group__label" style={{ margin: 0 }}>Sort:</label>
              <select className="form-select ilist__sort-select" value={sortBy}
                onChange={e => setSortBy(e.target.value)}>
                <option value="latest">Latest</option>
                <option value="stipend-high">Stipend: High to Low</option>
                <option value="applicants">Fewest Applicants</option>
              </select>
            </div>
          </div>

          {loading && (
            <div className="ilist__empty">
              <span className="ilist__empty-icon">⏳</span>
              <h3>Loading internships...</h3>
            </div>
          )}
          {error && (
            <div className="ilist__empty">
              <span className="ilist__empty-icon">⚠️</span>
              <h3>{error}</h3>
            </div>
          )}
          {!loading && !error && filtered.length === 0 && (
            <div className="ilist__empty">
              <span className="ilist__empty-icon">🔭</span>
              <h3>No internships found</h3>
              <p>Try adjusting your filters or check back later.</p>
              <button className="btn btn-primary" onClick={resetFilters}>Reset Filters</button>
            </div>
          )}
          {!loading && !error && filtered.length > 0 && (
            <div className="ilist__masonry">
              {filtered.map(i => (
                <InternshipCard
                  key={i.id}
                  internship={i}
                  basePath="/student/browse"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
