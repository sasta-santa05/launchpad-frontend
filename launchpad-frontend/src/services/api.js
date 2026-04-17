// src/services/api.js
// All API calls go through here
// In development: uses http://localhost:8080/api
// In production:  uses REACT_APP_API_URL from .env.production

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  ...(localStorage.getItem('token') && {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  }),
});

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data;
};

export const api = {
  get:    (url)        => fetch(`${BASE_URL}${url}`,    { headers: getHeaders() }).then(handleResponse),
  post:   (url, body)  => fetch(`${BASE_URL}${url}`,    { method: 'POST',   headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse),
  put:    (url, body)  => fetch(`${BASE_URL}${url}`,    { method: 'PUT',    headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse),
  patch:  (url, body)  => fetch(`${BASE_URL}${url}`,    { method: 'PATCH',  headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse),
  delete: (url)        => fetch(`${BASE_URL}${url}`,    { method: 'DELETE', headers: getHeaders() }).then(handleResponse),
};

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login:    (data) => api.post('/auth/login',    data),
};

export const internshipAPI = {
  getAll:       ()           => api.get('/internships'),
  getById:      (id)         => api.get(`/internships/${id}`),
  getMy:        ()           => api.get('/internships/employer/my'),
  create:       (data)       => api.post('/internships', data),
  update:       (id, data)   => api.put(`/internships/${id}`, data),
  updateStatus: (id, status) => api.patch(`/internships/${id}/status`, { status }),
  delete:       (id)         => api.delete(`/internships/${id}`),
};

export const applicationAPI = {
  apply:            (internshipId) => api.post('/applications', { internshipId }),
  getMy:            ()             => api.get('/applications/my'),
  getForEmployer:   ()             => api.get('/applications/employer'),
  getForInternship: (id)           => api.get(`/applications/internship/${id}`),
  updateStatus:     (id, status)   => api.patch(`/applications/${id}/status`, { status }),
  withdraw:         (id)           => api.delete(`/applications/${id}`),
};

export const studentAPI = {
  getProfile:    ()     => api.get('/students/profile'),
  updateProfile: (data) => api.put('/students/profile', data),
};

export const employerAPI = {
  getProfile:    ()     => api.get('/employers/profile'),
  updateProfile: (data) => api.put('/employers/profile', data),
};

export const trainingAPI = {
  getAll:       ()           => api.get('/trainings'),
  getById:      (id)         => api.get(`/trainings/${id}`),
  getMy:        ()           => api.get('/trainings/employer/my'),
  create:       (data)       => api.post('/trainings', data),
  update:       (id, data)   => api.put(`/trainings/${id}`, data),
  enroll:       (id)         => api.post(`/trainings/${id}/enroll`),
  updateStatus: (id, status) => api.patch(`/trainings/${id}/status`, { status }),
  delete:       (id)         => api.delete(`/trainings/${id}`),
};

export const messageAPI = {
  getEmployerThreads: ()     => api.get('/messages/employer/threads'),
  getStudentThreads:  ()     => api.get('/messages/student/threads'),
  send:               (data) => api.post('/messages/send', data),
  markRead:           (id)   => api.patch(`/messages/${id}/read`),
};
