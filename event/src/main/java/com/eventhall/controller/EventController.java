package com.eventhall.controller;

import com.eventhall.model.Event;
import com.eventhall.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EventController {

    private final EventService service;

    @Autowired
    public EventController(EventService service) {
        this.service = service;
    }

    @GetMapping
    public List<Event> getAll() { return service.getAll(); }

    @GetMapping("/month")
    public List<Event> getByMonth(@RequestParam int year, @RequestParam int month) {
        return service.getByMonth(year, month);
    }

    @GetMapping("/{id}")
    public Event getById(@PathVariable Long id) { return service.getById(id); }

    @PostMapping
    public Event create(@RequestBody Event event) { return service.save(event); }

    @PutMapping("/{id}")
    public Event update(@PathVariable Long id, @RequestBody Event event) {
        return service.update(id, event);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}