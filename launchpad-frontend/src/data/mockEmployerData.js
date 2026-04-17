// mockEmployerData.js — shared mock data for employer dashboard
export const EMPLOYER = {
  id: 'e1',
  name: 'Novarix Labs',
  logo: 'NL',
  logoColor: '#C4B5FD',
  industry: 'SaaS / FinTech',
  size: '51–200 employees',
  location: 'Bangalore, India',
  website: 'https://novarixlabs.io',
  about: 'Novarix Labs builds developer-first financial infrastructure. We help fintechs scale payments, lending, and compliance with a single API.',
  email: 'hr@novarixlabs.io',
  phone: '+91 98765 43210',
  founded: '2019',
  tagline: 'Building the financial layer of the internet.',
};

export const POSTED_INTERNSHIPS = [
  {
    id: 'pi1', role: 'Frontend Developer Intern', category: 'Engineering',
    location: 'Bangalore', remote: true, stipend: 18000, duration: '3 Months',
    openings: 3, applicants: 42, shortlisted: 8, hired: 1,
    status: 'active', postedDate: '2025-03-01',
    tags: ['React', 'TypeScript', 'CSS'], tagColor: 'lavender',
    description: 'Work with our product team to build customer-facing dashboard features.',
    skills: ['React', 'TypeScript', 'CSS', 'Git'],
    perks: ['Certificate', 'Letter of Recommendation', 'Pre-Placement Offer'],
    views: 312, requirements: 'B.Tech/BE in CS or related. 2nd year and above.',
    responsibilities: 'Build UI components\nReview designs with the product team\nWrite unit tests',
  },
  {
    id: 'pi2', role: 'Data Analyst Intern', category: 'Data Science',
    location: 'Remote', remote: true, stipend: 15000, duration: '2 Months',
    openings: 2, applicants: 31, shortlisted: 5, hired: 0,
    status: 'active', postedDate: '2025-03-08',
    tags: ['Python', 'SQL', 'Tableau'], tagColor: 'mint',
    description: 'Analyze transaction data and build dashboards for internal stakeholders.',
    skills: ['Python', 'SQL', 'Pandas', 'Tableau'],
    perks: ['Certificate', 'Flexible Hours'],
    views: 198, requirements: 'Any degree. Strong analytical mindset.',
    responsibilities: 'Build Tableau dashboards\nWrite SQL queries\nPresent weekly insights',
  },
  {
    id: 'pi3', role: 'Backend Engineering Intern', category: 'Engineering',
    location: 'Bangalore', remote: false, stipend: 20000, duration: '6 Months',
    openings: 1, applicants: 18, shortlisted: 3, hired: 0,
    status: 'paused', postedDate: '2025-02-15',
    tags: ['Java', 'Spring Boot', 'MongoDB'], tagColor: 'cyan',
    description: 'Build and maintain microservices for our payment processing pipeline.',
    skills: ['Java', 'Spring Boot', 'MongoDB', 'Docker'],
    perks: ['Certificate', 'Pre-Placement Offer', 'Mentorship'],
    views: 143, requirements: 'B.Tech CS/IT. Knowledge of Java required.',
    responsibilities: 'Develop REST APIs\nWrite unit and integration tests\nParticipate in code reviews',
  },
  {
    id: 'pi4', role: 'UI/UX Design Intern', category: 'Design',
    location: 'Remote', remote: true, stipend: 12000, duration: '2 Months',
    openings: 2, applicants: 55, shortlisted: 10, hired: 2,
    status: 'closed', postedDate: '2025-01-10',
    tags: ['Figma', 'Prototyping', 'User Research'], tagColor: 'peach',
    description: 'Design new features and improve the UX of existing product flows.',
    skills: ['Figma', 'Adobe XD', 'Prototyping'],
    perks: ['Certificate', 'Letter of Recommendation'],
    views: 421, requirements: 'Design degree preferred. Strong portfolio.',
    responsibilities: 'Design wireframes and prototypes\nConduct user interviews\nPresent to stakeholders',
  },
];

