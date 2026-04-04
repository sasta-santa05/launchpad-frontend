/* TrainingList.jsx */
import React, { useState, useMemo, useEffect } from 'react';
import TrainingCard from '../components/TrainingCard';
import TrainingModal from '../components/TrainingModal';

const CATEGORIES = ['All', 'Engineering', 'Data Science', 'Design', 'DevOps', 'Marketing'];
const LEVELS     = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const MAX_PRICE  = 10000;

export default function TrainingList() {
  const [trainings, setTrainings]             = useState([]);
  const [loading, setLoading]                 = useState(true);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [filters, setFilters] = useState({
    category: 'All', level: 'All',
    maxPrice: MAX_PRICE, search: '',
  });
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    fetch('http://localhost:8080/api/trainings')
      .then(res => res.json())
      .then(data => {
        setTrainings(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const set = (key, val) => setFilters(f => ({ ...f, [key]: val }));

  const filtered = useMemo(() => {
    let result = trainings.filter(t => {
      if (filters.search &&
        !t.title?.toLowerCase().includes(filters.search.toLowerCase()) &&
        !t.category?.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.category !== 'All' && t.category !== filters.category) return false;
      if (filters.level !== 'All' && t.level !== filters.level) return false;
      if (filters.maxPrice < MAX_PRICE && (t.price || 0) > filters.maxPrice) return false;
      return true;
    });
    if (sortBy === 'price-low')  result = [...result].sort((a, b) => (a.price||0) - (b.price||0));
    if (sortBy === 'price-high') result = [...result].sort((a, b) => (b.price||0) - (a.price||0));
    if (sortBy === 'popular')    result = [...result].sort((a, b) => (b.enrolled||0) - (a.enrolled||0));
    return result;
  }, [filters, sortBy, trainings]);

  const resetFilters = () => setFilters({
    category: 'All', level: 'All', maxPrice: MAX_PRICE, search: '',
  });

  return (
    <div className="tlist page-enter">
      {selectedTraining && (
        <TrainingModal
          training={selectedTraining}
          onClose={() => setSelectedTraining(null)}
        />
      )}

      {/* Header */}
      <div className="tlist__header">
        <div className="container">
          <div className="section-label">Learn & Grow</div>
          <h1 className="tlist__title">Training Programs</h1>
          <p className="tlist__subtitle">
            Upskill with {trainings.length}+ industry-led courses.
          </p>
          <div className="ilist__search-wrap">
            <span className="ilist__search-icon">🔍</span>
            <input className="ilist__search" type="text"
              placeholder="Search courses..."
              value={filters.search}
              onChange={e => set('search', e.target.value)} />
            {filters.search && (
              <button className="ilist__search-clear" onClick={() => set('search', '')}>✕</button>
            )}
          </div>
        </div>
      </div>

      <div className="container ilist__body">
        {/* Sidebar */}
        <aside className="ilist__sidebar">
          <div className="filter-panel">
            <div className="filter-panel__header">
              <span className="filter-panel__title">Filters</span>
              <button className="filter-panel__reset" onClick={resetFilters}>Reset</button>
            </div>

            <div className="filter-group">
              <label className="filter-group__label">Category</label>
              <div className="filter-chips">
                {CATEGORIES.map(c => (
                  <button key={c}
                    className={`filter-chip ${filters.category === c ? 'filter-chip--active' : ''}`}
                    onClick={() => set('category', c)}>{c}</button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-group__label">Level</label>
              <div className="filter-chips">
                {LEVELS.map(l => (
                  <button key={l}
                    className={`filter-chip ${filters.level === l ? 'filter-chip--active' : ''}`}
                    onClick={() => set('level', l)}>{l}</button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-group__label">
                Max Price: <strong style={{ color: 'var(--mint)' }}>
                  {filters.maxPrice >= MAX_PRICE ? 'Any' : `₹${filters.maxPrice.toLocaleString()}`}
                </strong>
              </label>
              <input type="range" className="filter-range"
                min="0" max={MAX_PRICE} step="500"
                value={filters.maxPrice}
                onChange={e => set('maxPrice', Number(e.target.value))} />
              <div className="filter-range-labels">
                <span>Free</span><span>₹{MAX_PRICE.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="ilist__main">
          <div className="ilist__results-bar">
            <span className="ilist__results-count">
              <strong style={{ color: 'var(--text-primary)' }}>{filtered.length}</strong>
              <span style={{ color: 'var(--text-muted)' }}> courses found</span>
            </span>
            <div className="ilist__sort">
              <label className="filter-group__label" style={{ margin: 0 }}>Sort:</label>
              <select className="form-select ilist__sort-select" value={sortBy}
                onChange={e => setSortBy(e.target.value)}>
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
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
              <h3>No courses found</h3>
              <p>Try adjusting your filters or check back later.</p>
              <button className="btn btn-primary" onClick={resetFilters}>Reset Filters</button>
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <div className="ilist__masonry">
              {filtered.map(t => (
                <TrainingCard
                  key={t.id}
                  training={t}
                  onOpenModal={() => setSelectedTraining(t)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
