**# HEALTH PLATFORM — PROJECT STATUS**

**\*\*Project:\*\*** Health Platform  
**\*\*Repository:\*\*** AbdullahTurgut/health-platform  
**\*\*Status:\*\*** 🟡 Backend MVP Complete / Frontend Domain Integration In Progress  
**\*\*Last Updated:\*\*** 20 August 2026

**---**

**# 1. Project Overview**

Health Platform, kullanıcıların kişisel sağlık geçmişlerini tek bir platform üzerinden düzenli, aranabilir ve takip edilebilir şekilde yönetmesini amaçlayan web-first ve ileride mobil platforma genişletilecek bir kişisel sağlık takip sistemidir.

Platformun temel amacı:

\- Hastalık takibi
\- Hastane ziyaretlerinin kaydı
\- Doktor bilgilerinin takibi
\- Testlerin ve test sonuçlarının saklanması
\- MR / CT / X-Ray gibi görüntüleme kayıtlarının yönetilmesi
\- Sağlık belgelerinin saklanması
\- İlaç kullanım geçmişinin takibi
\- Sağlık geçmişinin timeline üzerinden görüntülenmesi
\- Sağlık kayıtları içerisinde hızlı arama yapılabilmesi

Platform tıbbi teşhis veya tedavi önerisi sunmayı amaçlamaz.

**---**

**# 2. Core Product Goal**

Ana problem:

\> Kullanıcıların zaman içerisinde artan hastane ziyaretleri, test sonuçları, görüntüleme raporları, ilaç kayıtları ve sağlık belgelerini takip etmekte zorlanması.

Platform bu problemi:

\- Merkezi sağlık arşivi
\- Hastalık bazlı organizasyon
\- Yapılandırılmış test sonuçları
\- Doktor ve hastane geçmişi
\- Görüntüleme kayıtları
\- Belge arşivi
\- İlaç geçmişi
\- Timeline
\- Global search
\- Filtreleme

ile çözmeyi hedeflemektedir.

**---**

**# 3. Product Scope**

**## MVP**

\- User registration
\- User authentication
\- JWT authentication
\- Disease management
\- Doctor management
\- Hospital management
\- Visit management
\- Medical test management
\- Test result management
\- Imaging management
\- Medical document management
\- Medication management
\- Health timeline
\- Global search
\- Filtering
\- User profile

**## Future**

\- Mobile application
\- Push notifications
\- Appointment / control reminders
\- Advanced health analytics
\- Test result trend charts
\- Health Snapshot
\- PDF health summary export
\- OCR
\- AI-assisted document understanding
\- AI-powered health record search
\- RAG / Knowledge Layer
\- Doctor Share
\- Temporary read-only health record sharing
\- Family profiles
\- External healthcare integrations

**---**

**# 4. Technology Stack**

**## Backend**

\- Java
\- Spring Boot
\- Spring Web
\- Spring Data JPA
\- Hibernate
\- PostgreSQL
\- Flyway
\- Maven
\- Bean Validation
\- Lombok
\- Spring Security
\- JWT Authentication
\- JJWT
\- BCrypt password hashing
\- Local file storage abstraction
\- Global exception handling
\- User-scoped ownership enforcement

**## Frontend**

Implemented:

\- React
\- TypeScript
\- Vite
\- Tailwind CSS v4
\- shadcn/ui
\- React Router
\- Axios
\- Lucide React
\- Centralized API client
\- Auth Context / Provider
\- Protected and public-only route guards
\- Responsive application shell
\- Mobile navigation via Sheet
\- Turkish-first UI text foundation

**## Infrastructure**

\- Docker
\- Docker Compose
\- PostgreSQL

**## File Storage**

Development:

\- Local file storage

Production target:

\- S3-compatible object storage

**## Future Mobile**

\- React Native
\- Expo
\- TypeScript

**---**

**# 5. Repository Structure**

