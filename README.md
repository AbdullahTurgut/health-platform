# Health Platform

A secure, full-stack personal health record platform for organizing and tracking medical history in one place.

Health Platform allows users to manage diseases, doctors, hospitals, visits, medical tests, test results, imaging records, documents, and medications through a unified personal health timeline and global search experience.

The project is designed around a simple idea: **medical history should be organized, searchable, private, and easy to understand.**

---

## Overview

Medical information is often fragmented across hospitals, laboratories, reports, imaging systems, prescriptions, and personal notes.

Health Platform aims to provide users with a structured personal health record where these records can be managed together under a single account.

The current application focuses on building a strong and secure data foundation before introducing advanced capabilities such as AI-assisted summarization, OCR, and semantic search.

> Health Platform is currently a portfolio / development project and is not intended to provide medical diagnosis or treatment advice.

---

## Features

### Authentication & Security

- Secure user registration and login
- JWT-based stateless authentication
- BCrypt password hashing
- Protected API endpoints
- User-scoped data ownership
- Cross-user resource isolation
- Secure CORS configuration
- Validation and centralized API error handling

### Dashboard

- Personal health record overview
- Summary statistics
- Recent health activity
- Quick access to major record categories

### Disease Management

- Create, update, delete, and list diseases
- Track disease status
- Filter health records by disease

### Doctors

- Store doctor information
- Track specialization and contact information
- Associate doctors with relevant health records

### Hospitals

- Store hospitals and healthcare institutions
- Track location and contact information
- Associate hospitals with visits and other records

### Visits

- Record medical visits
- Associate visits with:
  - diseases
  - doctors
  - hospitals
- Store visit reason, diagnosis, and notes

### Medical Tests

- Track laboratory and medical tests
- Associate tests with diseases and visits
- Organize tests by category

### Test Results

- Store results belonging to medical tests
- Maintain result history
- Support structured result information

### Imaging

- Track medical imaging records
- Support multiple imaging types
- Associate imaging with:
  - diseases
  - visits
  - doctors
  - hospitals
- Store body part, report, and notes

### Medical Documents

- Upload private medical files
- Download previously uploaded documents
- Associate documents with:
  - diseases
  - visits
  - medical tests
  - imaging records
- Track document metadata and document type

### Medications

- Manage medications
- Track:
  - dosage
  - frequency
  - administration route
  - status
  - start and end dates
  - prescribing physician
- Associate medications with diseases

### Health Timeline

- Unified chronological view of health activity
- Aggregates:
  - visits
  - medical tests
  - imaging
  - documents
  - medications
- Filter by event type, disease, and date range
- Pagination support

### Global Search

Search across the personal health record from a single interface.

Current searchable record types include:

- Diseases
- Doctors
- Hospitals
- Visits
- Medical Tests
- Test Results
- Imaging
- Documents
- Medications

Search results can also be filtered by record type and disease.

### Profile

- View personal account information
- Update first name, last name, and date of birth
- View account metadata

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Axios
- Tailwind CSS v4
- shadcn/ui
- Base UI
- Lucide Icons
- Geist Variable font

### Backend

- Java
- Spring Boot
- Spring Web
- Spring Security
- Spring Data JPA
- Hibernate
- Bean Validation
- JWT Authentication
- Lombok
- Maven

### Database & Infrastructure

- PostgreSQL
- Flyway
- Docker
- Docker Compose

---

## Architecture

Health Platform currently follows a traditional full-stack architecture:

```text
┌──────────────────────────────┐
│                              │
│     React + TypeScript       │
│        Frontend              │
│                              │
└──────────────┬───────────────┘
               │
               │ REST API / JWT
               ▼
┌──────────────────────────────┐
│                              │
│       Spring Boot API        │
│                              │
│  Controllers                 │
│  Services                    │
│  Security                    │
│  Repositories                │
│                              │
└──────────────┬───────────────┘
               │
               │ JPA / Hibernate
               ▼
┌──────────────────────────────┐
│                              │
│         PostgreSQL           │
│                              │
│      Flyway Migrations       │
│                              │
└──────────────────────────────┘
```

The backend is the authoritative data layer.

The frontend communicates with the backend through authenticated REST endpoints using JWT bearer tokens.

---

## Security Model

Medical information is treated as private user-owned data.

The backend applies ownership checks so authenticated users can only access resources belonging to their own account.

Core security principles include:

- Stateless authentication
- JWT verification
- Password hashing with BCrypt
- User ownership enforcement
- Protected document access
- Input validation
- Controlled CORS policy
- Safe API error responses
- Database schema management through Flyway

Security and privacy remain major priorities as the platform evolves.

---

## Database Strategy

Database schema changes are managed through **Flyway migrations**.

Hibernate is configured to validate the schema rather than generate production database structures automatically.

```text
Flyway            → Schema owner
Hibernate / JPA   → ORM + schema validation
PostgreSQL        → Primary relational database
```

This keeps database evolution explicit, versioned, and reproducible.

---

## Project Structure

