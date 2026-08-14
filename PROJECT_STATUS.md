# HEALTH PLATFORM — PROJECT STATUS

Project: Health Platform
Repository: AbdullahTurgut/health-platform
Status: 🟢 Foundation
Last Updated: 14 August 2026

---

# 1. Project Overview

Health Platform, kullanıcıların kişisel sağlık geçmişlerini tek bir platform üzerinden düzenli, aranabilir ve takip edilebilir şekilde yönetmesini amaçlayan bir web ve mobil sağlık takip platformudur.

Platformun temel amacı:

- Hastalık takibi
- Hastane ziyaretlerinin kaydı
- Doktor bilgilerinin takibi
- Test sonuçlarının saklanması
- MR / CT / X-Ray gibi görüntüleme kayıtlarının yönetilmesi
- Sağlık belgelerinin saklanması
- İlaç takibi
- Sağlık geçmişinin timeline üzerinden görüntülenmesi
- Sağlık kayıtları içerisinde hızlı arama yapılabilmesi

Platform tıbbi teşhis veya tedavi önerisi sunmayı amaçlamaz.

---

# 2. Project Goals

Ana problem:

> Kullanıcıların zaman içerisinde artan hastane ziyaretleri, test sonuçları, görüntüleme raporları ve sağlık belgelerini takip etmekte zorlanması.

Platform bu problemi:

- Merkezi sağlık arşivi
- Hastalık bazlı organizasyon
- Timeline
- Search
- Filtreleme
- Doktor / hastane geçmişi
- Test sonuçlarının yapılandırılmış tutulması

ile çözmeyi hedeflemektedir.

---

# 3. Product Scope

## MVP

- User registration
- User authentication
- JWT authentication
- Disease management
- Doctor management
- Hospital management
- Hospital visit management
- Medical test management
- Test result management
- Imaging records
- Medical document management
- Medication management
- Health timeline
- Basic search
- Filtering

## Future

- Mobile application
- Push notifications
- Appointment reminders
- Advanced search
- OCR
- AI-assisted document understanding
- AI-powered health record search
- Health trends and analytics
- Family member profiles
- Data export
- Sharing / access permissions

---

# 4. Technology Stack

## Backend

- Java
- Spring Boot
- Spring Data JPA
- Spring Security
- JWT
- PostgreSQL
- Flyway
- Maven

## Frontend

Planned:

- React
- TypeScript
- Vite
- Tailwind CSS

## Infrastructure

- Docker
- Docker Compose
- PostgreSQL

## Future Mobile

Planned:

- React Native

---

# 5. Database Domain Model

Current planned entities:

- User
- Disease
- Doctor
- Hospital
- Visit
- MedicalTest
- TestResult
- Imaging
- MedicalDocument
- Medication

Timeline will initially be generated through a service/read-model approach rather than stored as a generic polymorphic database table.

---

# 6. Database Architecture Principles

- PostgreSQL is the primary relational database.
- UUID is used for entity identifiers.
- Database schema is managed through Flyway migrations.
- Medical records are scoped to the authenticated user.
- User medical data must never be accessible by another user.
- Sensitive credentials must never be stored in plain text.
- Database credentials are provided through environment variables.
- Production secrets must never be committed to Git.

---

# 7. Current Project Structure

```text
health-platform/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/healthplatform/
│   │   │   └── resources/
│   │   │       └── application.yml
│   │   │
│   │   └── test/
│   │
│   └── pom.xml
│
├── frontend/
│
├── docker-compose.yml
├── .env
├── .gitignore
└── PROJECT_STATUS.md
```
