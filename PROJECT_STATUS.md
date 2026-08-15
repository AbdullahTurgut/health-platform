# HEALTH PLATFORM — PROJECT STATUS

**Project:** Health Platform
**Repository:** AbdullahTurgut/health-platform
**Status:** 🟢 Database Foundation / Domain Modeling
**Last Updated:** 15 August 2026

---

# 1. Project Overview

Health Platform, kullanıcıların kişisel sağlık geçmişlerini tek bir platform üzerinden düzenli, aranabilir ve takip edilebilir şekilde yönetmesini amaçlayan web-first ve ileride mobil platforma genişletilecek bir kişisel sağlık takip sistemidir.

Platformun temel amacı:

* Hastalık takibi
* Hastane ziyaretlerinin kaydı
* Doktor bilgilerinin takibi
* Testlerin ve test sonuçlarının saklanması
* MR / CT / X-Ray gibi görüntüleme kayıtlarının yönetilmesi
* Sağlık belgelerinin saklanması
* İlaç takibi
* Sağlık geçmişinin timeline üzerinden görüntülenmesi
* Sağlık kayıtları içerisinde hızlı arama yapılabilmesi

Platform tıbbi teşhis veya tedavi önerisi sunmayı amaçlamaz.

---

# 2. Project Goals

Ana problem:

> Kullanıcıların zaman içerisinde artan hastane ziyaretleri, test sonuçları, görüntüleme raporları ve sağlık belgelerini takip etmekte zorlanması.

Platform bu problemi:

* Merkezi sağlık arşivi
* Hastalık bazlı organizasyon
* Timeline
* Search
* Filtreleme
* Doktor / hastane geçmişi
* Yapılandırılmış test sonuçları
* Sağlık kayıtlarının ilişkisel şekilde tutulması

ile çözmeyi hedeflemektedir.

---

# 3. Product Scope

## MVP

* User registration
* User authentication
* JWT authentication
* Disease management
* Doctor management
* Hospital management
* Hospital visit management
* Medical test management
* Test result management
* Imaging records
* Medical document management
* Medication management
* Health timeline
* Basic search
* Filtering

## Future

* Mobile application
* Push notifications
* Appointment reminders
* Advanced search
* OCR
* AI-assisted document understanding
* AI-powered health record search
* Health trends and analytics
* Family member profiles
* Data export
* Sharing / access permissions

---

# 4. Technology Stack

## Backend

* Java
* Spring Boot
* Spring Data JPA
* Spring Security
* JWT
* PostgreSQL
* Flyway
* Maven
* Validation
* Lombok

## Frontend

Planned:

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Axios

## Infrastructure

* Docker
* Docker Compose
* PostgreSQL

## Future Mobile

Planned:

* React Native
* Expo

---

# 5. Database Domain Model

## Implemented

* User
* Disease
* Doctor
* Hospital
* Visit
* MedicalTest
* TestResult

## Planned

* Imaging
* MedicalDocument
* Medication

Timeline will initially be generated through a service/read-model approach rather than stored as a generic polymorphic database table.

Current relationship model:

```text
User
│
├── Disease
├── Doctor
├── Hospital
├── Visit
│     ├── Disease?
│     ├── Doctor?
│     └── Hospital?
│
└── MedicalTest
      ├── Disease?
      ├── Visit?
      └── TestResult
             ├── parameter_name
             ├── value_text
             ├── numeric_value
             ├── unit
             ├── reference_range
             └── flag
```

---

# 6. Database Architecture Principles

* PostgreSQL is the primary relational database.
* UUID is used for entity identifiers.
* Database schema is managed exclusively through Flyway migrations.
* Applied Flyway migrations are treated as immutable.
* Medical records are scoped to their owning user.
* User medical data must never be accessible by another user.
* Optional historical relationships use `ON DELETE SET NULL` where deleting the related entity must not delete the medical record.
* Parent-child records such as `MedicalTest → TestResult` use cascade deletion where the child has no independent meaning.
* Database constraints are used in addition to application-level validation.
* Sensitive credentials must never be stored in plain text.
* Database credentials are provided through environment variables.
* Production secrets must never be committed to Git.

---

# 7. Database Migration History

## V1 — Init Schema ✅

