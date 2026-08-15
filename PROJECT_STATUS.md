# HEALTH PLATFORM — PROJECT STATUS

**Project:** Health Platform
**Repository:** AbdullahTurgut/health-platform
**Status:** 🟢 Database Foundation Complete / JPA Entity Layer Next
**Last Updated:** 15 August 2026

---

# 1. Project Overview

Health Platform, kullanıcıların kişisel sağlık geçmişlerini tek bir platform üzerinden düzenli, aranabilir ve takip edilebilir şekilde yönetmesini amaçlayan web-first ve ileride mobil platforma genişletilecek bir kişisel sağlık takip sistemidir.

Platformun temel amacı:

- Hastalık takibi
- Hastane ziyaretlerinin kaydı
- Doktor bilgilerinin takibi
- Testlerin ve test sonuçlarının saklanması
- MR / CT / X-Ray gibi görüntüleme kayıtlarının yönetilmesi
- Sağlık belgelerinin saklanması
- İlaç kullanım geçmişinin takibi
- Sağlık geçmişinin timeline üzerinden görüntülenmesi
- Sağlık kayıtları içerisinde hızlı arama yapılabilmesi

Platform tıbbi teşhis veya tedavi önerisi sunmayı amaçlamaz.

---

# 2. Core Product Goal

Ana problem:

> Kullanıcıların zaman içerisinde artan hastane ziyaretleri, test sonuçları, görüntüleme raporları, ilaç kayıtları ve sağlık belgelerini takip etmekte zorlanması.

Platform bu problemi:

- Merkezi sağlık arşivi
- Hastalık bazlı organizasyon
- Yapılandırılmış test sonuçları
- Doktor ve hastane geçmişi
- Görüntüleme kayıtları
- Belge arşivi
- İlaç geçmişi
- Timeline
- Global search
- Filtreleme

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
- Visit management
- Medical test management
- Test result management
- Imaging management
- Medical document management
- Medication management
- Health timeline
- Global search
- Filtering
- User profile

## Future

- Mobile application
- Push notifications
- Appointment / control reminders
- Advanced health analytics
- Test result trend charts
- Health Snapshot
- PDF health summary export
- OCR
- AI-assisted document understanding
- AI-powered health record search
- RAG / Knowledge Layer
- Doctor Share
- Temporary read-only health record sharing
- Family profiles
- External healthcare integrations

---

# 4. Technology Stack

## Backend

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- PostgreSQL
- Flyway
- Maven
- Bean Validation
- Lombok

Planned:

- Spring Security
- JWT Authentication

## Frontend

Planned:

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- Axios

## Infrastructure

- Docker
- Docker Compose
- PostgreSQL

## File Storage

Development:

- Local file storage

Production target:

- S3-compatible object storage

## Future Mobile

- React Native
- Expo
- TypeScript

---

# 5. Repository Structure

```text
health-platform/
│
├── backend/
│   └── health-platform/
│       ├── src/
│       │   ├── main/
│       │   │   ├── java/
│       │   │   │   └── com/healthplatform/
│       │   │   │
│       │   │   └── resources/
│       │   │       ├── application.yml
│       │   │       │
│       │   │       └── db/
│       │   │           └── migration/
│       │   │               ├── V1__init_schema.sql
│       │   │               ├── V2__remove_schema_test.sql
│       │   │               ├── V3__create_users.sql
│       │   │               ├── V4__create_diseases.sql
│       │   │               ├── V5__create_doctors.sql
│       │   │               ├── V6__create_hospitals.sql
│       │   │               ├── V7__create_visits.sql
│       │   │               ├── V8__create_medical_tests.sql
│       │   │               ├── V9__create_test_results.sql
│       │   │               ├── V10__create_imaging.sql
│       │   │               ├── V11__create_medical_documents.sql
│       │   │               └── V12__create_medications.sql
│       │   │
│       │   └── test/
│       │
│       └── pom.xml
│
├── frontend/
├── docker-compose.yml
├── .env
├── .gitignore
└── PROJECT_STATUS.md
```

---

# 6. Database Foundation

## Status

🟢 **COMPLETE**

PostgreSQL database:

```text
health_platform
```

Database runs through Docker with persistent volume storage.

Database schema is managed exclusively through Flyway.

Current migration state:

```text
V1 → V12
```

All migrations have been successfully applied and verified through PostgreSQL / DBeaver.

---

# 7. Implemented Database Domain

The following domain tables are implemented:

- `users`
- `diseases`
- `doctors`
- `hospitals`
- `visits`
- `medical_tests`
- `test_results`
- `imaging`
- `medical_documents`
- `medications`

Infrastructure table:

- `flyway_schema_history`

---

# 8. Migration History

## V1 — Flyway Foundation ✅

```text
V1__init_schema.sql
```

