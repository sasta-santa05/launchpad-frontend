// pages/student/StudentMessages.jsx
import React, { useState, useRef, useEffect } from 'react';
import '../employer/Messages.css';

function timeLabel(iso) {
  return new Date(iso).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}
function dateLabel(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

export default function StudentMessages() {
  const [threads, setThreads]   = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [input, setInput]       = useState('');
  const [search, setSearch]     = useState('');
  const [loading, setLoading]   = useState(true);
  const [sending, setSending]   = useState(false);
  const bottomRef = useRef(null);

  const token     = localStorage.getItem('token');
  const studentId = localStorage.getItem('userId');

  useEffect(() => {
    fetch('http://localhost:8080/api/messages/student/threads', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        const list = Array.isArray(data) ? data : [];
        setThreads(list);
        if (list.length > 0) setActiveId(list[0].id);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeId, threads]);

  useEffect(() => {
    if (!activeId) return;
    fetch(`http://localhost:8080/api/messages/${activeId}/read`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      setThreads(ts => ts.map(t => t.id === activeId ? { ...t, unread: 0 } : t));
    });
  }, [activeId]);

  const activeThread = threads.find(t => t.id === activeId);

  const filtered = threads.filter(t =>
    (t.internshipRole || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleSend = async () => {
    if (!input.trim() || !activeThread) return;
    setSending(true);
    try {
      const res = await fetch('http://localhost:8080/api/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          employerId:     activeThread.employerId,
          studentId:      activeThread.studentId,
          text:           input.trim(),
          from:           'applicant',
          internshipId:   activeThread.internshipId,
          internshipRole: activeThread.internshipRole,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setThreads(ts => ts.map(t => t.id === data.id ? data : t));
        setInput('');
      }
    } catch { /* silent */ }
    finally { setSending(false); }
  };

  return (
    <div className="msg-page page-enter">
      <div className="msg-page__header">
        <div className="section-label">Student</div>
        <h1 className="msg-page__title">Messages</h1>
      </div>

      <div className="msg-layout">
        <aside className="msg-sidebar">
          <div className="msg-sidebar__search-wrap">
            <span className="msg-sidebar__search-icon">🔍</span>
            <input className="msg-sidebar__search" placeholder="Search conversations..."
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="msg-sidebar__list">
            {loading && <div className="msg-sidebar__empty">Loading...</div>}
            {!loading && filtered.length === 0 && (
              <div className="msg-sidebar__empty">No messages yet. Apply to internships to start conversations.</div>
            )}
            {filtered.map(t => (
              <div key={t.id}
                className={`msg-thread ${activeId === t.id ? 'msg-thread--active' : ''}`}
                onClick={() => setActiveId(t.id)}>
                <div className="msg-thread__avatar" style={{ '--av': '#C4B5FD' }}>
                  {t.employerId?.slice(-2).toUpperCase() || 'EM'}
                </div>
                <div className="msg-thread__info">
                  <div className="msg-thread__top">
                    <span className="msg-thread__name">Employer #{t.employerId?.slice(-4)}</span>
                    <span className="msg-thread__time">{t.lastTime ? dateLabel(t.lastTime) : ''}</span>
                  </div>
                  <span className="msg-thread__role">{t.internshipRole}</span>
                  <span className="msg-thread__preview">{t.lastMessage}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {activeThread ? (
          <div className="msg-chat">
            <div className="msg-chat__header">
              <div className="msg-chat__header-avatar" style={{ '--av': '#C4B5FD' }}>
                {activeThread.employerId?.slice(-2).toUpperCase() || 'EM'}
              </div>
              <div className="msg-chat__header-info">
                <p className="msg-chat__header-name">Employer #{activeThread.employerId?.slice(-4)}</p>
                <p className="msg-chat__header-role">{activeThread.internshipRole}</p>
              </div>
            </div>

            <div className="msg-chat__body">
              {(activeThread.messages || []).map(m => {
                const isStudent = m.from === 'applicant';
                return (
                  <div key={m.id} className={`msg-bubble-wrap ${isStudent ? 'msg-bubble-wrap--right' : ''}`}>
                    {!isStudent && (
                      <div className="msg-bubble__avatar" style={{ '--av': '#C4B5FD' }}>
                        {activeThread.employerId?.slice(-2).toUpperCase() || 'EM'}
                      </div>
                    )}
                    <div className={`msg-bubble ${isStudent ? 'msg-bubble--employer' : 'msg-bubble--applicant'}`}>
                      <p>{m.text}</p>
                      <span className="msg-bubble__time">{m.time ? timeLabel(m.time) : ''}</span>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            <div className="msg-chat__footer">
              <input className="msg-chat__input" placeholder="Type a message..."
                value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}} />
              <button className={`msg-chat__send ${input.trim() ? 'msg-chat__send--active' : ''}`}
                onClick={handleSend} disabled={!input.trim() || sending}>
                {sending ? '⏳' : '➤'}
              </button>
            </div>
          </div>
        ) : (
          <div className="msg-chat msg-chat--empty">
            <span>💬</span>
            <p>{loading ? 'Loading messages...' : 'No messages yet.'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
