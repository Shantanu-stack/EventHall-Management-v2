package com.eventhall.service;

import com.eventhall.model.Event;
import com.eventhall.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class EventService {

    private final EventRepository repo;

    @Autowired
    public EventService(EventRepository repo) {
        this.repo = repo;
    }

    public List<Event> getAll() { return repo.findAll(); }

    public List<Event> getByMonth(int year, int month) {
        LocalDate start = LocalDate.of(year, month, 1);
        LocalDate end = start.withDayOfMonth(start.lengthOfMonth());
        return repo.findByEventDateBetween(start, end);
    }

    public Event getById(Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Event not found"));
    }

    public Event save(Event event) { return repo.save(event); }

    public Event update(Long id, Event event) {
        Event existing = getById(id);
        existing.setTitle(event.getTitle());
        existing.setEventType(event.getEventType());
        existing.setEventDate(event.getEventDate());
        existing.setStartTime(event.getStartTime());
        existing.setEndTime(event.getEndTime());
        existing.setVenueName(event.getVenueName());
        existing.setVenueAddress(event.getVenueAddress());
        existing.setClientName(event.getClientName());
        existing.setClientPhone(event.getClientPhone());
        existing.setClientEmail(event.getClientEmail());
        existing.setOrganizerName(event.getOrganizerName());
        existing.setOrganizerPhone(event.getOrganizerPhone());
        existing.setOrganizerEmail(event.getOrganizerEmail());
        existing.setOrganizerCompany(event.getOrganizerCompany());
        existing.setCatererName(event.getCatererName());
        existing.setCatererPhone(event.getCatererPhone());
        existing.setCatererEmail(event.getCatererEmail());
        existing.setCatererCompany(event.getCatererCompany());
        existing.setMenuDescription(event.getMenuDescription());
        existing.setDecoratorName(event.getDecoratorName());
        existing.setDecoratorPhone(event.getDecoratorPhone());
        existing.setDecoratorEmail(event.getDecoratorEmail());
        existing.setDecoratorCompany(event.getDecoratorCompany());
        existing.setDecorationTheme(event.getDecorationTheme());
        existing.setGuestCount(event.getGuestCount());
        existing.setTotalAmount(event.getTotalAmount());
        existing.setNotes(event.getNotes());
        existing.setStatus(event.getStatus());
        return repo.save(existing);
    }

    public void delete(Long id) { repo.deleteById(id); }
}