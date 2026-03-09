import { useState, useEffect } from 'react'
import { createEvent, updateEvent } from '../api/events'
import toast from 'react-hot-toast'

const EVENT_TYPES = ['WEDDING','RECEPTION','SANGEET','BIRTHDAY','CORPORATE','ENGAGEMENT','ANNIVERSARY','OTHER']

const EMPTY = {
  title:'', eventType:'WEDDING', eventDate:'', startTime:'', endTime:'',
  venueName:'', venueAddress:'',
  clientName:'', clientPhone:'', clientEmail:'',
  organizerName:'', organizerPhone:'', organizerEmail:'', organizerCompany:'',
  catererName:'', catererPhone:'', catererEmail:'', catererCompany:'', menuDescription:'',
  decoratorName:'', decoratorPhone:'', decoratorEmail:'', decoratorCompany:'', decorationTheme:'',
  guestCount:'', totalAmount:'', notes:'', status:'CONFIRMED'
}

export default function EventForm({ event, defaultDate, onClose, onSaved }) {
  const [form, setForm] = useState({ ...EMPTY })
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState('basic')

  useEffect(() => {
    if (event) {
      setForm({ ...EMPTY, ...event })
    } else {
      setForm({ ...EMPTY, eventDate: defaultDate || '' })
    }
  }, [])

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async () => {
    if (!form.title) return toast.error('Title is required')
    if (!form.eventDate) return toast.error('Date is required')
    setLoading(true)
    try {
      if (event && event.id) await updateEvent(event.id, form)
      else await createEvent(form)
      toast.success('Event saved!')
      onSaved()
    } catch(err) {
      toast.error('Failed to save event')
      console.error(err)
    }
    setLoading(false)
  }

  const tabs = ['basic','client','organizer','catering','decoration']

  const inputStyle = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(201,168,76,0.25)',
    color: '#f0e6ff',
    borderRadius: 8,
    padding: '10px 12px',
    width: '100%',
    fontSize: 13,
    outline: 'none',
    fontFamily: 'DM Sans, sans-serif'
  }

  const labelStyle = {
    fontSize: 11,
    color: '#a090b8',
    display: 'block',
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  }

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.85)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    }}>
      <div style={{
        background: '#1e0a35',
        border: '1px solid rgba(201,168,76,0.4)',
        borderRadius: 16,
        width: '100%',
        maxWidth: 640,
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 60px rgba(0,0,0,0.6)'
      }}>

        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(201,168,76,0.15)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#C9A84C', fontSize: 20, margin: 0 }}>
            {event ? '✏️ Edit Event' : '✨ New Event'}
          </h3>
          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: '#f0e6ff',
            fontSize: 18,
            width: 32, height: 32,
            borderRadius: 8,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>✕</button>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid rgba(201,168,76,0.1)',
          padding: '0 24px'
        }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              background: 'none',
              border: 'none',
              borderBottom: tab === t ? '2px solid #C9A84C' : '2px solid transparent',
              color: tab === t ? '#C9A84C' : '#a090b8',
              padding: '12px 14px',
              fontSize: 12,
              textTransform: 'capitalize',
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: tab === t ? 600 : 400
            }}>{t}</button>
          ))}
        </div>

        {/* Form Body */}
        <div style={{ padding: 24 }}>

          {tab === 'basic' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={labelStyle}>Event Title *</label>
                <input style={inputStyle} value={form.title} onChange={set('title')} placeholder="e.g. Sharma Wedding" />
              </div>
              <div>
                <label style={labelStyle}>Event Type</label>
                <select style={inputStyle} value={form.eventType} onChange={set('eventType')}>
                  {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Status</label>
                <select style={inputStyle} value={form.status} onChange={set('status')}>
                  <option value="CONFIRMED">CONFIRMED</option>
                  <option value="PENDING">PENDING</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Date *</label>
                <input style={inputStyle} type="date" value={form.eventDate} onChange={set('eventDate')} />
              </div>
              <div>
                <label style={labelStyle}>Start Time</label>
                <input style={inputStyle} type="time" value={form.startTime} onChange={set('startTime')} />
              </div>
              <div>
                <label style={labelStyle}>End Time</label>
                <input style={inputStyle} type="time" value={form.endTime} onChange={set('endTime')} />
              </div>
              <div>
                <label style={labelStyle}>Venue Name</label>
                <input style={inputStyle} value={form.venueName} onChange={set('venueName')} placeholder="Royal Banquet Hall" />
              </div>
              <div>
                <label style={labelStyle}>Guest Count</label>
                <input style={inputStyle} type="number" value={form.guestCount} onChange={set('guestCount')} placeholder="200" />
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={labelStyle}>Venue Address</label>
                <input style={inputStyle} value={form.venueAddress} onChange={set('venueAddress')} placeholder="Full address" />
              </div>
              <div>
                <label style={labelStyle}>Total Amount (₹)</label>
                <input style={inputStyle} type="number" value={form.totalAmount} onChange={set('totalAmount')} placeholder="150000" />
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={labelStyle}>Notes</label>
                <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={3} value={form.notes} onChange={set('notes')} placeholder="Any special notes..." />
              </div>
            </div>
          )}

          {tab === 'client' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div style={{ gridColumn: '1/-1', color: '#C9A84C', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>👤 Client Details</div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={labelStyle}>Full Name</label>
                <input style={inputStyle} value={form.clientName} onChange={set('clientName')} placeholder="Client name" />
              </div>
              <div>
                <label style={labelStyle}>Phone</label>
                <input style={inputStyle} value={form.clientPhone} onChange={set('clientPhone')} placeholder="+91 98765 43210" />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input style={inputStyle} value={form.clientEmail} onChange={set('clientEmail')} placeholder="client@email.com" />
              </div>
            </div>
          )}

          {tab === 'organizer' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div style={{ gridColumn: '1/-1', color: '#C9A84C', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>🎯 Event Organizer</div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={labelStyle}>Organizer Name</label>
                <input style={inputStyle} value={form.organizerName} onChange={set('organizerName')} placeholder="Organizer name" />
              </div>
              <div>
                <label style={labelStyle}>Company</label>
                <input style={inputStyle} value={form.organizerCompany} onChange={set('organizerCompany')} placeholder="Company name" />
              </div>
              <div>
                <label style={labelStyle}>Phone</label>
                <input style={inputStyle} value={form.organizerPhone} onChange={set('organizerPhone')} placeholder="+91 98765 43210" />
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={labelStyle}>Email</label>
                <input style={inputStyle} value={form.organizerEmail} onChange={set('organizerEmail')} placeholder="organizer@email.com" />
              </div>
            </div>
          )}

          {tab === 'catering' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div style={{ gridColumn: '1/-1', color: '#C9A84C', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>🍽️ Catering Service</div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={labelStyle}>Caterer Name</label>
                <input style={inputStyle} value={form.catererName} onChange={set('catererName')} placeholder="Caterer name" />
              </div>
              <div>
                <label style={labelStyle}>Company</label>
                <input style={inputStyle} value={form.catererCompany} onChange={set('catererCompany')} placeholder="Catering company" />
              </div>
              <div>
                <label style={labelStyle}>Phone</label>
                <input style={inputStyle} value={form.catererPhone} onChange={set('catererPhone')} placeholder="+91 98765 43210" />
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={labelStyle}>Email</label>
                <input style={inputStyle} value={form.catererEmail} onChange={set('catererEmail')} placeholder="caterer@email.com" />
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={labelStyle}>Menu Description</label>
                <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={3} value={form.menuDescription} onChange={set('menuDescription')} placeholder="North Indian, South Indian, Jain options..." />
              </div>
            </div>
          )}

          {tab === 'decoration' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div style={{ gridColumn: '1/-1', color: '#C9A84C', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>🌸 Decoration</div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={labelStyle}>Decorator Name</label>
                <input style={inputStyle} value={form.decoratorName} onChange={set('decoratorName')} placeholder="Decorator name" />
              </div>
              <div>
                <label style={labelStyle}>Company</label>
                <input style={inputStyle} value={form.decoratorCompany} onChange={set('decoratorCompany')} placeholder="Decoration company" />
              </div>
              <div>
                <label style={labelStyle}>Phone</label>
                <input style={inputStyle} value={form.decoratorPhone} onChange={set('decoratorPhone')} placeholder="+91 98765 43210" />
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={labelStyle}>Email</label>
                <input style={inputStyle} value={form.decoratorEmail} onChange={set('decoratorEmail')} placeholder="decorator@email.com" />
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={labelStyle}>Decoration Theme</label>
                <input style={inputStyle} value={form.decorationTheme} onChange={set('decorationTheme')} placeholder="Royal Rajasthani, Floral Garden, Modern Minimal..." />
              </div>
            </div>
          )}

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
            <button onClick={onClose} style={{
              flex: 1, padding: 12,
              background: 'transparent',
              border: '1px solid rgba(201,168,76,0.3)',
              color: '#a090b8', borderRadius: 8,
              cursor: 'pointer', fontSize: 14,
              fontFamily: 'DM Sans, sans-serif'
            }}>Cancel</button>
            <button onClick={submit} disabled={loading} style={{
              flex: 2, padding: 12,
              background: loading ? '#888' : 'linear-gradient(135deg,#C9A84C,#e8c97a)',
              border: 'none',
              color: '#1a0a2e', borderRadius: 8,
              fontWeight: 700, fontSize: 14,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'DM Sans, sans-serif'
            }}>
              {loading ? 'Saving...' : '✓ Save Event'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}