Purpose:

- Verify Spring Boot → Flyway → PostgreSQL migration flow.
- Temporary `schema_test` table created.

---

## V2 — Remove Schema Test ✅

```text
V2__remove_schema_test.sql
```

Temporary Flyway validation table removed.

Migration immutability strategy established.

---

## V3 — Users ✅

```text
V3__create_users.sql
```

Implemented:

- UUID primary key
- First name
- Last name
- Unique email
- Password hash
- Date of birth
- Enabled status
- Creation timestamp
- Update timestamp

Verified:

- UUID generation
- UNIQUE email constraint
- Duplicate email rejection
- Timestamp behavior

---

## V4 — Diseases ✅

```text
V4__create_diseases.sql
```

Implemented:

- User ownership
- Disease name
- Diagnosis date
- Disease status
- Description
- Foreign key
- User index
- Status constraint

Relationship:

```text
User 1 ─── N Disease
```

Verified:

- Foreign key enforcement
- Invalid status rejection
- User → Disease query
- User cascade cleanup

---

## V5 — Doctors ✅

```text
V5__create_doctors.sql
```

Implemented:

- User ownership
- Doctor name
- Specialization
- Contact information
- Notes
- Search-oriented indexes

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

- User ownership
- Hospital name
- City
- Address
- Phone
- Notes
- Search-oriented indexes

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

- User ownership
- Optional Disease
- Optional Doctor
- Optional Hospital
- Visit date
- Department
- Reason
- Diagnosis note
- Notes

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

Verified:

- Disease → Doctor through Visit
- Disease → Hospital through Visit
- Doctor → Disease through Visit
- Nullable relationships
- SET NULL behavior
- User cascade cleanup

---

## V8 — Medical Tests ✅

```text
V8__create_medical_tests.sql
```

Implemented:

- User ownership
- Optional Disease
- Optional Visit
- Test name
- Category
- Test date
- Laboratory
- Notes

Relationships:

```text
User 1 ─── N MedicalTest

Disease 1 ─── N MedicalTest

Visit 1 ─── N MedicalTest
```

Supported categories:

- BLOOD
- URINE
- HORMONE
- BIOCHEMISTRY
- GENETIC
- PATHOLOGY
- MICROBIOLOGY
- OTHER

Verified:

- Category constraint
- Visit SET NULL
- Disease SET NULL
- User cascade behavior

---

## V9 — Test Results ✅

```text
V9__create_test_results.sql
```

Implemented:

- MedicalTest ownership
- Parameter name
- Text value
- Numeric value
- Unit
- Reference range
- Result flag
- Notes

Relationship:

```text
MedicalTest 1 ─── N TestResult
```

Result modeling supports:

```text
Hemoglobin → 13.5

PCR → Negative

Marker → <5
```

`numeric_value` exists separately from `value_text` to support future:

- Trend charts
- Analytics
- Historical comparison

Supported flags:

- NORMAL
- LOW
- HIGH
- CRITICAL
- ABNORMAL
- POSITIVE
- NEGATIVE
- UNKNOWN

Verified:

- Numeric result
- Text result
- Invalid flag rejection
- Parent MedicalTest cascade
- Parameter querying
- Complete health record JOIN

---

## V10 — Imaging ✅

```text
V10__create_imaging.sql
```

Implemented:

- User ownership
- Optional Disease
- Optional Visit
- Optional Doctor
- Optional Hospital
- Imaging type
- Body part
- Imaging date
- Report text
- Notes

Supported types:

- MRI
- CT
- ULTRASOUND
- XRAY
- PET
- MAMMOGRAPHY
- OTHER

Relationships:

```text
User 1 ─── N Imaging

Disease 1 ─── N Imaging

Visit 1 ─── N Imaging

Doctor 1 ─── N Imaging

Hospital 1 ─── N Imaging
```

Verified:

- Standalone imaging records
- Invalid type rejection
- Disease SET NULL
- Visit SET NULL
- Doctor SET NULL
- Hospital SET NULL
- User cascade cleanup
- Full Imaging JOIN

---

## V11 — Medical Documents ✅

```text
V11__create_medical_documents.sql
```

Implemented:

- User ownership
- Optional Disease
- Optional Visit
- Optional MedicalTest
- Optional Imaging
- Display name
- Document type
- Original file name
- Storage key
- MIME type
- File size
- Upload timestamp

Supported document types:

- LAB_REPORT
- IMAGING_REPORT
- PRESCRIPTION
- EPICRISIS
- DOCTOR_NOTE
- DISCHARGE_SUMMARY
- PATHOLOGY_REPORT
- OTHER

Relationships:

```text
User 1 ─── N MedicalDocument

Disease 1 ─── N MedicalDocument

Visit 1 ─── N MedicalDocument

MedicalTest 1 ─── N MedicalDocument

Imaging 1 ─── N MedicalDocument
```

