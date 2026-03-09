# ✨ EventHall — India Event Hall Management System

A full-stack event management application built for Indian event halls to manage weddings, receptions, sangeet, birthdays and other celebrations.

![Tech Stack](https://img.shields.io/badge/Frontend-React%20Vite-61DAFB?style=flat&logo=react)
![Tech Stack](https://img.shields.io/badge/Backend-Spring%20Boot-6DB33F?style=flat&logo=springboot)
![Tech Stack](https://img.shields.io/badge/Database-MySQL-4479A1?style=flat&logo=mysql)
![Tech Stack](https://img.shields.io/badge/Container-Docker-2496ED?style=flat&logo=docker)

---

## 📸 Features

- 📅 **Calendar View** — Monthly calendar with colour-coded event types
- ➕ **Click any date** to create an event instantly
- 👤 **Client Details** — Name, phone, email
- 🎯 **Organizer Details** — Company, contact info
- 🍽️ **Catering Service** — Caterer details + menu description
- 🌸 **Decoration** — Decorator details + theme
- 📄 **PDF Invoice** — Download professional invoice with one click
- 🏷️ **Status Tracking** — Confirmed / Pending / Cancelled
- 💰 **Amount Tracking** — Total in Indian Rupees ₹

---

## Screenshots 📸
-** Adding Event 

<img width="1916" height="865" alt="Screenshot 2026-03-07 182430" src="https://github.com/user-attachments/assets/67cb08c0-c173-4d72-a55a-6ef4d6a6678d" />
-** SQl Database
<img width="1460" height="699" alt="Screenshot 2026-03-06 173551" src="https://github.com/user-attachments/assets/1dd0c593-075c-4b5c-815d-4ed9708d2b4a" />
-
--** Docker Running
<img width="1570" height="898" alt="image" src="https://github.com/user-attachments/assets/e794fe1f-3e22-47bc-bdfe-3d59e22b805f" />


## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Axios, jsPDF |
| Backend | Spring Boot 3.5, Spring Data JPA, Hibernate |
| Database | MySQL 8.0 |
| Server | Nginx (reverse proxy) |
| DevOps | Docker, Docker Compose |

---

## 🏗️ Architecture

```
User → Nginx (Port 80) → React Frontend
                       → Spring Boot API (Port 8080) → MySQL (Port 3306)
```

**3-Layer Backend Architecture:**
```
Controller Layer  →  Service Layer  →  Repository Layer  →  MySQL
(HTTP Requests)      (Business Logic)   (JPA/Hibernate)      (Data)
```

---

## 🚀 Run with Docker (Recommended)

**Prerequisites:** Docker Desktop installed

```bash
# Clone the repo
git clone https://github.com/Shantanu-stack/eventhall.git
cd eventhall

# Run all 3 containers
docker-compose up --build
```

Open browser → **http://localhost**

That's it! No manual setup needed. Docker handles MySQL, Spring Boot and React automatically.

---

## 💻 Run Locally (Without Docker)

**Prerequisites:** Java 17+, Node.js 22+, MySQL 8.0

**Backend:**
```bash
cd event

# Update src/main/resources/application.properties
# Set your MySQL password

mvn spring-boot:run
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Open browser → **http://localhost:5173**

---

## 📁 Project Structure

```
eventhall/
├── event/                          ← Spring Boot Backend
│   ├── src/main/java/com/eventhall/
│   │   ├── model/
│   │   │   └── Event.java          ← JPA Entity
│   │   ├── repository/
│   │   │   └── EventRepository.java
│   │   ├── service/
│   │   │   └── EventService.java
│   │   ├── controller/
│   │   │   └── EventController.java
│   │   └── CorsConfig.java
│   └── src/main/resources/
│       └── application.properties
├── frontend/                       ← React Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Calendar.jsx        ← Monthly calendar view
│   │   │   ├── EventForm.jsx       ← Tabbed event form
│   │   │   ├── EventDetail.jsx     ← Event detail + invoice
│   │   │   └── InvoicePDF.jsx      ← PDF generator (jsPDF)
│   │   ├── api/
│   │   │   └── events.js           ← Axios API calls
│   │   └── App.jsx
│   ├── Dockerfile
│   └── nginx.conf
├── event/Dockerfile                ← Backend Dockerfile
├── docker-compose.yml
└── .gitignore
```

---

## 🗄️ Database Schema

Table: `events`

| Column | Type | Description |
|---|---|---|
| id | BIGINT | Primary Key, Auto Increment |
| title | VARCHAR | Event name |
| event_type | ENUM | WEDDING, RECEPTION, SANGEET, BIRTHDAY, CORPORATE, ENGAGEMENT, ANNIVERSARY, OTHER |
| event_date | DATE | Event date (used for calendar) |
| start_time / end_time | VARCHAR | Event timing |
| venue_name / venue_address | VARCHAR | Hall details |
| client_name/phone/email | VARCHAR | Client contact |
| organizer_name/phone/email/company | VARCHAR | Organizer details |
| caterer_name/phone/email/company | VARCHAR | Catering service |
| menu_description | VARCHAR | Food menu |
| decorator_name/phone/email/company | VARCHAR | Decoration team |
| decoration_theme | VARCHAR | e.g. Rajasthani, Floral |
| guest_count | INTEGER | Number of guests |
| total_amount | FLOAT | Amount in ₹ |
| status | ENUM | CONFIRMED, PENDING, CANCELLED |
| notes | VARCHAR | Extra info |

---

## 🌐 REST API Endpoints

Base URL: `http://localhost:8080/api`

| Method | Endpoint | Description |
|---|---|---|
| GET | /events | Get all events |
| GET | /events/month?year=2026&month=3 | Get events by month |
| GET | /events/{id} | Get single event |
| POST | /events | Create new event |
| PUT | /events/{id} | Update event |
| DELETE | /events/{id} | Delete event |

---

## 📄 PDF Invoice

Click any event on the calendar → Click **📄 Invoice** button → PDF downloads instantly.

Invoice includes:
- Event details (date, time, venue)
- Client contact information
- Organizer details
- Catering service + menu
- Decoration details + theme
- Total amount in ₹
- Invoice number + generated date

> PDF is generated entirely in the browser using **jsPDF** — no server required.

---

## 🔮 Future Improvements

- [ ] JWT Authentication + Login page
- [ ] Input validation with @Valid
- [ ] Unit tests with JUnit + Mockito
- [ ] Exception handling with @ControllerAdvice
- [ ] Deploy on VPS / Cloud

---

## 👨‍💻 Author

**Shantanu** — [GitHub](https://github.com/Shantanu-stack)

---

> Built with ❤️ for Indian event halls 🇮🇳
