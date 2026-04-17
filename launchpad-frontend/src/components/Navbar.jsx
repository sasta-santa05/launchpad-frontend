/* Navbar.jsx */
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">◈</span>
          <span className="navbar__logo-text">Launch<span className="navbar__logo-accent">pad</span></span>
        </Link>

        {/* Center Nav Links */}
        <div className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`}>
          <NavLink to="/internships" className={({ isActive }) =>
            `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
            Internships
          </NavLink>
          <NavLink to="/trainings" className={({ isActive }) =>
            `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
            Training
          </NavLink>
          <NavLink to="/employers" className={({ isActive }) =>
            `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
            For Employers
          </NavLink>
          <NavLink to="/success-stories" className={({ isActive }) =>
            `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
            Success Stories
          </NavLink>
        </div>

        {/* CTA Area */}
        <div className="navbar__cta">
          <Link to="/login" className="btn btn-ghost btn-sm">Log In</Link>
          <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
          <button
            className="navbar__burger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu">
            <span className={`navbar__burger-line ${mobileOpen ? 'open' : ''}`}></span>
            <span className={`navbar__burger-line ${mobileOpen ? 'open' : ''}`}></span>
            <span className={`navbar__burger-line ${mobileOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