Verified:

- Standalone document
- MedicalTest report
- Imaging report
- File size constraint
- Document type constraint
- Disease SET NULL
- Visit SET NULL
- MedicalTest SET NULL
- Imaging SET NULL
- User cascade cleanup

---

## V12 — Medications ✅

```text
V12__create_medications.sql
```

Implemented:

- User ownership
- Optional Disease
- Medication name
- Dosage
- Frequency
- Administration route
- Start date
- End date
- Medication status
- Prescriber text
- Notes

Relationships:

```text
User 1 ─── N Medication

Disease 1 ─── N Medication
```

Supported statuses:

- ACTIVE
- COMPLETED
- DISCONTINUED
- PAUSED

Supported routes:

- ORAL
- TOPICAL
- INJECTION
- INHALATION
- SUBLINGUAL
- OTHER

Verified:

- Disease-bound medication
- Standalone medication
- Completed medication
- Invalid status rejection
- Invalid route rejection
- Invalid date rejection
- Disease SET NULL
- User cascade cleanup

---

# 9. Current Relational Model

```text
                              USER
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
          ▼                    ▼                    ▼
      DISEASE               DOCTOR              HOSPITAL
          │                    │                    │
          └────────────────────┼────────────────────┘
                               │
                               ▼
                             VISIT
                          ┌─────┴─────┐
                          │           │
                          ▼           ▼
                    MEDICAL TEST    IMAGING
                          │           │
                          ▼           │
                     TEST RESULT      │
                                      │
                          ┌───────────┘
                          ▼
                  MEDICAL DOCUMENT


USER
 │
 └── MEDICATION
       │
       └── Disease?


MEDICAL DOCUMENT
 ├── Disease?
 ├── Visit?
 ├── MedicalTest?
 └── Imaging?
```

---

# 10. Core Database Architecture Decisions

## UUID Identifiers

All primary domain identifiers use UUID.

Goals:

- Avoid sequential public IDs
- Improve API identifier safety
- Support future distributed architecture
- Work cleanly across web and mobile clients

---

## Flyway Migration Discipline

Database schema changes are performed exclusively through Flyway.

Applied migrations are treated as immutable.

Example:

```text
V12 applied
     ↓
new schema requirement
     ↓
V13 migration
```

Existing migration files must not be modified after successful application.

---

## User Ownership

Every major health record is associated with its owning User.

Expected application-level repository strategy:

```text
findByIdAndUserId(...)
```

instead of unrestricted:

```text
findById(...)
```

for user-owned resources.

---

## Historical Record Preservation

Health records should not disappear simply because a related organizational record is deleted.

Example:

```text
Doctor DELETE
      ↓
Visit.doctor_id = NULL
```

rather than:

```text
Doctor DELETE
      ↓
Visit DELETE
```

`ON DELETE SET NULL` is therefore used for optional historical relationships.

---

## Parent-Child Cascades

Child entities with no independent domain meaning may cascade.

Example:

```text
MedicalTest
     ↓ DELETE
TestResult
```

TestResult has no independent meaning without its MedicalTest.

---

## Medical Result Modeling

Test results may be numeric or textual.

Therefore:

```text
value_text
numeric_value
```

are stored separately.

This supports both:

```text
PCR → Negative
```

and:

```text
TSH → 2.31
```

while preserving future analytics capability.

---

## Document Storage

Binary medical files are not stored directly inside PostgreSQL.

Database stores:

```text
metadata
+
storage_key
```

while actual file storage will be handled by a dedicated storage service.

Planned architecture:

```text
MedicalDocument
      ↓
StorageService
      ↓
Local Storage / S3-compatible Storage
```

Document access must later pass through authenticated ownership checks.

---

## Timeline

No generic polymorphic `timeline_events` database table is currently used.

Timeline will initially be produced through aggregation:

```text
Visits
MedicalTests
Imaging
MedicalDocuments
Medications
       ↓
TimelineService
       ↓
Unified Timeline DTO
       ↓
sort by event date
```

This avoids weak `reference_id + type` database relationships.

---

# 11. Search Foundation

Current database design already supports future search across:

```text
Diseases
Doctors
Hospitals
Visits
MedicalTests
TestResults
Imaging
MedicalDocuments
Medications
```

Examples:

```text
"MR"

"TSH"

"Dr. Ahmet"

"Migren"

"Epikriz"

"Levothyroxine"
```

Initial search can use PostgreSQL queries.

Advanced search infrastructure will be evaluated only when necessary.

---

# 12. Completed Development Phases

## Product Specification ✅

- Product vision
- MVP scope
- Core modules
- Long-term roadmap
- AI boundary
- Mobile roadmap

---

## ER Modeling ✅

