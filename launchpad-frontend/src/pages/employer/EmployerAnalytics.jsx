// pages/employer/EmployerAnalytics.jsx
import React, { useState, useEffect } from 'react';
import './EmployerAnalytics.css';

function BarChart({ data, valueKey, labelKey, color = 'lavender' }) {
  const peak = Math.max(...data.map(d => d[valueKey]), 1);
  return (
    <div className="ana-chart__bars">
      {data.map((d, i) => (
        <div key={i} className="ana-chart__bar-group">
          <div className="ana-chart__bar-track">
            <div className={`ana-chart__bar ana-chart__bar--${color}`}
              style={{ height: `${(d[valueKey] / peak) * 100}%`, animationDelay: `${i * 60}ms` }} />
          </div>
          <span className="ana-chart__bar-val">{d[valueKey]}</span>
          <span className="ana-chart__bar-label">{d[labelKey]}</span>
        </div>
      ))}
    </div>
  );
}

function HBarChart({ data, valueKey, labelKey, color = 'cyan' }) {
  const peak = Math.max(...data.map(d => d[valueKey]), 1);
  return (
    <div className="ana-hbar__list">
      {data.map((d, i) => (
        <div key={i} className="ana-hbar__row">
          <span className="ana-hbar__label">{d[labelKey]}</span>
          <div className="ana-hbar__track">
            <div className={`ana-hbar__fill ana-hbar__fill--${color}`}
              style={{ width: `${(d[valueKey] / peak) * 100}%`, animationDelay: `${i * 80}ms` }} />
          </div>
          <span className="ana-hbar__val">{d[valueKey]}</span>
        </div>
      ))}
    </div>
  );
}

