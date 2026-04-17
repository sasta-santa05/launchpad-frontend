// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './globals.css';
import './public.css';
import './student.css';

import { ThemeProvider }        from './ThemeContext';
import { NotificationProvider } from './NotificationContext';
import { MessagingProvider }    from './MessagingContext';
import ThemeToggle from './components/ThemeToggle';

// Public
import Navbar            from './components/Navbar';
import Home              from './pages/Home';
import InternshipList    from './pages/InternshipList';
import InternshipDetails from './pages/InternshipDetails';
import TrainingList      from './pages/TrainingList';
import Login             from './pages/Login';
import Register          from './pages/Register';
import Employers         from './pages/Employers';
import SuccessStories    from './pages/SuccessStories';
import NotFound          from './pages/NotFound';

// Student
import StudentNavbar     from './components/StudentNavbar';
import StudentHome       from './pages/student/StudentHome';
import BrowseInternships from './pages/student/BrowseInternships';
import MyApplications    from './pages/student/MyApplications';
import MyTrainings       from './pages/student/MyTrainings';
import StudentProfile    from './pages/student/StudentProfile';
import StudentMessages   from './pages/student/StudentMessages';

// Employer
import EmployerNavbar    from './components/EmployerNavbar';
import CompanyDashboard  from './pages/employer/CompanyDashboard';
import PostInternship    from './pages/employer/PostInternship';
import ManageInternships from './pages/employer/ManageInternships';
import ViewApplicants    from './pages/employer/ViewApplicants';
import ManageTrainings   from './pages/employer/ManageTrainings';
import PostTraining      from './pages/employer/PostTraining';
import CompanyProfile    from './pages/employer/CompanyProfile';
import EmployerAnalytics from './pages/employer/EmployerAnalytics';
import EmployerMessages  from './pages/employer/EmployerMessages';

export default function App() {
  const [user, setUser] = useState(null);

  // Restore session from localStorage on page refresh
  useEffect(() => {
    const token  = localStorage.getItem('token');
    const role   = localStorage.getItem('role');
    const name   = localStorage.getItem('name');
    const userId = localStorage.getItem('userId');
    if (token && role && name) {
      setUser({ role, name, userId });
    }
  }, []);

  const handleLogin = (role) => {
    const name   = localStorage.getItem('name')   || (role === 'employer' ? 'Company' : 'Student');
    const userId = localStorage.getItem('userId') || '';
    setUser({ role, name, userId });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    localStorage.removeItem('userId');
    setUser(null);
  };

  // ── LAYOUTS ──
  const PublicLayout = () => {
    if (user?.role === 'student')  return <Navigate to="/student"  replace />;
    if (user?.role === 'employer') return <Navigate to="/employer" replace />;
    return (
      <>
        <Navbar />
        <main style={{ paddingTop: 'var(--nav-height)' }}>
          <Outlet />
        </main>
      </>
    );
  };

  const StudentLayout = () => {
    if (!user || user.role !== 'student') return <Navigate to="/login" replace />;
    return (
      <div className="student-dashboard">
        <StudentNavbar user={user} logout={handleLogout} />
        <main className="dashboard-content" style={{ paddingTop: 'var(--nav-height)' }}>
          <Outlet context={{ user }} />
        </main>
      </div>
    );
  };

  const EmployerLayout = () => {
    if (!user || user.role !== 'employer') return <Navigate to="/login" replace />;
    return (
      <div className="employer-dashboard">
        <EmployerNavbar
          user={user}
          logout={handleLogout}
          employer={{
            name:      user.name,
            logo:      user.name?.slice(0, 2).toUpperCase() || 'CO',
            logoColor: '#C4B5FD',
          }}
        />
        <main className="dashboard-content" style={{ paddingTop: 'var(--nav-height)' }}>
          <Outlet context={{ user }} />
        </main>
      </div>
    );
  };

  return (
    <ThemeProvider>
      <NotificationProvider>
        <MessagingProvider>
          <Router>
            <Routes>
              {/* PUBLIC */}
              <Route element={<PublicLayout />}>
                <Route path="/"                element={<Home />} />
                <Route path="/internships"     element={<InternshipList />} />
                <Route path="/internships/:id" element={<InternshipDetails backPath="/internships" />} />
                <Route path="/trainings"       element={<TrainingList />} />
                <Route path="/employers"       element={<Employers />} />
                <Route path="/success-stories" element={<SuccessStories />} />
                <Route path="/login"           element={<Login    onLogin={handleLogin}    />} />
                <Route path="/register"        element={<Register onRegister={handleLogin} />} />
              </Route>

              {/* STUDENT */}
              <Route path="/student" element={<StudentLayout />}>
                <Route index               element={<StudentHome user={user} />} />
                <Route path="browse"       element={<BrowseInternships />} />
                <Route path="browse/:id"   element={<InternshipDetails backPath="/student/browse" />} />
                <Route path="applications" element={<MyApplications />} />
                <Route path="trainings"    element={<MyTrainings />} />
                <Route path="profile"      element={<StudentProfile />} />
                <Route path="messages"     element={<StudentMessages />} />
              </Route>

              {/* EMPLOYER */}
              <Route path="/employer" element={<EmployerLayout />}>
                <Route index                  element={<CompanyDashboard />} />
                <Route path="internships"     element={<ManageInternships />} />
                <Route path="post-internship" element={<PostInternship />} />
                <Route path="applicants"      element={<ViewApplicants />} />
                <Route path="trainings"       element={<ManageTrainings />} />
                <Route path="post-training"   element={<PostTraining />} />
                <Route path="analytics"       element={<EmployerAnalytics />} />
                <Route path="messages"        element={<EmployerMessages />} />
                <Route path="profile"         element={<CompanyProfile />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ThemeToggle />
          </Router>
        </MessagingProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}
