import { useState, useEffect } from 'react'
import { getEventsByMonth } from '../api/events'

const EVENT_COLORS = {
  WEDDING: '#e91e8c',
  RECEPTION: '#9c27b0',
  SANGEET: '#ff9800',
  BIRTHDAY: '#4caf50',
  CORPORATE: '#2196f3',
  ENGAGEMENT: '#e91e63',
  ANNIVERSARY: '#ff5722',
  OTHER: '#607d8b',
}

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

export default function Calendar({ onSelectDate, onSelectEvent }) {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth() + 1)
  const [events, setEvents] = useState([])

  useEffect(() => {
    getEventsByMonth(year, month)
      .then(r => setEvents(Array.isArray(r.data) ? r.data : []))
      .catch(() => setEvents([]))
  }, [year, month])

  const firstDay = new Date(year, month - 1, 1).getDay()
  const daysInMonth = new Date(year, month, 0).getDate()

  const getEventsForDay = (day) => {
    if (!Array.isArray(events)) return []
    const d = `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`
    return events.filter(e => e.eventDate === d)
  }

  const prev = () => {
    if (month === 1) { setMonth(12); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }
  const next = () => {
    if (month === 12) { setMonth(1); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <h2 style={{ fontFamily:'Playfair Display', fontSize: 28, color: '#C9A84C' }}>
          {MONTHS[month-1]} {year}
        </h2>
        <div style={{ display:'flex', gap: 8 }}>
          <button onClick={prev} style={navBtn}>‹</button>
          <button onClick={() => { setYear(today.getFullYear()); setMonth(today.getMonth()+1) }}
            style={{ ...navBtn, fontSize: 13, padding: '6px 14px' }}>Today</button>
          <button onClick={next} style={navBtn}>›</button>
        </div>
      </div>

      {/* Day labels */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap: 4 }}>
        {DAYS.map(d => (
          <div key={d} style={{ textAlign:'center', fontSize: 12, color:'#a090b8', padding:'6px 0', fontWeight: 500 }}>{d}</div>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap: 4, flex: 1 }}>
        {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const dayEvents = getEventsForDay(day)
          const isToday = today.getFullYear()===year && today.getMonth()+1===month && today.getDate()===day
          return (
            <div
              key={day}
              onClick={() => onSelectDate({ year, month, day })}
              style={{
                background: isToday ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.03)',
                border: isToday ? '1px solid #C9A84C' : '1px solid rgba(201,168,76,0.1)',
                borderRadius: 10,
                padding: '8px 6px',
                minHeight: 80,
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(201,168,76,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background=isToday?'rgba(201,168,76,0.15)':'rgba(255,255,255,0.03)'}
            >
              <div style={{ fontSize: 13, fontWeight: isToday ? 700 : 400, color: isToday ? '#C9A84C' : '#e0d0ff', marginBottom: 4 }}>{day}</div>
              {dayEvents.slice(0,3).map(ev => (
                <div
                  key={ev.id}
                  onClick={e => { e.stopPropagation(); onSelectEvent(ev) }}
                  style={{
                    background: EVENT_COLORS[ev.eventType] || '#607d8b',
                    borderRadius: 4,
                    fontSize: 10,
                    padding: '2px 5px',
                    marginBottom: 2,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    color: '#fff',
                    cursor: 'pointer',
                  }}>
                  {ev.title}
                </div>
              ))}
              {dayEvents.length > 3 && <div style={{ fontSize: 9, color:'#a090b8' }}>+{dayEvents.length-3} more</div>}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div style={{ display:'flex', flexWrap:'wrap', gap: 10 }}>
        {Object.entries(EVENT_COLORS).map(([type, color]) => (
          <div key={type} style={{ display:'flex', alignItems:'center', gap:5, fontSize:11, color:'#a090b8' }}>
            <div style={{ width:10, height:10, borderRadius:2, background:color }} />
            {type}
          </div>
        ))}
      </div>
    </div>
  )
}

const navBtn = {
  background: 'rgba(201,168,76,0.1)',
  border: '1px solid rgba(201,168,76,0.3)',
  color: '#C9A84C',
  borderRadius: 8,
  padding: '6px 12px',
  fontSize: 18,
  cursor: 'pointer',
}