\`\`\`text
health-platform/
│
├── backend/
│   └── health-platform/
│       ├── src/
│       │   ├── main/
│       │   │   ├── java/
│       │   │   │   └── com/healthplatform/healthplatform/
│       │   │   └── resources/
│       │   │       ├── application.yml
│       │   │       └── db/
│       │   │           └── migration/
│       │   │               ├── V1\_\_init\_schema.sql
│       │   │               ├── V2\_\_remove\_schema\_test.sql
│       │   │               ├── V3\_\_create\_users.sql
│       │   │               ├── V4\_\_create\_diseases.sql
│       │   │               ├── V5\_\_create\_doctors.sql
│       │   │               ├── V6\_\_create\_hospitals.sql
│       │   │               ├── V7\_\_create\_visits.sql
│       │   │               ├── V8\_\_create\_medical\_tests.sql
│       │   │               ├── V9\_\_create\_test\_results.sql
│       │   │               ├── V10\_\_create\_imaging.sql
│       │   │               ├── V11\_\_create\_medical\_documents.sql
│       │   │               └── V12\_\_create\_medications.sql
│       │   └── test/
│       └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── auth/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── dashboard/
│   │   │   ├── forms/
│   │   │   └── ui/
│   │   ├── config/
│   │   ├── hooks/
│   │   ├── i18n/
│   │   ├── layouts/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   ├── index.html
│   └── package.json
│
├── docker-compose.yml
├── .env
├── .gitignore
└── PROJECT\_STATUS.md
\`\`\`

**---**

**# 6. Database Foundation**

**## Status**

🟢 **\*\*COMPLETE\*\***

PostgreSQL database:

\`\`\`text
health\_platform
\`\`\`

Database runs through Docker with persistent volume storage.

Database schema is managed exclusively through Flyway.

Current migration state:

\`\`\`text
V1 → V12
\`\`\`

All migrations have been successfully applied and verified through PostgreSQL / DBeaver.

**---**

**# 7. Implemented Database Domain**

The following domain tables are implemented:

\- \`users\`
\- \`diseases\`
\- \`doctors\`
\- \`hospitals\`
\- \`visits\`
\- \`medical\_tests\`
\- \`test\_results\`
\- \`imaging\`
\- \`medical\_documents\`
\- \`medications\`

Infrastructure table:

\- \`flyway\_schema\_history\`

**---**

**# 8. Migration History**

**## V1 — Flyway Foundation ✅**

\`V1\_\_init\_schema.sql\`

\- Verified Spring Boot → Flyway → PostgreSQL migration flow.
\- Temporary \`schema\_test\` table created.

**## V2 — Remove Schema Test ✅**

\`V2\_\_remove\_schema\_test.sql\`

\- Temporary Flyway validation table removed.
\- Migration immutability strategy established.

**## V3 — Users ✅**

\`V3\_\_create\_users.sql\`

Implemented:

\- UUID primary key
\- First name
\- Last name
\- Unique email
\- Password hash
\- Date of birth
\- Enabled status
\- Creation timestamp
\- Update timestamp

Verified:

\- UUID generation
\- UNIQUE email constraint
\- Duplicate email rejection
\- Timestamp behavior

**## V4 — Diseases ✅**

Implemented:

\- User ownership
\- Disease name
\- Diagnosis date
\- Disease status
\- Description
\- Foreign key
\- User index
\- Status constraint

Relationship:

\`\`\`text
User 1 ─── N Disease
\`\`\`

Verified:

\- Foreign key enforcement
\- Invalid status rejection
\- User → Disease query
\- User cascade cleanup

**## V5 — Doctors ✅**

Implemented:

\- User ownership
\- Doctor name
\- Specialization
\- Contact information
\- Notes
\- Search-oriented indexes

Relationship:

\`\`\`text
User 1 ─── N Doctor
\`\`\`

**## V6 — Hospitals ✅**

Implemented:

\- User ownership
\- Hospital name
\- City
\- Address
\- Phone
\- Notes
\- Search-oriented indexes

Relationship:

\`\`\`text
User 1 ─── N Hospital
\`\`\`

**## V7 — Visits ✅**

Implemented:

\- User ownership
\- Optional Disease
\- Optional Doctor
\- Optional Hospital
\- Visit date
\- Department
\- Reason
\- Diagnosis note
\- Notes

Relationships:

\`\`\`text
Disease 1 ─── N Visit
Doctor 1 ─── N Visit
Hospital 1 ─ N Visit
\`\`\`

Historical relationships use \`ON DELETE SET NULL\`.

**## V8 — Medical Tests ✅**

Implemented:

\- User ownership
\- Optional Disease
\- Optional Visit
\- Test name
\- Category
\- Test date
\- Laboratory
\- Notes

Supported categories:

\- BLOOD
\- URINE
\- HORMONE
\- BIOCHEMISTRY
\- GENETIC
\- PATHOLOGY
\- MICROBIOLOGY
\- OTHER

**## V9 — Test Results ✅**

Implemented:

\- MedicalTest ownership
\- Parameter name
\- Text value
\- Numeric value
\- Unit
\- Reference range
\- Result flag
\- Notes

Relationship:

\`\`\`text
MedicalTest 1 ─── N TestResult
\`\`\`

Supported flags:

\- NORMAL
\- LOW
\- HIGH
\- CRITICAL
\- ABNORMAL
\- POSITIVE
\- NEGATIVE
\- UNKNOWN

\`numeric\_value\` exists separately from \`value\_text\` to support future trend charts, analytics and historical comparison.

**## V10 — Imaging ✅**

Implemented:

\- User ownership
\- Optional Disease
\- Optional Visit
\- Optional Doctor
\- Optional Hospital
\- Imaging type
\- Body part
\- Imaging date
\- Report text
\- Notes

Supported types:

\- MRI
\- CT
\- ULTRASOUND
\- XRAY
\- PET
\- MAMMOGRAPHY
\- OTHER

**## V11 — Medical Documents ✅**

Implemented:

\- User ownership
\- Optional Disease
\- Optional Visit
\- Optional MedicalTest
\- Optional Imaging
\- Display name
\- Document type
\- Original file name
\- Storage key
\- MIME type
\- File size
\- Upload timestamp

Supported document types:

\- LAB\_REPORT
\- IMAGING\_REPORT
\- PRESCRIPTION
\- EPICRISIS
\- DOCTOR\_NOTE
\- DISCHARGE\_SUMMARY
\- PATHOLOGY\_REPORT
\- OTHER

**## V12 — Medications ✅**

Implemented:

\- User ownership
\- Optional Disease
\- Medication name
\- Dosage
\- Frequency
\- Administration route
\- Start date
\- End date
\- Medication status
\- Prescriber text
\- Notes

Supported statuses:

\- ACTIVE
\- COMPLETED
\- DISCONTINUED
\- PAUSED

Supported routes:

\- ORAL
\- TOPICAL
\- INJECTION
\- INHALATION
\- SUBLINGUAL
\- OTHER

**---**

**# 9. Current Relational Model**

\`\`\`text
                              USER
                               │
           ┌────────────────────┼────────────────────┐
           │                    │                    │
           ▼                    ▼                    ▼
       DISEASE               DOCTOR              HOSPITAL
           │                    │                    │
           └────────────────────┼────────────────────┘
                                │
                                ▼
                              VISIT
                            ┌─────┴─────┐
                            │           │
                            ▼           ▼
                      MEDICAL TEST    IMAGING
                            │           │
                            ▼           │
                       TEST RESULT      │
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
\`\`\`

**---**

**# 10. Core Architecture Decisions**

**## UUID Identifiers**

All primary domain identifiers use UUID.

Goals:

\- Avoid sequential public IDs
\- Improve API identifier safety
\- Support future distributed architecture
\- Work cleanly across web and mobile clients

**## Flyway Migration Discipline**

Database schema changes are performed exclusively through Flyway.

Applied migrations are treated as immutable.

\`\`\`text
V12 applied
     ↓
new schema requirement
     ↓
V13 migration
\`\`\`

Existing migration files must not be modified after successful application.

**## User Ownership**

Every major health record is associated with its owning User.

Expected application-level repository strategy:

\`\`\`text
findByIdAndUserId(...)
\`\`\`

instead of unrestricted \`findById(...)\` for user-owned resources.

**## Historical Record Preservation**

Health records should not disappear simply because a related organizational record is deleted.

Example:

\`\`\`text
Doctor DELETE
      ↓
Visit.doctor\_id = NULL
\`\`\`

\`ON DELETE SET NULL\` is used for optional historical relationships.

**## Parent-Child Cascades**

Child entities with no independent domain meaning may cascade.

Example:

\`\`\`text
MedicalTest
     ↓ DELETE
TestResult
\`\`\`

**## Medical Result Modeling**

Test results may be numeric or textual.

\`\`\`text
value\_text
numeric\_value
\`\`\`

This preserves flexibility for both textual and numeric results and future analytics.

**## Document Storage**

Binary medical files are not stored directly inside PostgreSQL.

Database stores metadata + \`storage\_key\`; actual file storage is handled through \`FileStorageService\`.

\`\`\`text
MedicalDocument
      ↓
FileStorageService
      ↓
Local Storage / S3-compatible Storage
\`\`\`

**## Timeline**

No generic polymorphic \`timeline\_events\` table is used.

Timeline is produced through aggregation:

\`\`\`text
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
\`\`\`

**---**

**# 11. Search Foundation**

Search currently covers:

\- Diseases
\- Doctors
\- Hospitals
\- Visits
\- MedicalTests
\- TestResults
\- Imaging
\- MedicalDocuments
\- Medications

Current MVP uses PostgreSQL queries.

Known future optimization options:

\- \`pg\_trgm\`
\- PostgreSQL full-text search
\- combined projections / \`UNION ALL\`
\- dedicated search index when scale requires

**---**

**# 12. Completed Development Phases**

**## Product Specification ✅**

\- Product vision
\- MVP scope
\- Core modules
\- Long-term roadmap
\- AI boundary
\- Mobile roadmap

**## ER Modeling ✅**

\- Core entities
\- Ownership relationships
\- Historical relationships
\- Parent-child relationships
\- Timeline strategy
\- Document storage strategy

**## STEP 1 — PostgreSQL Foundation ✅**

\- Docker PostgreSQL
\- Persistent Docker volume
\- \`health\_platform\` database
\- DBeaver verification
\- Flyway infrastructure

**## STEP 2 — Spring Boot + Database Schema ✅**

\- Spring Boot foundation
\- Maven
\- Spring Web
\- Spring Data JPA
\- PostgreSQL Driver
\- Flyway
\- Bean Validation
\- Lombok
\- Migrations V1–V12
\- Hibernate schema validation

**## STEP 3 — JPA Entity Layer ✅**

Implemented \`BaseEntity\`, User, Disease, Doctor, Hospital, Visit, MedicalTest, TestResult, Imaging, MedicalDocument, Medication, domain enums and repositories.

Architecture:

\- UUID identifiers
\- \`Instant\` timestamps
\- \`LocalDate\` date-only fields
\- \`BigDecimal\` numeric laboratory values
\- Lazy relationships
\- No unnecessary bidirectional collections
\- DTO-only controller responses

**## STEP 4 — Authentication & Security ✅**

\- Spring Security
\- Stateless JWT authentication
\- BCrypt password hashing
\- Registration / login
\- JWT filter and validation
\- \`CurrentUserProvider\`
\- Standardized 401 / 403 responses
\- Global API error contract
\- User-scoped ownership enforcement

Public endpoints:

\- \`/api/health\`
\- \`/api/auth/\*\*\`

All health-domain APIs require authentication.

**## STEP 5 — Disease API ✅**

Secure CRUD, status filtering, ownership and cross-user isolation.

**## STEP 6 — Doctor & Hospital APIs ✅**

Secure CRUD, specialization/city filters, ownership and cross-user isolation.

**## STEP 7 — Visit API ✅**

Secure CRUD, Disease/Doctor/Hospital relations, ownership validation, filters and historical \`SET NULL\`.

**## STEP 8 — Medical Test & Test Result APIs ✅**

MedicalTest secure CRUD with Disease/Visit relations and category filtering. TestResult parent-scoped CRUD, numeric/text values, flags, parameter history and parent cascade behavior.

**## STEP 9 — Imaging API ✅**

Secure CRUD, optional Disease/Visit/Doctor/Hospital relations, type/body-part filters, ownership validation and historical \`SET NULL\`.

**## STEP 10 — Medical Document + File Storage ✅**

\- \`FileStorageService\` abstraction
\- \`LocalFileStorageService\`
\- UUID physical filenames
\- User-scoped storage keys
\- Path traversal protection
\- PDF/JPEG/PNG whitelist
\- 10 MB upload limit
\- Authenticated download
\- Metadata API
\- DB + physical file deletion
\- Upload rollback cleanup
\- Storage ignored by Git

Production target: S3-compatible \`FileStorageService\` implementation.

**## STEP 11 — Medication API ✅**

Secure CRUD, optional Disease relation, status/name filters, date validation and historical \`SET NULL\`.

**## STEP 12 — Timeline API ✅**

Read model only; no timeline table. Aggregates Visits, MedicalTests, Imaging, MedicalDocuments and Medications. Supports type/disease/date filters, combined filters, chronological sorting, pagination and user isolation.

Known future optimization: database-side aggregation/pagination via projection, \`UNION ALL\`, materialized view or dedicated read model if scale requires.

**## STEP 13 — Global Search API ✅**

Searches Disease, Doctor, Hospital, Visit, MedicalTest, TestResult, Imaging, MedicalDocument and Medication. Supports partial case-insensitive search, type/disease filters, relevance scoring, pagination, deduplication and user isolation.

**## STEP 14 — Dashboard Summary API ✅**

Provides active Disease/Medication counts, total Visits/Tests/Imaging/Documents, recent 5 Visits/Tests/Imaging and recent 5 global Timeline events. Counts use database \`COUNT\` queries.

**## STEP 15 — Backend Integration Hardening ✅**

**### STEP 15-A — API Contract / Exception / Configuration ✅**

\- \`spring.jpa.open-in-view=false\`
\- \`ddl-auto=validate\`
\- Safe Spring error configuration
\- Standardized 400/401/403/404/409/413/500 responses
\- Malformed enum/UUID/JSON handling
\- Missing request parameter and constraint handlers
\- File-size handling
\- Stack traces hidden from clients
\- Dev CORS restricted to \`http\://localhost:5173\`
\- Temporary auth test endpoint removed
\- No JPA entity serialization
\- No \`passwordHash\` or \`storageKey\` exposure
\- No health data in JWT

**### STEP 15-B — Full Security & Ownership Regression ✅**

Verified:

\- Cross-user CRUD blocking
\- Relationship injection protection
\- Foreign-resource filter protection
\- TestResult parent ownership
\- Document download/delete ownership
\- Timeline/Search/Dashboard isolation
\- Tampered JWT rejection
\- Safe malformed auth handling
\- Transactional rollback of failed cross-user updates

**### STEP 15-C — DB / Storage / Performance / Final Integration Audit ✅**

Verified:

\- Flyway history and immutable migrations
\- Hibernate validation
\- FK delete rules
\- Query/index needs
\- Storage/DB consistency
\- Safe missing-file behavior
\- Secret/gitignore rules
\- BCrypt hashes
\- Logging hygiene
\- Scoped repository access
\- Smoke tests
\- \`mvnw clean test\`
\- \`mvnw clean package\`
\- PostgreSQL restart/Flyway validation
\- \`/api/health\`

**## STEP 16 — Frontend Foundation + Auth Integration ✅**

**### STEP 16-A — Frontend Project Foundation ✅**

\- React + TypeScript + Vite project verified
\- ESLint configured
\- Development/build pipeline verified

**### STEP 16-B — Folder Architecture ✅**

Established reusable frontend structure for API, auth, components, layouts, pages, routes, services, types and utilities.

**### STEP 16-C — Tailwind + UI Foundation ✅**

\- Tailwind CSS v4
\- shadcn/ui Base UI / Nova preset
\- Path alias \`@/\*\`
\- Shared UI utilities
\- Button Fast Refresh separation

**### STEP 16-D — React Router Foundation ✅**

\- \`/login\`
\- \`/register\`
\- \`/dashboard\`
\- root redirect
\- 404 route
\- Auth/App layouts

**### STEP 16-E — Axios API Client ✅**

\- \`VITE\_API\_URL\`
\- Shared Axios client
\- Automatic Bearer token attachment
\- Centralized API error helper
\- Backend health smoke test

**### STEP 16-F — Auth Types + Service ✅**

\- Login types
\- Register types
\- Auth response contract
\- Real backend login/register service integration

**### STEP 16-G — AuthProvider + useAuth ✅**

\- Auth context/provider
\- LocalStorage token persistence
\- Stored authenticated user
\- Login/logout state synchronization

**### STEP 16-H — Real Login Page ✅**

\- Real backend authentication
\- Loading state
\- Safe error presentation
\- Native form validation
\- Auth persistence
\- Dashboard redirect

**### STEP 16-I — Real Register Page ✅**

\- Real registration form
\- Password confirmation
\- Duplicate email / backend validation handling
\- Register → Login flow
\- JWT/session persistence after successful registration

**### STEP 16-J — ProtectedRoute + Auth-Aware Routing ✅**

\- \`ProtectedRoute\`
\- \`PublicOnlyRoute\`
\- Auth-aware root redirect
\- Authenticated/anonymous route behavior
\- Refresh persistence
\- Logout redirect behavior

**### STEP 16-K — JWT Persistence + Centralized 401 Handling ✅**

\- Axios 401 interceptor
\- Central unauthorized event
\- AuthProvider listener
\- Automatic token/user cleanup
\- Fake/expired token handling
\- ProtectedRoute redirect after server-side rejection

**### STEP 16-L — Dashboard Summary First Real Integration ✅**

\- \`/api/dashboard/summary\` connected to React
\- Real database-backed KPI values
\- Loading/error states
\- Recent Visits
\- Recent Medical Tests
\- Recent Imaging
\- Recent Timeline
\- Empty account handling
\- Authenticated dashboard request flow

**## STEP 17 — Real App Shell / Navigation + Dashboard UI ✅**

**### STEP 17-A — App Shell + Sidebar Foundation ✅**

\- Desktop application sidebar
\- Health module navigation
\- Sticky header
\- Authenticated user account area
\- Protected placeholder module routes

**### STEP 17-B — Responsive Sidebar / Mobile Navigation ✅**

\- Mobile hamburger navigation
\- shadcn Sheet
\- Responsive sidebar behavior
\- Route-select close behavior
\- Mobile logout behavior
\- 375 / 768 / 1024 / 1440 px checks

**### STEP 17-C — Dashboard UI Polish ✅**

\- Icon-based KPI cards
\- Improved hierarchy and spacing
\- Polished Recent sections
\- Polished health activity timeline
\- Turkish date presentation support
\- Loading skeleton
\- Controlled error UI
\- Responsive dashboard layout

**### STEP 17-D — Turkish UI Foundation + Text Centralization ✅**

\- \`src/i18n/tr.ts\`
\- Turkish-first visible UI
\- Centralized navigation/dashboard/auth text
\- \`tr-TR\` date formatting
\- Turkish timeline labels
\- Turkish placeholder screens
\- Login/Register Turkish UI
\- \`index.html\` language set to \`tr\`
\- Technical code/API/database names remain English

**### STEP 17-E — App Shell Polish + Navigation UX ✅**

\- Navigation configuration extracted to \`src/config/navigation.ts\`
\- Sidebar section hierarchy (\`Genel\` / \`Sağlık Kayıtları\`)
\- Improved active route states
\- Cleaner top bar
\- Sidebar account panel polish
\- Safer mobile Sheet width
\- Logout + mobile Sheet synchronization
\- Placeholder UX polish
\- React effect/state lint issue removed
\- Lint/build clean

**---**

**# 13. Current Milestones**

\- [x] Product concept and specification
\- [x] ER model
\- [x] PostgreSQL + Docker
\- [x] Spring Boot foundation
\- [x] Flyway V1–V12
\- [x] JPA entity/repository layer
\- [x] Authentication + JWT
\- [x] Disease API
\- [x] Doctor API
\- [x] Hospital API
\- [x] Visit API
\- [x] Medical Test API
\- [x] Test Result API
\- [x] Imaging API
\- [x] Medical Document API
\- [x] Local File Storage
\- [x] Medication API
\- [x] Timeline API
\- [x] Global Search API
\- [x] Dashboard Summary API
\- [x] Backend Integration Hardening
\- [x] Frontend foundation
\- [x] Frontend authentication integration
\- [x] Dashboard real backend integration
\- [x] Responsive app shell / navigation
\- [x] Turkish UI foundation
\- [x] Dashboard UI polish
\- [x] Disease management frontend
\- [x] Doctor management frontend
\- [x] Hospital management frontend
\- [x] Visit management frontend
\- [ ] Medical Test / Test Result frontend
\- [ ] Imaging management frontend
\- [ ] Medical Document upload/download frontend
\- [ ] Medication management frontend
\- [ ] Timeline UI
\- [ ] Global Search UI
\- [ ] User profile
\- [ ] Mobile application
\- [ ] AI layer

**---**

**# 14. Current Development Phase**

**\*\*Previous Phase:\*\*** STEP 17 — Real App Shell / Navigation + Dashboard UI ✅  
**\*\*Current Phase:\*\*** Frontend Domain Management Integration  
**\*\*Current Step:\*\***

\`\`\`text
STEP 18
Diseases Frontend CRUD
\`\`\`

Backend MVP status:

\`\`\`text
Database Foundation        ✅
JPA Entity Layer           ✅
Authentication / JWT       ✅
Domain APIs                ✅
Timeline API               ✅
Global Search API          ✅
Dashboard Summary API      ✅
Backend Hardening          ✅
\`\`\`

Frontend foundation status:

\`\`\`text
React / TypeScript / Vite      ✅
Tailwind / shadcn UI           ✅
React Router                   ✅
Axios API Client               ✅
Auth Context / JWT Persistence ✅
Login / Register               ✅
Protected Routes               ✅
Centralized 401 Handling       ✅
Dashboard Integration          ✅
Responsive App Shell           ✅
Mobile Navigation              ✅
Turkish UI Foundation          ✅
Dashboard Polish               ✅
\`\`\`

Frontend next:

\`\`\`text
Diseases CRUD
      ↓
Doctors CRUD
      ↓
Hospitals + Visits
      ↓
Medical Tests + Test Results
      ↓
Imaging + Documents
      ↓
Medications
      ↓
Timeline UI + Global Search UI
      ↓
Profile / Remaining MVP Polish
\`\`\`

**---**

**# 15. Next Immediate Task

## STEP 21 — Medical Tests + Test Results Frontend

Planned order:

```text
Medical Test types + service layer
     ↓
