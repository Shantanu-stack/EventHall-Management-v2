import axios from 'axios'

const api = axios.create({
 baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' }
})

export const getEventsByMonth = (year, month) =>
  api.get(`/events/month?year=${year}&month=${month}`)

export const getAllEvents = () => api.get('/events')

export const getEvent = (id) => api.get(`/events/${id}`)

export const createEvent = (data) => api.post('/events', data)

export const updateEvent = (id, data) => api.put(`/events/${id}`, data)

export const deleteEvent = (id) => api.delete(`/events/${id}`)