- Core entities
- Ownership relationships
- Historical relationships
- Parent-child relationships
- Timeline strategy
- Document storage strategy

---

## STEP 1 — PostgreSQL Foundation ✅

Completed:

- Docker PostgreSQL
- Persistent Docker volume
- `health_platform` database
- Database health verification
- DBeaver connection

---

## STEP 2-A — Spring Boot Foundation ✅

Completed:

- Spring Boot project
- Maven
- Spring Web
- Spring Data JPA
- PostgreSQL Driver
- Flyway
- Bean Validation
- Lombok
- Database connection
- API startup

Health endpoint:

```text
GET /api/health
```

Response:

```text
Health Platform API is running
```

---

## STEP 2-B — Database Schema ✅

**Status: COMPLETE**

Completed through:

```text
Flyway V12
```

Implemented:

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

Verified:

- Foreign keys
- CHECK constraints
- UUID generation
- UNIQUE constraints
- Nullable relationships
- SET NULL behavior
- Cascade behavior
- Date constraints
- Result modeling
- Document metadata
- Relevant indexes
- Full relationship JOIN queries
- Synthetic test-data cleanup

---

# 13. Current Milestones

- [x] Project concept
- [x] Product Specification v0.1
- [x] Initial ER model
- [x] GitHub repository
- [x] PostgreSQL Docker setup
- [x] Spring Boot foundation
- [x] Flyway infrastructure
- [x] User schema
- [x] Disease schema
- [x] Doctor schema
- [x] Hospital schema
- [x] Visit schema
- [x] Medical Test schema
- [x] Test Result schema
- [x] Imaging schema
- [x] Medical Document schema
- [x] Medication schema
- [x] Database foundation
- [ ] JPA BaseEntity
- [ ] JPA enums
- [ ] User JPA entity
- [ ] Disease JPA entity
- [ ] Doctor JPA entity
- [ ] Hospital JPA entity
- [ ] Visit JPA entity
- [ ] MedicalTest JPA entity
- [ ] TestResult JPA entity
- [ ] Imaging JPA entity
- [ ] MedicalDocument JPA entity
- [ ] Medication JPA entity
- [ ] Repository layer
- [ ] Authentication
- [ ] JWT
- [ ] Disease API
- [ ] Doctor API
- [ ] Hospital API
- [ ] Visit API
- [ ] Medical Test API
- [ ] Test Result API
- [ ] Imaging API
- [ ] Document API
- [ ] Medication API
- [ ] Timeline
- [ ] Global Search
- [ ] Dashboard
- [ ] Web frontend
- [ ] Mobile application
- [ ] AI layer

---

# 14. Current Development Phase

**Previous Phase:** Database Foundation ✅

**Current Phase:** Spring JPA Entity Layer

**Current Step:**

```text
STEP 3
Spring JPA Entity Layer
```

Planned order:

```text
BaseEntity
     ↓
Enums
     ↓
User
     ↓
Disease
     ↓
Doctor
     ↓
Hospital
     ↓
Visit
     ↓
MedicalTest
     ↓
TestResult
     ↓
Imaging
     ↓
MedicalDocument
     ↓
Medication
```

---

# 15. Next Immediate Task

## STEP 3-A — BaseEntity + Shared Enums

First Java domain foundation:

```text
common/
└── entity/
    └── BaseEntity.java
```

Then shared/domain enums:

```text
DiseaseStatus
TestCategory
ResultFlag
ImagingType
DocumentType
MedicationStatus
MedicationRoute
```

After the common foundation is verified:

```text
User Entity
    ↓
Disease Entity
```

will become the first JPA relationship implementation.

---

# 16. Development Strategy

Each major backend step follows:

1. Design or review the relationship.
2. Implement the smallest logical unit.
3. Compile the project.
4. Start the application.
5. Verify Hibernate/Flyway compatibility.
6. Test persistence behavior.
7. Test API behavior when applicable.
8. Verify the database through DBeaver when necessary.
9. Update documentation at meaningful milestones.
10. Commit.
11. Push.
12. Continue to the next step.

---

# 17. Current Project Checkpoint

```text
Product Specification      ✅
        ↓
ER Model                   ✅
        ↓
PostgreSQL                 ✅
        ↓
Spring Boot Foundation     ✅
        ↓
Flyway                     ✅
        ↓
Database Schema V1-V12     ✅
        ↓
JPA Entity Layer           ← NEXT
        ↓
Repositories
        ↓
Authentication / JWT
        ↓
Domain Services & APIs
        ↓
Timeline
        ↓
Search
        ↓
Dashboard
        ↓
React Web
        ↓
Mobile
        ↓
Future AI Layer
```

---

# 18. Status Legend

🟢 Completed
🟡 In Progress
⚪ Planned
🔴 Blocked
