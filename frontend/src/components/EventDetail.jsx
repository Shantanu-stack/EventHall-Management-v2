import { deleteEvent } from '../api/events'
import { generateInvoice } from './InvoicePDF'
import toast from 'react-hot-toast'

const TYPE_EMOJI = { WEDDING:'💍', RECEPTION:'🎊', SANGEET:'💃', BIRTHDAY:'🎂', CORPORATE:'💼', ENGAGEMENT:'💑', ANNIVERSARY:'❤️', OTHER:'🎉' }
const STATUS_COLOR = { CONFIRMED:'#4caf82', PENDING:'#ff9800', CANCELLED:'#e05c5c' }

export default function EventDetail({ event, onClose, onEdit, onDeleted }) {
  const handleDelete = async () => {
    if (!confirm('Delete this event?')) return
    try {
      await deleteEvent(event.id)
      toast.success('Deleted')
      onDeleted()
    } catch { toast.error('Failed') }
  }

  const handleInvoice = () => {
    generateInvoice(event)
    toast.success('Invoice downloaded!')
  }

  const Row = ({ label, value }) => value ? (
    <div style={{ display:'flex', gap:10, padding:'7px 0', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
      <span style={{ color:'#a090b8', fontSize:12, minWidth:120 }}>{label}</span>
      <span style={{ fontSize:13 }}>{value}</span>
    </div>
  ) : null

  const Section = ({ title, children }) => (
    <div style={{ marginTop:16 }}>
      <div style={{ color:'#C9A84C', fontSize:13, fontWeight:600, marginBottom:8 }}>{title}</div>
      {children}
    </div>
  )

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.8)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div style={{ background:'#1e0a35', border:'1px solid rgba(201,168,76,0.3)', borderRadius:16, width:'100%', maxWidth:560, maxHeight:'90vh', overflow:'auto' }}>
        
        <div style={{ padding:'20px 24px', borderBottom:'1px solid rgba(201,168,76,0.15)', display:'flex', justifyContent:'space-between' }}>
          <div>
            <div style={{ fontSize:22, marginBottom:4 }}>{TYPE_EMOJI[event.eventType]} {event.title}</div>
            <div style={{ display:'flex', gap:8, alignItems:'center' }}>
              <span style={{ background:'rgba(201,168,76,0.15)', color:'#C9A84C', padding:'2px 10px', borderRadius:20, fontSize:12 }}>{event.eventType}</span>
              <span style={{ background:`${STATUS_COLOR[event.status]}22`, color:STATUS_COLOR[event.status], padding:'2px 10px', borderRadius:20, fontSize:12 }}>{event.status}</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'#a090b8', fontSize:22, cursor:'pointer', alignSelf:'flex-start' }}>✕</button>
        </div>

        <div style={{ padding:24 }}>
          <Section title="📅 Event Info">
            <Row label="Date" value={event.eventDate} />
            <Row label="Time" value={event.startTime && `${event.startTime} – ${event.endTime}`} />
            <Row label="Venue" value={event.venueName} />
            <Row label="Address" value={event.venueAddress} />
            <Row label="Guests" value={event.guestCount && `${event.guestCount} guests`} />
            <Row label="Total Amount" value={event.totalAmount && `₹${Number(event.totalAmount).toLocaleString('en-IN')}`} />
          </Section>

          {event.clientName && (
            <Section title="👤 Client">
              <Row label="Name" value={event.clientName} />
              <Row label="Phone" value={event.clientPhone} />
              <Row label="Email" value={event.clientEmail} />
            </Section>
          )}

          {event.organizerName && (
            <Section title="🎯 Organizer">
              <Row label="Name" value={event.organizerName} />
              <Row label="Company" value={event.organizerCompany} />
              <Row label="Phone" value={event.organizerPhone} />
              <Row label="Email" value={event.organizerEmail} />
            </Section>
          )}

          {event.catererName && (
            <Section title="🍽️ Catering">
              <Row label="Caterer" value={event.catererName} />
              <Row label="Company" value={event.catererCompany} />
              <Row label="Phone" value={event.catererPhone} />
              <Row label="Menu" value={event.menuDescription} />
            </Section>
          )}

          {event.decoratorName && (
            <Section title="🌸 Decoration">
              <Row label="Decorator" value={event.decoratorName} />
              <Row label="Company" value={event.decoratorCompany} />
              <Row label="Phone" value={event.decoratorPhone} />
              <Row label="Theme" value={event.decorationTheme} />
            </Section>
          )}

          {event.notes && (
            <Section title="📝 Notes">
              <p style={{ fontSize:13, color:'#c0b0d8', lineHeight:1.6 }}>{event.notes}</p>
            </Section>
          )}

          <div style={{ display:'flex', gap:10, marginTop:24 }}>
            <button onClick={handleDelete} style={{ padding:'10px 16px', background:'rgba(224,92,92,0.1)', border:'1px solid rgba(224,92,92,0.3)', color:'#e05c5c', borderRadius:8, cursor:'pointer' }}>Delete</button>
            <button onClick={handleInvoice} style={{ padding:'10px 16px', background:'rgba(201,168,76,0.1)', border:'1px solid rgba(201,168,76,0.4)', color:'#C9A84C', borderRadius:8, cursor:'pointer', fontWeight:600 }}>📄 Invoice</button>
            <button onClick={() => onEdit(event)} style={{ flex:1, padding:'10px', background:'linear-gradient(135deg,#C9A84C,#e8c97a)', border:'none', color:'#1a0a2e', borderRadius:8, fontWeight:700 }}>Edit Event</button>
          </div>
        </div>
      </div>
    </div>
  )
}