```text
V1__init_schema.sql
```

Purpose:

* Verify Spring Boot → Flyway → PostgreSQL migration flow.
* Temporary `schema_test` table created.

---

## V2 — Remove Schema Test ✅

```text
V2__remove_schema_test.sql
```

Completed:

* Temporary Flyway validation table removed.

---

## V3 — Users ✅

```text
V3__create_users.sql
```

Implemented:

* UUID primary key
* First name
* Last name
* Unique email
* Password hash
* Date of birth
* Enabled flag
* Created timestamp
* Updated timestamp

Verified:

* UUID generation
* Unique email constraint
* Duplicate email rejection
* Timestamp defaults

---

## V4 — Diseases ✅

```text
V4__create_diseases.sql
```

Implemented:

* User ownership
* Disease name
* Diagnosis date
* Disease status
* Description
* User foreign key
* User index
* Status constraint

Relationship:

```text
User 1 ─── N Disease
```

Verified:

* Foreign key enforcement
* Disease status validation
* User → Disease query
* Cascade cleanup

---

## V5 — Doctors ✅

```text
V5__create_doctors.sql
```

Implemented:

* User ownership
* Doctor name
* Specialization
* Contact information
* Notes
* Search-oriented indexes

Relationship:

```text
User 1 ─── N Doctor
```

---

## V6 — Hospitals ✅

```text
V6__create_hospitals.sql
```

Implemented:

* User ownership
* Hospital name
* City
* Address
* Phone
* Notes
* User / name / city indexes

Relationship:

```text
User 1 ─── N Hospital
```

---

## V7 — Visits ✅

```text
V7__create_visits.sql
```

Implemented:

* User ownership
* Optional Disease relationship
* Optional Doctor relationship
* Optional Hospital relationship
* Visit date
* Department
* Reason
* Diagnosis note
* Notes

Relationships:

```text
Disease 1 ─── N Visit
Doctor 1 ─── N Visit
Hospital 1 ─ N Visit
```

Historical relationships use:

```text
ON DELETE SET NULL
```

so deleting a Disease, Doctor, or Hospital does not delete the Visit record.

Verified:

* Disease → Doctor query through Visit
* Disease → Hospital query through Visit
* Doctor → Disease query through Visit
* Nullable foreign keys
* SET NULL behavior
* User cascade cleanup

---

## V8 — Medical Tests ✅

```text
V8__create_medical_tests.sql
```

Implemented:

* User ownership
* Optional Disease relationship
* Optional Visit relationship
* Test name
* Test category
* Test date
* Laboratory
* Notes
* Search and timeline indexes

Relationships:

```text
User 1 ─── N MedicalTest
Disease 1 ─── N MedicalTest
Visit 1 ─── N MedicalTest
```

Supported categories currently include:

* BLOOD
* URINE
* HORMONE
* BIOCHEMISTRY
* GENETIC
* PATHOLOGY
* MICROBIOLOGY
* OTHER

Verified:

* Category constraint
* Disease `SET NULL`
* Visit `SET NULL`
* User ownership

---

## V9 — Test Results ✅

```text
V9__create_test_results.sql
```

Implemented:

* MedicalTest ownership
* Parameter name
* Text value
* Numeric value
* Unit
* Reference range
* Result flag
* Notes

Relationship:

```text
MedicalTest 1 ─── N TestResult
```

Result values support both numeric and textual medical results.

Examples:

```text
Hemoglobin → 13.5
PCR → Negative
Marker → <5
```

`numeric_value` exists to support future result trends and analytics.

Supported flags currently include:

* NORMAL
* LOW
* HIGH
* CRITICAL
* ABNORMAL
* POSITIVE
* NEGATIVE
* UNKNOWN

Verified:

* Numeric results
* Text results
* Result flag constraint
* Parameter search
* Parent test cascade deletion
* Complete Patient → Disease → Visit → MedicalTest → TestResult relationship

---

# 8. Current Database State

Current implemented schema:

```text
health_platform
│
├── flyway_schema_history
├── users
├── diseases
├── doctors
├── hospitals
├── visits
├── medical_tests
└── test_results
```

Current domain flow:

