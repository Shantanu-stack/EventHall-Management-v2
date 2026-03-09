package com.eventhall.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Enumerated(EnumType.STRING)
    private EventType eventType;

    private LocalDate eventDate;
    private String startTime;
    private String endTime;
    private String venueName;
    private String venueAddress;

    private String clientName;
    private String clientPhone;
    private String clientEmail;

    private String organizerName;
    private String organizerPhone;
    private String organizerEmail;
    private String organizerCompany;

    private String catererName;
    private String catererPhone;
    private String catererEmail;
    private String catererCompany;
    private String menuDescription;

    private String decoratorName;
    private String decoratorPhone;
    private String decoratorEmail;
    private String decoratorCompany;
    private String decorationTheme;

    private Integer guestCount;
    private Double totalAmount;
    private String notes;

    @Enumerated(EnumType.STRING)
    private EventStatus status = EventStatus.CONFIRMED;

    public enum EventType {
        WEDDING, RECEPTION, SANGEET, BIRTHDAY, CORPORATE, ENGAGEMENT, ANNIVERSARY, OTHER
    }

    public enum EventStatus {
        CONFIRMED, PENDING, CANCELLED
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public EventType getEventType() { return eventType; }
    public void setEventType(EventType eventType) { this.eventType = eventType; }

    public LocalDate getEventDate() { return eventDate; }
    public void setEventDate(LocalDate eventDate) { this.eventDate = eventDate; }

    public String getStartTime() { return startTime; }
    public void setStartTime(String startTime) { this.startTime = startTime; }

    public String getEndTime() { return endTime; }
    public void setEndTime(String endTime) { this.endTime = endTime; }

    public String getVenueName() { return venueName; }
    public void setVenueName(String venueName) { this.venueName = venueName; }

    public String getVenueAddress() { return venueAddress; }
    public void setVenueAddress(String venueAddress) { this.venueAddress = venueAddress; }

    public String getClientName() { return clientName; }
    public void setClientName(String clientName) { this.clientName = clientName; }

    public String getClientPhone() { return clientPhone; }
    public void setClientPhone(String clientPhone) { this.clientPhone = clientPhone; }

    public String getClientEmail() { return clientEmail; }
    public void setClientEmail(String clientEmail) { this.clientEmail = clientEmail; }

    public String getOrganizerName() { return organizerName; }
    public void setOrganizerName(String organizerName) { this.organizerName = organizerName; }

    public String getOrganizerPhone() { return organizerPhone; }
    public void setOrganizerPhone(String organizerPhone) { this.organizerPhone = organizerPhone; }

    public String getOrganizerEmail() { return organizerEmail; }
    public void setOrganizerEmail(String organizerEmail) { this.organizerEmail = organizerEmail; }

    public String getOrganizerCompany() { return organizerCompany; }
    public void setOrganizerCompany(String organizerCompany) { this.organizerCompany = organizerCompany; }

    public String getCatererName() { return catererName; }
    public void setCatererName(String catererName) { this.catererName = catererName; }

    public String getCatererPhone() { return catererPhone; }
    public void setCatererPhone(String catererPhone) { this.catererPhone = catererPhone; }

    public String getCatererEmail() { return catererEmail; }
    public void setCatererEmail(String catererEmail) { this.catererEmail = catererEmail; }

    public String getCatererCompany() { return catererCompany; }
    public void setCatererCompany(String catererCompany) { this.catererCompany = catererCompany; }

    public String getMenuDescription() { return menuDescription; }
    public void setMenuDescription(String menuDescription) { this.menuDescription = menuDescription; }

    public String getDecoratorName() { return decoratorName; }
    public void setDecoratorName(String decoratorName) { this.decoratorName = decoratorName; }

    public String getDecoratorPhone() { return decoratorPhone; }
    public void setDecoratorPhone(String decoratorPhone) { this.decoratorPhone = decoratorPhone; }

    public String getDecoratorEmail() { return decoratorEmail; }
    public void setDecoratorEmail(String decoratorEmail) { this.decoratorEmail = decoratorEmail; }

    public String getDecoratorCompany() { return decoratorCompany; }
    public void setDecoratorCompany(String decoratorCompany) { this.decoratorCompany = decoratorCompany; }

    public String getDecorationTheme() { return decorationTheme; }
    public void setDecorationTheme(String decorationTheme) { this.decorationTheme = decorationTheme; }

    public Integer getGuestCount() { return guestCount; }
    public void setGuestCount(Integer guestCount) { this.guestCount = guestCount; }

    public Double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public EventStatus getStatus() { return status; }
    public void setStatus(EventStatus status) { this.status = status; }
}