export const APPLICANTS = [
  {
    id: 'a1', name: 'Ananya Krishnan', initials: 'AK', avatarColor: '#C4B5FD',
    college: 'IIT Bombay', degree: 'B.Tech CSE', year: '3rd Year', cgpa: '9.1',
    internshipId: 'pi1', internshipRole: 'Frontend Developer Intern',
    skills: ['React', 'TypeScript', 'CSS', 'Node.js'],
    appliedDate: '2025-03-03', status: 'interview',
    linkedin: '#', github: '#', resumeUrl: '#',
    note: 'Strong portfolio, has open-source contributions.',
  },
  {
    id: 'a2', name: 'Rohan Mehta', initials: 'RM', avatarColor: '#86EFAC',
    college: 'BITS Pilani', degree: 'B.E. CS', year: '4th Year', cgpa: '8.7',
    internshipId: 'pi1', internshipRole: 'Frontend Developer Intern',
    skills: ['React', 'JavaScript', 'GraphQL'],
    appliedDate: '2025-03-04', status: 'shortlisted',
    linkedin: '#', github: '#', resumeUrl: '#',
    note: '',
  },
  {
    id: 'a3', name: 'Karan Verma', initials: 'KV', avatarColor: '#A5B4FC',
    college: 'DTU Delhi', degree: 'B.Tech ECE', year: '4th Year', cgpa: '8.2',
    internshipId: 'pi1', internshipRole: 'Frontend Developer Intern',
    skills: ['React', 'CSS', 'Figma'],
    appliedDate: '2025-03-05', status: 'applied',
    linkedin: '#', github: '#', resumeUrl: '#',
    note: '',
  },
  {
    id: 'a4', name: 'Sneha Patel', initials: 'SP', avatarColor: '#FCD34D',
    college: 'IIM Kozhikode', degree: 'MBA', year: 'Graduate', cgpa: '7.8',
    internshipId: 'pi2', internshipRole: 'Data Analyst Intern',
    skills: ['Python', 'SQL', 'Tableau', 'Excel'],
    appliedDate: '2025-03-09', status: 'shortlisted',
    linkedin: '#', github: '#', resumeUrl: '#',
    note: 'Has previous analytics internship experience.',
  },
  {
    id: 'a5', name: 'Priya Sharma', initials: 'PS', avatarColor: '#FCA5A5',
    college: 'NID Ahmedabad', degree: 'B.Des', year: 'Graduate', cgpa: '8.4',
    internshipId: 'pi2', internshipRole: 'Data Analyst Intern',
    skills: ['Python', 'Pandas', 'Data Visualization'],
    appliedDate: '2025-03-10', status: 'applied',
    linkedin: '#', github: '#', resumeUrl: '#',
    note: '',
  },
  {
    id: 'a6', name: 'Arjun Nair', initials: 'AN', avatarColor: '#67E8F9',
    college: 'VIT Vellore', degree: 'B.Tech IT', year: '4th Year', cgpa: '8.9',
    internshipId: 'pi1', internshipRole: 'Frontend Developer Intern',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    appliedDate: '2025-03-06', status: 'hired',
    linkedin: '#', github: '#', resumeUrl: '#',
    note: 'Exceptional candidate — hired.',
  },
  {
    id: 'a7', name: 'Meera Iyer', initials: 'MI', avatarColor: '#6EE7B7',
    college: 'IIIT Hyderabad', degree: 'B.Tech CS', year: '3rd Year', cgpa: '9.3',
    internshipId: 'pi1', internshipRole: 'Frontend Developer Intern',
    skills: ['React', 'TypeScript', 'Testing', 'Storybook'],
    appliedDate: '2025-03-07', status: 'rejected',
    linkedin: '#', github: '#', resumeUrl: '#',
    note: 'Location mismatch.',
  },
];