```text
User
 │
 ├── Disease
 │
 ├── Doctor
 │
 ├── Hospital
 │
 └── Visit
       │
       └── MedicalTest
               │
               └── TestResult
```

Medical tests can also directly reference their owning User and optional Disease.

---

# 9. Completed Steps

## STEP 1 — PostgreSQL Foundation ✅

* Docker PostgreSQL container
* PostgreSQL database
* Persistent Docker volume
* Database connection
* DBeaver verification
* PostgreSQL health check

---

## STEP 2-A — Spring Boot Foundation ✅

* Spring Boot application
* Maven
* Spring Web
* Spring Data JPA
* PostgreSQL Driver
* Flyway
* Validation
* Lombok
* PostgreSQL connection
* Health endpoint

Health endpoint:

```text
GET /api/health
```

Response:

```text
Health Platform API is running
```

---

## STEP 2-B — Database Schema 🟡 IN PROGRESS

Completed:

* Flyway infrastructure
* Users
* User → Disease
* Doctors
* Hospitals
* Visits
* Medical Tests
* Test Results
* Foreign key behavior
* Database constraints
* Initial indexes
* Relationship verification

Next:

```text
Imaging
    ↓
Medical Documents
    ↓
Medications
```

---

# 10. Important Architectural Decisions

## Timeline

Timeline will not initially be stored as a polymorphic database table.

Instead:

```text
Visits
Medical Tests
Imaging
Documents
Medications
        ↓
Timeline Service
        ↓
Unified Timeline Response
```

This keeps relational integrity intact.

---

## User Data Ownership

User-owned resources must always be queried using the authenticated user's identity.

Expected repository pattern:

```text
findByIdAndUserId(...)
```

rather than unrestricted:

```text
findById(...)
```

for user-owned health resources.

---

## Historical Record Preservation

Deleting related metadata should not unnecessarily destroy historical medical records.

For example:

```text
Doctor DELETE
     ↓
Visit.doctor_id = NULL
```

rather than deleting the Visit.

The same principle currently applies to Disease / Visit relationships used by medical tests.

---

## Test Result Modeling

Medical results may be:

* Numeric
* Textual
* Positive / negative
* Threshold based

Therefore TestResult stores:

```text
value_text
numeric_value
```

separately.

This keeps raw/display information while allowing future numeric analytics.

---

# 11. Project Milestones

* [x] Project concept
* [x] Product specification v0.1
* [x] ER model
* [x] PostgreSQL setup
* [x] Spring Boot foundation
* [x] Flyway foundation
* [x] User database schema
* [x] Disease database schema
* [x] Doctor database schema
* [x] Hospital database schema
* [x] Visit database schema
* [x] Medical test database schema
* [x] Test result database schema
* [ ] Imaging database schema
* [ ] Medical document database schema
* [ ] Medication database schema
* [ ] JPA entity layer
* [ ] User domain module
* [ ] Authentication
* [ ] JWT
* [ ] Disease API
* [ ] Doctor API
* [ ] Hospital API
* [ ] Visit API
* [ ] Medical Test API
* [ ] Test Result API
* [ ] Timeline
* [ ] Search
* [ ] Web frontend
* [ ] Mobile application
* [ ] AI features

---

# 12. Current Development Phase

**Phase:** Backend Foundation / Database Modeling

**Current Step:** STEP 2-B

**Completed Through:** Flyway V9

**Next Immediate Task:**

```text
V10
 ↓
Imaging
 ↓
Disease / Visit / Doctor / Hospital relationships
```

Following:

```text
V11 → Medical Documents
V12 → Medications
```

After the database foundation is complete:

```text
Database Schema
      ↓
Spring JPA Entities
      ↓
Repositories
      ↓
Authentication
      ↓
Domain APIs
```

---

# 13. Development Strategy

Each major step follows:

1. Design the domain relationship.
2. Create Flyway migration.
3. Start the application.
4. Verify migration history.
5. Inspect the schema through DBeaver.
6. Test foreign keys and constraints.
7. Test deletion behavior.
8. Remove synthetic test data.
9. Commit code.
10. Update project documentation when the project state materially changes.
11. Push to GitHub.

---

# 14. Status Legend

🟢 Completed
🟡 In Progress
⚪ Planned
🔴 Blocked
