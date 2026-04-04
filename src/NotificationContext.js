// NotificationContext.js
// Generates notifications from real application/message data
import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [studentNotifs, setStudentNotifs]   = useState([]);
  const [employerNotifs, setEmployerNotifs] = useState([]);

  const token  = localStorage.getItem('token');
  const role   = localStorage.getItem('role');

  // Build notifications from real backend data
  useEffect(() => {
    if (!token) return;

    if (role === 'student') {
      // Fetch applications to generate status notifications
      fetch('http://localhost:8080/api/applications/my', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(r => r.json())
        .then(apps => {
          if (!Array.isArray(apps)) return;
          const notifs = [];
          apps.forEach(a => {
            if (a.status === 'shortlisted') {
              notifs.push({
                id: `sn-short-${a.id}`, type: 'status', icon: '⭐',
                title: 'Shortlisted!',
                body: `You've been shortlisted for ${a.internshipRole}`,
                time: a.appliedDate, read: false,
                link: '/student/applications',
              });
            }
            if (a.status === 'interview') {
              notifs.push({
                id: `sn-int-${a.id}`, type: 'status', icon: '🎙️',
                title: 'Interview Scheduled',
                body: `Interview scheduled for ${a.internshipRole}`,
                time: a.appliedDate, read: false,
                link: '/student/applications',
              });
            }
            if (a.status === 'hired') {
              notifs.push({
                id: `sn-hire-${a.id}`, type: 'status', icon: '✅',
                title: 'Offer Received!',
                body: `You got an offer for ${a.internshipRole}! Congratulations!`,
                time: a.appliedDate, read: false,
                link: '/student/applications',
              });
            }
          });
          setStudentNotifs(notifs);
        })
        .catch(() => {});
    }

    if (role === 'employer') {
      // Fetch applicants to generate new applicant notifications
      fetch('http://localhost:8080/api/applications/employer', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(r => r.json())
        .then(apps => {
          if (!Array.isArray(apps)) return;
          const notifs = apps.slice(0, 10).map(a => ({
            id: `en-app-${a.id}`, type: 'applicant', icon: '📥',
            title: 'New Applicant',
            body: `Someone applied for ${a.internshipRole}`,
            time: a.appliedDate, read: false,
            link: '/employer/applicants',
          }));
          setEmployerNotifs(notifs);
        })
        .catch(() => {});
    }
  }, [token, role]);

  const markReadStudent  = (id) => setStudentNotifs(n => n.map(x => x.id === id ? { ...x, read: true } : x));
  const markReadEmployer = (id) => setEmployerNotifs(n => n.map(x => x.id === id ? { ...x, read: true } : x));
  const markAllReadStudent  = () => setStudentNotifs(n => n.map(x => ({ ...x, read: true })));
  const markAllReadEmployer = () => setEmployerNotifs(n => n.map(x => ({ ...x, read: true })));

  return (
    <NotificationContext.Provider value={{
      studentNotifs,
      employerNotifs,
      markReadStudent,
      markReadEmployer,
      markAllReadStudent,
      markAllReadEmployer,
      studentUnread:  studentNotifs.filter(n => !n.read).length,
      employerUnread: employerNotifs.filter(n => !n.read).length,
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationContext);
