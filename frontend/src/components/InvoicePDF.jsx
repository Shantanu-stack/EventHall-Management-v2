import jsPDF from 'jspdf'

export function generateInvoice(event) {
  const doc = new jsPDF()
  const gold = [193, 154, 107]
  const dark = [20, 20, 30]
  const gray = [100, 100, 120]
  const light = [240, 235, 255]

  // Background header
  doc.setFillColor(...dark)
  doc.rect(0, 0, 210, 45, 'F')

  // Title
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  doc.text('EventHall', 14, 18)

  doc.setTextColor(...gold)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text('Event Management Invoice', 14, 28)

  // Invoice number + date
  doc.setTextColor(200, 200, 220)
  doc.setFontSize(9)
  doc.text(`Invoice #EVH-${event.id || '001'}`, 140, 18)
  doc.text(`Date: ${new Date().toLocaleDateString('en-IN')}`, 140, 26)
  doc.text(`Status: ${event.status || 'CONFIRMED'}`, 140, 34)

  let y = 55

  // Event title banner
  doc.setFillColor(...gold)
  doc.rect(14, y, 182, 12, 'F')
  doc.setTextColor(...dark)
  doc.setFontSize(13)
  doc.setFont('helvetica', 'bold')
  doc.text(event.title || 'Event', 18, y + 8)

  const typeEmoji = { WEDDING:'💍', RECEPTION:'🎊', SANGEET:'💃', BIRTHDAY:'🎂', CORPORATE:'💼', ENGAGEMENT:'💑', ANNIVERSARY:'❤️', OTHER:'🎉' }
  doc.setFontSize(10)
  doc.text(`${event.eventType || ''}`, 160, y + 8)
  y += 20

  // Helper functions
  const sectionTitle = (title, yPos) => {
    doc.setFillColor(235, 230, 250)
    doc.rect(14, yPos, 182, 8, 'F')
    doc.setTextColor(...dark)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text(title, 18, yPos + 5.5)
    return yPos + 14
  }

  const row = (label, value, yPos, col = 0) => {
    if (!value) return yPos
    const x = col === 0 ? 14 : 110
    doc.setTextColor(...gray)
    doc.setFontSize(8.5)
    doc.setFont('helvetica', 'normal')
    doc.text(label + ':', x, yPos)
    doc.setTextColor(...dark)
    doc.setFont('helvetica', 'bold')
    doc.text(String(value), x + 35, yPos)
    return col === 1 ? yPos + 7 : yPos
  }

  // Event Details
  y = sectionTitle('📅  EVENT DETAILS', y)
  row('Date', event.eventDate, y, 0)
  row('Venue', event.venueName, y, 1)
  y += 7
  row('Time', event.startTime ? `${event.startTime} – ${event.endTime}` : null, y, 0)
  row('Address', event.venueAddress, y, 1)
  y += 7
  row('Guests', event.guestCount ? `${event.guestCount} persons` : null, y, 0)
  y += 12

  // Client
  if (event.clientName) {
    y = sectionTitle('👤  CLIENT DETAILS', y)
    row('Name', event.clientName, y, 0)
    row('Phone', event.clientPhone, y, 1)
    y += 7
    row('Email', event.clientEmail, y, 0)
    y += 12
  }

  // Organizer
  if (event.organizerName) {
    y = sectionTitle('🎯  ORGANIZER', y)
    row('Name', event.organizerName, y, 0)
    row('Company', event.organizerCompany, y, 1)
    y += 7
    row('Phone', event.organizerPhone, y, 0)
    row('Email', event.organizerEmail, y, 1)
    y += 12
  }

  // Catering
  if (event.catererName) {
    y = sectionTitle('🍽️  CATERING SERVICE', y)
    row('Caterer', event.catererName, y, 0)
    row('Company', event.catererCompany, y, 1)
    y += 7
    row('Phone', event.catererPhone, y, 0)
    row('Email', event.catererEmail, y, 1)
    y += 7
    if (event.menuDescription) {
      doc.setTextColor(...gray)
      doc.setFontSize(8.5)
      doc.setFont('helvetica', 'normal')
      doc.text('Menu:', 14, y)
      doc.setTextColor(...dark)
      doc.setFont('helvetica', 'bold')
      const menuLines = doc.splitTextToSize(event.menuDescription, 150)
      doc.text(menuLines, 50, y)
      y += menuLines.length * 6
    }
    y += 6
  }

  // Decoration
  if (event.decoratorName) {
    y = sectionTitle('🌸  DECORATION', y)
    row('Decorator', event.decoratorName, y, 0)
    row('Company', event.decoratorCompany, y, 1)
    y += 7
    row('Theme', event.decorationTheme, y, 0)
    row('Phone', event.decoratorPhone, y, 1)
    y += 12
  }

  // Notes
  if (event.notes) {
    y = sectionTitle('📝  NOTES', y)
    doc.setTextColor(...gray)
    doc.setFontSize(8.5)
    doc.setFont('helvetica', 'normal')
    const noteLines = doc.splitTextToSize(event.notes, 176)
    doc.text(noteLines, 18, y)
    y += noteLines.length * 6 + 8
  }

  // Total Amount Box
  y += 4
  doc.setFillColor(...dark)
  doc.rect(14, y, 182, 20, 'F')
  doc.setTextColor(200, 200, 220)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text('TOTAL AMOUNT', 18, y + 8)
  doc.setTextColor(...gold)
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  const amount = event.totalAmount
    ? `Rs. ${Number(event.totalAmount).toLocaleString('en-IN')}`
    : 'To be confirmed'
  doc.text(amount, 196 - doc.getTextWidth(amount), y + 13)

  // Footer
  y += 30
  doc.setDrawColor(...gold)
  doc.setLineWidth(0.5)
  doc.line(14, y, 196, y)
  y += 6
  doc.setTextColor(...gray)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.text('Thank you for choosing EventHall — Pune\'s Premier Event Management', 105, y, { align: 'center' })

  // Save
  const filename = `Invoice_${(event.title || 'Event').replace(/\s+g/, '_')}_${event.eventDate || 'NA'}.pdf`
  doc.save(filename)
}