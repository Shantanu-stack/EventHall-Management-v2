import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Calendar from './components/Calendar'
import EventForm from './components/EventForm'
import EventDetail from './components/EventDetail'

export default function App() {
  const [showForm, setShowForm] = useState(false)
  const [editEvent, setEditEvent] = useState(null)
  const [viewEvent, setViewEvent] = useState(null)
  const [defaultDate, setDefaultDate] = useState('')
  const [refresh, setRefresh] = useState(0)

  const handleSelectDate = ({ year, month, day }) => {
    const date = `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`
    setDefaultDate(date)
    setEditEvent(null)
    setViewEvent(null)
    setShowForm(true)
  }

  const handleEdit = (event) => {
    setViewEvent(null)
    setEditEvent(event)
    setDefaultDate('')
    setShowForm(true)
  }

  const handleSaved = () => {
    setShowForm(false)
    setEditEvent(null)
    setDefaultDate('')
    setRefresh(r => r + 1)
  }

  const handleNewEvent = () => {
    setEditEvent(null)
    setDefaultDate('')
    setViewEvent(null)
    setShowForm(true)
  }

  return (
    <div style={{ minHeight:'100vh', background:'var(--surface)' }}>
      <Toaster position="top-right" toastOptions={{
        style: { background:'#1e0a35', color:'#f0e6ff', border:'1px solid rgba(201,168,76,0.3)' }
      }} />

      {/* Top Bar */}
      <header style={{
        background:'rgba(26,10,46,0.95)',
        borderBottom:'1px solid rgba(201,168,76,0.15)',
        padding:'14px 28px',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        backdropFilter:'blur(10px)', position:'sticky', top:0, zIndex:10
      }}>
        <div>
          <h1 style={{ fontSize:22, background:'linear-gradient(135deg,#C9A84C,#e8c97a)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
            ✨ EventHall
          </h1>
          <p style={{ fontSize:11, color:'#a090b8', marginTop:2 }}>India's Premier Event Manager</p>
        </div>
        <button
          onClick={handleNewEvent}
          style={{
            background:'linear-gradient(135deg,#C9A84C,#e8c97a)',
            border:'none', color:'#1a0a2e', borderRadius:10,
            padding:'10px 20px', fontWeight:700, fontSize:14,
            cursor:'pointer'
          }}>
          + New Event
        </button>
      </header>

      {/* Main */}
      <main style={{ padding:'24px 28px', display:'flex', gap:24 }}>
        <Calendar
          key={refresh}
          onSelectDate={handleSelectDate}
          onSelectEvent={(ev) => { setViewEvent(ev); setShowForm(false) }}
        />
      </main>

      {/* Modals */}
      {showForm && (
        <EventForm
          event={editEvent}
          defaultDate={defaultDate}
          onClose={() => { setShowForm(false); setEditEvent(null) }}
          onSaved={handleSaved}
        />
      )}

      {viewEvent && !showForm && (
        <EventDetail
          event={viewEvent}
          onClose={() => setViewEvent(null)}
          onEdit={handleEdit}
          onDeleted={() => { setViewEvent(null); setRefresh(r => r+1) }}
        />
      )}
    </div>
  )
}