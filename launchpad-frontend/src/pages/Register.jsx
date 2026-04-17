// Register.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const STUDENT_FIELDS = [
  { name: 'fullName',   label: 'Full Name',           type: 'text',     placeholder: 'Your full name'        },
  { name: 'email',      label: 'Email Address',        type: 'email',    placeholder: 'you@college.edu'       },
  { name: 'college',    label: 'College / University', type: 'text',     placeholder: 'e.g. IIT Bombay'       },
  { name: 'degree',     label: 'Degree',               type: 'text',     placeholder: 'B.Tech, MBA...'        },
  { name: 'password',   label: 'Password',             type: 'password', placeholder: 'Min. 8 characters'     },
];

const EMPLOYER_FIELDS = [
  { name: 'contactName', label: 'Your Name',        type: 'text',     placeholder: 'HR Manager / Founder'  },
  { name: 'company',     label: 'Company Name',     type: 'text',     placeholder: 'Acme Corp'             },
  { name: 'email',       label: 'Work Email',       type: 'email',    placeholder: 'you@company.com'       },
  { name: 'website',     label: 'Company Website',  type: 'url',      placeholder: 'https://...'           },
  { name: 'password',    label: 'Password',         type: 'password', placeholder: 'Min. 8 characters'     },
];

export default function Register({ onRegister }) {
  const [intent, setIntent]     = useState('student');
  const [step, setStep]         = useState(1);
  const [formData, setFormData] = useState({});
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const fields = intent === 'student' ? STUDENT_FIELDS : EMPLOYER_FIELDS;

  const handleChange = (key, value) => {
    setFormData(f => ({ ...f, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Build request body based on role
      const body = intent === 'student'
        ? {
            name:     formData.fullName,
            email:    formData.email,
            password: formData.password,
            role:     'student',
          }
        : {
            name:     formData.company,
            email:    formData.email,
            password: formData.password,
            role:     'employer',
          };

      const res = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        // Save to localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('name', data.name);
        localStorage.setItem('userId', data.userId);

        // Move to success screen
        setStep(2);
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Cannot connect to server. Make sure the backend is running on port 8080.');
    } finally {
      setLoading(false);
    }
  };

  const finalizeRegistration = () => {
    if (onRegister) onRegister(intent);
  };

  return (
    <div className="register-page page-enter">
      <div className="register-bg">
        <div className="register-bg__orb register-bg__orb--1"></div>
        <div className="register-bg__orb register-bg__orb--2"></div>
        <div className="register-bg__grid"></div>
      </div>

      <div className="container register-inner">
        {step === 2 ? (
          /* SUCCESS STATE */
          <div className="register-success">
            <div className="register-success__icon">🎉</div>
            <h2 className="register-success__title">You're in!</h2>
            <p className="register-success__sub">
              Welcome to Launchpad, {formData.fullName || formData.company}.
              {intent === 'student'
                ? ' Your profile is set up. Start exploring opportunities!'
                : ' Your employer account is ready. Start posting internships!'}
            </p>
            <div className="register-success__actions">
              <button onClick={finalizeRegistration} className="btn btn-primary btn-lg">
                {intent === 'student' ? '🎯 Enter Student Dashboard' : '🏢 Go to Dashboard'}
              </button>
            </div>
          </div>
        ) : (
          /* REGISTRATION FORM */
          <div className="register-card">
            <div className="register-card__header">
              <Link to="/" className="register-card__logo">
                <span style={{ color: 'var(--lavender)' }}>◈</span>
                <span>Launch<span style={{ color: 'var(--lavender)' }}>pad</span></span>
              </Link>
              <h2 className="register-card__title">Create your account</h2>
              <p className="register-card__sub">
                Already have one? <Link to="/login" className="login-form__link">Log in</Link>
              </p>
            </div>

            {/* INTENT SELECTOR */}
            <div className="register-intent">
              <p className="register-intent__label">I am...</p>
              <div className="register-intent__options">
                <button
                  type="button"
                  className={`register-intent__option ${intent === 'student' ? 'register-intent__option--active' : ''}`}
                  onClick={() => { setIntent('student'); setError(''); }}>
                  <span className="register-intent__option-icon">🎓</span>
                  <div>
                    <span className="register-intent__option-title">A Student</span>
                    <span className="register-intent__option-desc">Looking for internships & training</span>
                  </div>
                  <span className="register-intent__check">{intent === 'student' ? '✓' : ''}</span>
                </button>

                <button
                  type="button"
                  className={`register-intent__option ${intent === 'employer' ? 'register-intent__option--active' : ''}`}
                  onClick={() => { setIntent('employer'); setError(''); }}>
                  <span className="register-intent__option-icon">🏢</span>
                  <div>
                    <span className="register-intent__option-title">An Employer</span>
                    <span className="register-intent__option-desc">Looking to hire & post opportunities</span>
                  </div>
                  <span className="register-intent__check">{intent === 'employer' ? '✓' : ''}</span>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div style={{
                background: 'var(--peach-dim)',
                border: '1px solid rgba(252,165,165,0.3)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 14px',
                fontSize: '0.85rem',
                color: 'var(--peach)',
                marginBottom: 'var(--space-md)'
              }}>
                ⚠ {error}
              </div>
            )}

            {/* FORM */}
            <form className="register-form" onSubmit={handleSubmit}>
              <div className="register-form__grid">
                {fields.map(field => (
                  <div
                    key={field.name}
                    className={`form-group ${field.name === 'password' ? 'register-form__full' : ''}`}>
                    <label className="form-label">{field.label}</label>
                    <input
                      className="form-input"
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.name] || ''}
                      onChange={e => handleChange(field.name, e.target.value)}
                      required
                    />
                  </div>
                ))}
              </div>

              {/* Skills / Company Size */}
              {intent === 'student' ? (
                <div className="form-group">
                  <label className="form-label">Skills you're interested in</label>
                  <div className="register-skill-pills">
                    {['Frontend', 'Backend', 'Data Science', 'Design', 'Marketing', 'Finance', 'Product', 'DevOps'].map(skill => {
                      const active = (formData.skills || []).includes(skill);
                      return (
                        <button
                          type="button"
                          key={skill}
                          className={`register-skill-pill ${active ? 'register-skill-pill--active' : ''}`}
                          onClick={() => {
                            const current = formData.skills || [];
                            handleChange('skills', active
                              ? current.filter(s => s !== skill)
                              : [...current, skill]);
                          }}>
                          {skill}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="form-group">
                  <label className="form-label">Company Size</label>
                  <div className="register-skill-pills">
                    {['1–10', '11–50', '51–200', '200–500', '500+'].map(size => {
                      const active = formData.size === size;
                      return (
                        <button
                          type="button"
                          key={size}
                          className={`register-skill-pill ${active ? 'register-skill-pill--active' : ''}`}
                          onClick={() => handleChange('size', size)}>
                          {size} employees
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary btn-lg register-submit"
                disabled={loading}>
                {loading
                  ? '⏳ Creating account...'
                  : intent === 'student'
                    ? '🎓 Create Student Account'
                    : '🏢 Create Employer Account'}
              </button>

              <p className="login-form__terms">
                By signing up, you agree to our{' '}
                <a href="#" className="login-form__link">Terms</a> and{' '}
                <a href="#" className="login-form__link">Privacy Policy</a>.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