function FunnelChart({ stages }) {
  const max = stages[0]?.count || 1;
  return (
    <div className="ana-funnel">
      {stages.map((s, i) => (
        <div key={s.label} className="ana-funnel__stage" style={{ animationDelay: `${i * 100}ms` }}>
          <div className="ana-funnel__bar-wrap" style={{ width: `${100 - i * 14}%` }}>
            <div className={`ana-funnel__bar ana-funnel__bar--${s.color}`} />
          </div>
          <div className="ana-funnel__info">
            <span className="ana-funnel__label">{s.label}</span>
            <span className="ana-funnel__count">{s.count}</span>
            <span className="ana-funnel__pct">{max > 0 ? Math.round((s.count / max) * 100) : 0}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function EmployerAnalytics() {
  const [internships, setInternships] = useState([]);
  const [applicants, setApplicants]   = useState([]);
  const [trainings, setTrainings]     = useState([]);
  const [loading, setLoading]         = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:8080/api/internships/employer/my',  { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
      fetch('http://localhost:8080/api/applications/employer',    { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
      fetch('http://localhost:8080/api/trainings/employer/my',    { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
    ]).then(([ints, apps, trns]) => {
      setInternships(Array.isArray(ints) ? ints : []);
      setApplicants(Array.isArray(apps)  ? apps : []);
      setTrainings(Array.isArray(trns)   ? trns : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // Build analytics from real data
  const totalApplicants = applicants.length;
  const totalViews      = internships.reduce((s, i) => s + (i.views || 0), 0);
  const totalHired      = applicants.filter(a => a.status === 'hired').length;
  const convRate        = totalApplicants > 0 ? ((totalHired / totalApplicants) * 100).toFixed(1) : '0.0';

  const STAT_CARDS = [
    { icon: '👁️', label: 'Total Listing Views',  value: totalViews,        color: 'lavender' },
    { icon: '📥', label: 'Total Applicants',     value: totalApplicants,   color: 'mint'     },
    { icon: '✅', label: 'Total Hired',           value: totalHired,        color: 'cyan'     },
    { icon: '📊', label: 'Conversion Rate',       value: `${convRate}%`,   color: 'amber'    },
  ];

  // Applicants per role chart
  const applicantsPerRole = internships.map(i => ({
    role:  i.role?.split(' ').slice(0, 2).join(' ') || 'Unknown',
    count: applicants.filter(a => a.internshipId === i.id).length,
  })).filter(x => x.count > 0);

  // Pipeline funnel
  const funnelStages = [
    { label: 'Applied',     color: 'lavender', count: applicants.length },
    { label: 'Shortlisted', color: 'amber',    count: applicants.filter(a => a.status === 'shortlisted' || a.status === 'interview' || a.status === 'hired').length },
    { label: 'Interview',   color: 'cyan',     count: applicants.filter(a => a.status === 'interview' || a.status === 'hired').length },
    { label: 'Hired',       color: 'mint',     count: applicants.filter(a => a.status === 'hired').length },
  ];

  // Training stats
  const totalEnrolled = trainings.reduce((s, t) => s + (t.enrolled || 0), 0);
  const totalRevenue  = trainings.reduce((s, t) => s + (t.revenue || 0), 0);

  return (
    <div className="emp-ana page-enter">
      <div className="emp-ana__header">
        <div>
          <div className="section-label">Employer</div>
          <h1 className="emp-ana__title">Analytics</h1>
          <p className="emp-ana__sub">Real-time performance data across your listings and trainings.</p>
        </div>
        <div className="emp-ana__date-badge">📅 Live Data</div>
      </div>

      {loading ? (
        <div className="ilist__empty"><span className="ilist__empty-icon">⏳</span><h3>Loading analytics...</h3></div>
      ) : (
        <>
          {/* KPI CARDS */}
          <div className="emp-ana__kpis">
            {STAT_CARDS.map(s => (
              <div key={s.label} className={`emp-ana__kpi emp-ana__kpi--${s.color}`}>
                <span className="emp-ana__kpi-icon">{s.icon}</span>
                <span className="emp-ana__kpi-value">{s.value}</span>
                <span className="emp-ana__kpi-label">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="emp-ana__grid">
            {/* APPLICANTS PER ROLE */}
            <div className="emp-ana__card emp-ana__card--wide">
              <div className="emp-ana__card-header">
                <h3 className="emp-ana__card-title">Applicants per Role</h3>
                <span className="emp-ana__card-sub">Total applications by internship</span>
              </div>
              {applicantsPerRole.length > 0 ? (
                <div className="ana-chart__wrap">
                  <BarChart data={applicantsPerRole} valueKey="count" labelKey="role" color="lavender" />
                </div>
              ) : (
                <p style={{ color:'var(--text-muted)', textAlign:'center', padding:'var(--space-xl)' }}>
                  No applicants yet. Post internships and wait for applications.
                </p>
              )}
            </div>

            {/* HIRING FUNNEL */}
            <div className="emp-ana__card">
              <div className="emp-ana__card-header">
                <h3 className="emp-ana__card-title">Hiring Funnel</h3>
                <span className="emp-ana__card-sub">All roles combined</span>
              </div>
              <FunnelChart stages={funnelStages} />
            </div>

            {/* TRAINING STATS */}
            <div className="emp-ana__card">
              <div className="emp-ana__card-header">
                <h3 className="emp-ana__card-title">Training Performance</h3>
                <span className="emp-ana__card-sub">Enrollments and revenue</span>
              </div>
              {trainings.length > 0 ? (
                <div style={{ display:'flex', flexDirection:'column', gap:'var(--space-lg)' }}>
                  <div style={{ display:'flex', gap:'var(--space-xl)', justifyContent:'space-around' }}>
                    {[
                      { label:'Courses',  value: trainings.length,              color:'lavender' },
                      { label:'Enrolled', value: totalEnrolled,                 color:'mint'     },
                      { label:'Revenue',  value: `₹${(totalRevenue/1000).toFixed(0)}K`, color:'amber' },
                    ].map(s => (
                      <div key={s.label} style={{ textAlign:'center' }}>
                        <div style={{ fontFamily:'var(--font-display)', fontSize:'1.8rem', fontWeight:800, color:`var(--${s.color})` }}>{s.value}</div>
                        <div style={{ fontSize:'0.75rem', color:'var(--text-muted)' }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <HBarChart
                    data={trainings.map(t => ({ name: t.title?.slice(0,20) || 'Training', count: t.enrolled || 0 }))}
                    valueKey="count" labelKey="name" color="mint" />
                </div>
              ) : (
                <p style={{ color:'var(--text-muted)', textAlign:'center', padding:'var(--space-xl)' }}>
                  No trainings posted yet.
                </p>
              )}
            </div>

            {/* LISTING PERFORMANCE TABLE */}
            <div className="emp-ana__card emp-ana__card--full">
              <div className="emp-ana__card-header">
                <h3 className="emp-ana__card-title">Listing Performance</h3>
              </div>
              {internships.length === 0 ? (
                <p style={{ color:'var(--text-muted)', textAlign:'center', padding:'var(--space-xl)' }}>No internships posted yet.</p>
              ) : (
                <div className="emp-ana__table-wrap">
                  <table className="emp-ana__table">
                    <thead>
                      <tr>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Views</th>
                        <th>Applied</th>
                        <th>Shortlisted</th>
                        <th>Hired</th>
                        <th>Conv. Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {internships.map(i => {
                        const apps  = applicants.filter(a => a.internshipId === i.id);
                        const hired = apps.filter(a => a.status === 'hired').length;
                        const conv  = apps.length > 0 ? ((hired / apps.length) * 100).toFixed(1) : '0.0';
                        return (
                          <tr key={i.id}>
                            <td className="emp-ana__table-role">{i.role}</td>
                            <td>
                              <span className={`emp-ana__table-status emp-ana__table-status--${i.status === 'active' ? 'mint' : i.status === 'paused' ? 'amber' : 'peach'}`}>
                                {i.status}
                              </span>
                            </td>
                            <td>{i.views || 0}</td>
                            <td><strong>{apps.length}</strong></td>
                            <td>{apps.filter(a => ['shortlisted','interview','hired'].includes(a.status)).length}</td>
                            <td>{hired}</td>
                            <td><span className={`emp-ana__conv ${parseFloat(conv) > 3 ? 'emp-ana__conv--good' : ''}`}>{conv}%</span></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