export const POSTED_TRAININGS = [
  {
    id: 'pt1', title: 'Full Stack Web Development Bootcamp',
    category: 'Engineering', tagColor: 'lavender', price: 4999, enrolled: 234,
    duration: '8 Weeks', status: 'active',
    description: 'End-to-end web development from HTML to React and Node.js.',
    level: 'Beginner', chapters: 12, lessons: 64, rating: 4.8, reviews: 89,
    revenue: 1169766, postedDate: '2025-01-15',
  },
  {
    id: 'pt2', title: 'Data Science with Python — Zero to Hero',
    category: 'Data Science', tagColor: 'mint', price: 3999, enrolled: 178,
    duration: '6 Weeks', status: 'active',
    description: 'Master Python, Pandas, ML algorithms and data visualization.',
    level: 'Intermediate', chapters: 10, lessons: 52, rating: 4.6, reviews: 61,
    revenue: 711822, postedDate: '2025-02-01',
  },
  {
    id: 'pt3', title: 'UI/UX Design Fundamentals',
    category: 'Design', tagColor: 'peach', price: 2999, enrolled: 95,
    duration: '4 Weeks', status: 'paused',
    description: 'Learn Figma, user research, and design thinking from scratch.',
    level: 'Beginner', chapters: 8, lessons: 36, rating: 4.7, reviews: 34,
    revenue: 284905, postedDate: '2025-02-20',
  },
];

// ── ANALYTICS DATA ──
export const ANALYTICS = {
  applicantsPerRole: [
    { role: 'Frontend Dev', applied: 42, shortlisted: 8, interview: 3, hired: 1 },
    { role: 'Data Analyst', applied: 31, shortlisted: 5, interview: 2, hired: 0 },
    { role: 'Backend Eng',  applied: 18, shortlisted: 3, interview: 1, hired: 0 },
    { role: 'UI/UX Design', applied: 55, shortlisted: 10, interview: 4, hired: 2 },
  ],
  weeklyApplicants: [
    { week: 'Feb W1', count: 8 },
    { week: 'Feb W2', count: 14 },
    { week: 'Feb W3', count: 11 },
    { week: 'Feb W4', count: 19 },
    { week: 'Mar W1', count: 27 },
    { week: 'Mar W2', count: 34 },
    { week: 'Mar W3', count: 22 },
    { week: 'Mar W4', count: 11 },
  ],
  topSkills: [
    { skill: 'React', count: 38 },
    { skill: 'Python', count: 29 },
    { skill: 'SQL', count: 24 },
    { skill: 'TypeScript', count: 21 },
    { skill: 'Figma', count: 18 },
    { skill: 'Node.js', count: 15 },
    { skill: 'Java', count: 12 },
    { skill: 'AWS', count: 9 },
  ],
  collegeBreakdown: [
    { college: 'IIT / IIM', count: 22 },
    { college: 'BITS / NIT', count: 31 },
    { college: 'VIT / SRM', count: 28 },
    { college: 'State Engg', count: 45 },
    { college: 'Other', count: 20 },
  ],
  conversionRate: 2.1, // hired / applied %
  avgTimeToHire: 18,   // days
  totalViews: 1074,
  profileVisits: 342,
};

// ── MESSAGES / THREADS ──
export const MESSAGE_THREADS = [
  {
    id: 'mt1',
    applicantId: 'a1',
    applicantName: 'Ananya Krishnan',
    applicantInitials: 'AK',
    applicantColor: '#C4B5FD',
    internshipRole: 'Frontend Developer Intern',
    lastMessage: 'Thank you so much! I\'ll be there at 11 AM sharp.',
    lastTime: '2025-03-10T14:32:00',
    unread: 2,
    messages: [
      { id: 'm1', from: 'employer', text: 'Hi Ananya! We reviewed your application for the Frontend Developer role and would love to schedule an interview. Are you available this week?', time: '2025-03-08T10:00:00' },
      { id: 'm2', from: 'applicant', text: 'Hello! Yes, absolutely. I\'m available Tuesday and Thursday afternoon. What time works for you?', time: '2025-03-08T10:45:00' },
      { id: 'm3', from: 'employer', text: 'Great! Let\'s do Thursday March 13th at 11 AM IST. We\'ll send a Google Meet link shortly. Please be prepared to discuss your React projects.', time: '2025-03-09T09:15:00' },
      { id: 'm4', from: 'applicant', text: 'Thank you so much! I\'ll be there at 11 AM sharp.', time: '2025-03-10T14:32:00' },
    ],
  },
  {
    id: 'mt2',
    applicantId: 'a2',
    applicantName: 'Rohan Mehta',
    applicantInitials: 'RM',
    applicantColor: '#86EFAC',
    internshipRole: 'Frontend Developer Intern',
    lastMessage: 'Could you share more details about the tech stack used?',
    lastTime: '2025-03-09T16:10:00',
    unread: 1,
    messages: [
      { id: 'm5', from: 'employer', text: 'Hi Rohan, we\'ve shortlisted you for the Frontend Developer Intern position. Congratulations! We\'d like to move forward with a technical assessment.', time: '2025-03-09T11:00:00' },
      { id: 'm6', from: 'applicant', text: 'That\'s great news! Could you share more details about the tech stack used?', time: '2025-03-09T16:10:00' },
    ],
  },
  {
    id: 'mt3',
    applicantId: 'a4',
    applicantName: 'Sneha Patel',
    applicantInitials: 'SP',
    applicantColor: '#FCD34D',
    internshipRole: 'Data Analyst Intern',
    lastMessage: 'Looking forward to the opportunity. Please find my updated resume attached.',
    lastTime: '2025-03-07T09:00:00',
    unread: 0,
    messages: [
      { id: 'm7', from: 'employer', text: 'Hi Sneha! Your profile for the Data Analyst Intern role caught our attention. We noticed you have prior analytics experience — could you share more about that?', time: '2025-03-06T10:00:00' },
      { id: 'm8', from: 'applicant', text: 'Hi! Yes, I interned at a D2C brand where I built Tableau dashboards tracking 50k+ users. I can share the details in an interview.', time: '2025-03-06T12:30:00' },
      { id: 'm9', from: 'employer', text: 'Sounds impressive! Please submit a brief case study as part of your application. It should take about 2 hours.', time: '2025-03-06T14:00:00' },
      { id: 'm10', from: 'applicant', text: 'Looking forward to the opportunity. Please find my updated resume attached.', time: '2025-03-07T09:00:00' },
    ],
  },
];