Medical Test real list page
     ↓
Category / relation filtering
     ↓
Create Medical Test
     ↓
Edit Medical Test
     ↓
Delete Medical Test
     ↓
Test Result types + service layer
     ↓
Parent-scoped Test Result UI
     ↓
Create / Edit / Delete Test Result
     ↓
Numeric / text result handling
     ↓
Result flag presentation
     ↓
CRUD hardening + responsive polish
```

Primary goals:

- Replace the Medical Tests placeholder with a real secure domain management screen
- Connect Medical Tests to optional Disease and Visit relationships
- Implement Test Result management under its parent Medical Test
- Preserve backend ownership and parent-scoped access rules
- Keep enum/category/flag contracts aligned with the backend
- Reuse the established CRUD, filtering, loading, error and confirmation patterns
- Preserve Turkish-first UI presentation
- Verify user isolation, relation ownership and parent cascade behavior

---

# 16. Frontend Architecture Decisions**

**## Turkish-First Product UI**

The initial target audience is Turkish users.

Therefore:

\- User-facing UI text is Turkish
\- TypeScript identifiers remain English
\- Backend DTO/property names remain English
\- Database columns/enums remain English
\- API paths remain English

Current text foundation:

\`\`\`text
src/i18n/tr.ts
\`\`\`

A full runtime i18n library is intentionally deferred until a second UI language is actually required.

**## Authentication Persistence**

Current MVP uses LocalStorage for JWT persistence.

\`\`\`text
healthPlatformAccessToken
healthPlatformAuthUser
\`\`\`

Axios attaches the Bearer token automatically.

A backend \`401\` dispatches a centralized unauthorized event, causing AuthProvider state and persisted auth data to be cleared and ProtectedRoute to redirect to login.

Future production hardening may replace this with an HttpOnly/Secure cookie + refresh-token architecture if required.

**## Frontend Routing**

Route access is separated through:

\- \`ProtectedRoute\`
\- \`PublicOnlyRoute\`
\- \`RootRedirect\`

Authenticated application content is rendered inside \`AppLayout\`.

**## Application Shell**

Desktop:

\- Fixed sidebar
\- Sticky top bar
\- Main content outlet

Mobile/tablet:

\- Hamburger trigger
\- shadcn Sheet navigation
\- Route selection closes navigation

Navigation configuration lives in:

\`\`\`text
src/config/navigation.ts
\`\`\`

**## Dashboard Composition**

Dashboard data comes from:

\`\`\`text
GET /api/dashboard/summary
\`\`\`

Frontend composition is split into reusable components such as:

\- \`SummaryCard\`
\- \`RecentSection\`
\- \`RecentTimeline\`

\`DashboardPage\` owns fetching/state/page composition instead of embedding all presentation details in a single component.

**---**

**# 17. Development Strategy**

Each major development step follows:

1\. Design or review the backend contract / relationship.
2\. Implement the smallest logical frontend/backend unit.
3\. Run lint / compile / build checks.
4\. Start the relevant services.
5\. Verify API behavior.
6\. Verify persistence behavior through PostgreSQL / DBeaver when necessary.
7\. Verify authentication and ownership behavior.
8\. Verify responsive frontend behavior.
9\. Test loading, empty, validation and failure states.
10\. Update documentation at meaningful milestones.
11\. Commit.
12\. Push.
13\. Continue to the next step.

Frontend checkpoint commands:

\`\`\`bash
cd frontend
npm run lint
npm run build
\`\`\`

Backend checkpoint commands when backend changes are made:

\`\`\`bash
cd backend/health-platform
./mvnw clean test
./mvnw clean package
\`\`\`

**---**

**# 18. Current Project Checkpoint**

\`\`\`text
Product Specification             ✅
        ↓
ER Model                          ✅
        ↓
PostgreSQL                        ✅
        ↓
Spring Boot Foundation            ✅
        ↓
Flyway V1–V12                    ✅
        ↓
JPA Entity Layer                  ✅
        ↓
Authentication / JWT              ✅
        ↓
Secure Domain APIs                ✅
        ↓
Timeline API                      ✅
        ↓
Global Search API                 ✅
        ↓
Dashboard Summary API             ✅
        ↓
Backend Integration Hardening     ✅
        ↓
React Web Foundation              ✅
        ↓
Frontend Auth Integration         ✅
        ↓
Dashboard Integration             ✅
        ↓
Responsive App Shell              ✅
        ↓
Turkish UI Foundation             ✅
        ↓
Dashboard / Navigation Polish     ✅
        ↓
Diseases Frontend CRUD            ← NEXT
        ↓
Remaining Domain Management UI
        ↓
Timeline / Search UI
        ↓
Document UX
        ↓
Profile / MVP Polish
        ↓
Mobile
        ↓
Future AI Layer
\`\`\`

**---**

**# 19. Technical Debt / Future Work**

**## Backend**

\- Automated integration/security test suite expansion
\- PostgreSQL search optimization (\`pg\_trgm\`, FTS, projections)
\- Database-side Timeline aggregation/pagination
\- S3-compatible production object storage
\- Production CORS and secret-management configuration
\- Audit logging
\- Rate limiting / abuse protection
\- Refresh-token strategy if required
\- Account recovery / password reset
\- Email verification
\- Production observability
\- Deployment pipeline

**## Frontend**

\- Runtime multi-language support if English or additional languages are introduced
\- Multi-tab auth synchronization if required
\- Refresh-token / cookie-based auth migration if production architecture requires it
\- Shared form abstractions after repeated CRUD patterns become clear
\- Shared server-state/cache layer only if complexity warrants it
\- Accessibility audit after core MVP domain screens are implemented
\- Route-level lazy loading / code splitting when application size warrants it

These are not blockers for continuing the web frontend MVP.

**---**

**# 20. Planned Frontend Sequence**

\`\`\`text
STEP 18 — Diseases Frontend CRUD
STEP 19 — Doctors Frontend CRUD
STEP 20 — Hospitals + Visits Frontend
STEP 21 — Medical Tests + Test Results Frontend
STEP 22 — Imaging + Documents Frontend
STEP 23 — Medications Frontend
STEP 24 — Timeline + Global Search Frontend
\`\`\`

This order intentionally starts with simpler CRUD domains and reuses the resulting frontend patterns in more relational modules.

**---**

**# 21. Status Legend**

🟢 Completed  
🟡 In Progress  
⚪ Planned  
🔴 Blocked