```text
health-platform/
│
├── backend/
│   └── health-platform/
│       ├── src/
│       │   ├── main/
│       │   │   ├── java/
│       │   │   └── resources/
│       │   └── test/
│       ├── pom.xml
│       └── mvnw
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── auth/
│   │   ├── components/
│   │   ├── config/
│   │   ├── i18n/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
│   ├── package.json
│   └── vite.config.ts
│
├── docker-compose.yml
├── PROJECT_STATUS.md
└── README.md
```

---

## Frontend Design System

The web interface follows a calm and modern visual direction designed for personal health information.

### Design principles

- Low visual noise
- Clear information hierarchy
- Responsive layouts
- Accessible keyboard navigation
- Visible focus states
- Reduced-motion support
- Mobile-friendly controls
- Consistent cards, forms, filters, and dialogs

### Visual identity

The current design system uses:

- Muted emerald / teal primary colors
- Neutral off-white surfaces
- Slate-inspired typography
- Geist Variable
- Subtle borders and shadows
- Minimal use of semantic color

Medical records are intentionally not assigned arbitrary "good" or "bad" colors.

---

## Getting Started

### Prerequisites

Make sure the following tools are installed:

- Java 17+ compatible with the project configuration
- Node.js
- npm
- Docker Desktop
- Git

---

### 1. Clone the repository

```bash
git clone https://github.com/AbdullahTurgut/health-platform.git
cd health-platform
```

---

### 2. Start PostgreSQL

From the repository root:

```bash
docker compose up -d
```

Verify the container is running:

```bash
docker compose ps
```

---

### 3. Start the backend

Navigate to the Spring Boot project:

```bash
cd backend/health-platform
```

On Windows:

```bash
mvnw.cmd spring-boot:run
```

On macOS/Linux:

```bash
./mvnw spring-boot:run
```

The backend runs locally through the Spring Boot development server.

Flyway migrations are automatically applied when the application starts.

---

### 4. Start the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The Vite development server is available by default at:

```text
http://localhost:5173
```

---

## Development Commands

### Frontend

Run development server:

```bash
npm run dev
```

Run lint:

```bash
npm run lint
```

Create production build:

```bash
npm run build
```

---

### Backend

Run tests:

```bash
mvnw.cmd test
```

Create package:

```bash
mvnw.cmd clean package
```

On macOS/Linux, replace `mvnw.cmd` with:

```bash
./mvnw
```

---

## Current Project Status

### Core Web MVP

The core full-stack web MVP is implemented.

Current completed areas include:

- Authentication
- User ownership and API security
- Dashboard
- Diseases
- Doctors
- Hospitals
- Visits
- Medical Tests
- Test Results
- Imaging
- Medical Documents
- Medications
- Health Timeline
- Global Search
- User Profile
- Responsive application shell
- Frontend design system
- Accessibility and reduced-motion foundation

The project is currently undergoing final UI, responsive, accessibility, and regression polish.

---

## Roadmap

The current priority is to complete and stabilize the core personal health record experience before expanding the product.

Potential future development areas include:

- Mobile application
- Health record snapshot / PDF export
- Temporary doctor sharing
- OCR for uploaded medical documents
- Advanced analytics
- Reminders and notifications
- Improved audit capabilities
- Account data export and deletion workflows
- Semantic search
- RAG-based personal health record retrieval
- AI-assisted record summarization

### AI Direction

Future AI capabilities are intended to operate only on records owned by the authenticated user.

The planned role of AI is to help users:

- Find relevant historical records
- Summarize existing information
- Navigate large personal health histories
- Understand how their own records are organized

AI features are **not intended to diagnose diseases, prescribe treatment, or replace healthcare professionals.**

---

## Privacy

Health-related data requires special care.

Before any production deployment involving real patient information, the platform will require additional work including:

- Comprehensive security review
- Privacy and legal review
- KVKK / applicable data protection compliance
- Production-grade secret management
- Backup and disaster recovery strategy
- Audit logging
- Data retention policies
- Infrastructure hardening

Development and testing should use synthetic data rather than real medical records.

---

## Testing

The project includes backend automated tests and manual frontend regression testing.

Important test areas include:

- Authentication
- JWT validation
- Resource ownership
- Cross-user isolation
- CRUD operations
- Filtering
- Search
- Timeline aggregation
- File authorization
- Database migrations
- API error handling
- Responsive layouts
- Keyboard navigation
- Reduced-motion behavior

---

## Development Philosophy

Health Platform is being developed with several architectural principles:

1. **Data first**  
   Build a reliable personal health record before introducing intelligent features.

2. **Security by design**  
   Ownership and authorization belong in the backend, not only in the UI.

3. **Explicit database evolution**  
   Flyway owns schema changes.

4. **Simple before distributed**  
   PostgreSQL search is preferred until scale creates a real need for additional search infrastructure.

5. **Web first, mobile ready**  
   Product flows are established on the web while keeping future mobile development in mind.

6. **AI as an assistant, not a clinician**  
   Future AI features should summarize and retrieve user-owned information rather than provide diagnosis or treatment.

---

## Author

**Abdullah Turgut**

Computer Engineer

GitHub: [@AbdullahTurgut](https://github.com/AbdullahTurgut)

---

## Disclaimer

Health Platform is a software development project for personal health record management.

It does not provide medical diagnosis, medical advice, treatment recommendations, or emergency healthcare services.

Always consult qualified healthcare professionals for medical decisions.