// ── STUDENT NOTIFICATIONS ──
export const STUDENT_NOTIFICATIONS = [
  { id: 'sn1', type: 'status', icon: '🎙️', title: 'Interview Scheduled', body: 'Novarix Labs moved your application to Interview stage.', time: '2025-03-09T09:15:00', read: false, link: '/student/applications' },
  { id: 'sn2', type: 'match',  icon: '⭐', title: 'New Match Found',     body: '3 new internships match your skills in React & TypeScript.', time: '2025-03-08T08:00:00', read: false, link: '/student/browse' },
  { id: 'sn3', type: 'message', icon: '💬', title: 'New Message',        body: 'Novarix Labs sent you a message about your application.', time: '2025-03-08T10:45:00', read: false, link: '/student/messages' },
  { id: 'sn4', type: 'deadline', icon: '⏰', title: 'Deadline Tomorrow', body: 'Lumen Studio internship closes tomorrow. Apply now!', time: '2025-03-07T18:00:00', read: true,  link: '/student/browse' },
  { id: 'sn5', type: 'training', icon: '🎓', title: 'Course Milestone',  body: 'You\'ve completed 50% of Full Stack Web Development Bootcamp!', time: '2025-03-06T12:00:00', read: true, link: '/student/trainings' },
];

// ── EMPLOYER NOTIFICATIONS ──
export const EMPLOYER_NOTIFICATIONS = [
  { id: 'en1', type: 'applicant', icon: '📥', title: 'New Applicant',      body: 'Meera Iyer applied for Frontend Developer Intern.', time: '2025-03-10T11:20:00', read: false, link: '/employer/applicants' },
  { id: 'en2', type: 'applicant', icon: '📥', title: '5 New Applicants',   body: '5 students applied to Data Analyst Intern today.', time: '2025-03-10T09:00:00', read: false, link: '/employer/applicants' },
  { id: 'en3', type: 'message',   icon: '💬', title: 'New Message',        body: 'Ananya Krishnan replied to your interview invite.', time: '2025-03-10T14:32:00', read: false, link: '/employer/messages' },
  { id: 'en4', type: 'training',  icon: '🎓', title: 'New Enrollment',     body: '12 students enrolled in Full Stack Web Dev Bootcamp this week.', time: '2025-03-09T16:00:00', read: true, link: '/employer/trainings' },
  { id: 'en5', type: 'listing',   icon: '📋', title: 'Listing Expiring',   body: 'Backend Engineering Intern listing expires in 3 days.', time: '2025-03-08T08:00:00', read: true, link: '/employer/internships' },
];
