# CareRoute 🧭

> **Track 1 — Student Triage & Routing: Help students reach the right support quickly.**
> A unified platform for intelligent student welfare triage, category routing, and transparent case tracking.

---

## 🎯 Problem & Solution

### The Problem
Universities suffer from fragmented student welfare support scattered across disparate faculties, residential halls, finance offices, and health clinics. Students in distress often do not know which department to contact, leading to "wrong-door" ping-pong, abandoned requests, and critical delays.

### The Solution
**CareRoute** allows students to describe their concern in plain, natural language without needing to know university administrative divisions. CareRoute triages the issue, determines urgency, and routes the student to the appropriate service while prioritizing human escalation for high-risk safety situations.

> [!IMPORTANT]
> **Safety & Scope Boundary:**
> CareRoute is a triage and routing navigator. It is **NOT** a medical diagnostic tool, does not replace licensed counsellors, doctors, or university staff, and **never** attempts to provide clinical psychotherapy or emergency intervention. High-risk situations immediately trigger human escalation and emergency contact protocols.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+ or v20+)
- npm (v9+)

### Installation
Clone the repository and install all dependencies (root, backend, and frontend) with a single command:

```bash
# Install all dependencies across workspace
npm run install:all
```

Alternatively, install individually:
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
```

---

## 💻 Running the Application

### Option A: Run Both Concurrently (Recommended)
From the project root:
```bash
npm run dev
```
* **Frontend UI**: [http://localhost:5173](http://localhost:5173)
* **Backend API**: [http://localhost:5000](http://localhost:5000)

### Option B: Run Separately in Two Terminals
```bash
# Terminal 1: Backend API
npm run dev:backend

# Terminal 2: Frontend Client
npm run dev:frontend
```

---

## 🎪 Demo Mode & Judge Walkthrough

CareRoute is **100% functional out of the box** without requiring an external AI API key or live university databases.

### 6 Deterministic Judge Scenarios
On the [Student Triage Page](http://localhost:5173/triage), a top ribbon provides one-click presets for judges:
1. **Academic Stress & Backlogs** (`academic`) → Study advisors & mitigation advice
2. **Financial Hardship** (`financial`) → Emergency grant & hardship funding
3. **Accommodation Problem** (`accommodation`) → Dorm heating & tenant advocacy
4. **Harassment & Stalking** (`harassment`) → **High-Risk** safeguarding fast-track
5. **Accessibility / Disability** (`accessibility`) → Exam accommodations & learning plans
6. **High-Risk Crisis Scenario** (`crisis`) → **Immediate Human Escalation** & emergency contact placeholders

### Student Flow
1. **Landing** (`/`): Learn about CareRoute and start triage.
2. **Triage** (`/triage`): Describe concern in plain words (or select a demo scenario).
3. **Assessment Result** (`/assessment`): View detected primary/secondary concerns, urgency level, confidence score, and routing rationale. High-risk scenarios trigger dedicated red crisis safeguards.
4. **Confirmation** (`/confirmation`): Support request generated with case reference (`CR-XXXX`).
5. **Student Status** (`/status`): Track live progress through the 6-stage lifecycle (`Submitted` → `Triaged` → `Routed` → `Support Team Reviewing` → `Appointment / Response` → `Resolved`).

### Staff Flow
1. **Staff Dashboard** (`/staff`): Real-time view of incoming case queues, priority badges, and KPI counters.
2. **Case Details** (`/staff/cases/:id`): Anonymized student dossier, triage audit logs, and status update actions.
3. **Analytics Dashboard** (`/analytics`): Operational volume by category, urgency tier, destination services, and Track 1 impact metrics.

---

## 🏗️ Architecture & Clean Separation

CareRoute enforces strict modular boundaries:

```
care-route/
├── backend/
│   ├── data/                 # Centralized mock data & routing rules
│   │   ├── supportCategories.js   # 10 university support categories config
│   │   ├── routingRules.js        # SLA calculation and destination logic
│   │   └── mockCases.js           # In-memory cases data store
│   ├── routes/               # Express API endpoints
│   │   ├── triageRoutes.js        # POST /api/triage, POST /api/route
│   │   ├── caseRoutes.js          # GET/POST /api/cases, PATCH /api/cases/:id/status
│   │   └── analyticsRoutes.js     # GET /api/analytics
│   ├── services/             # Business & AI services
│   │   ├── triageService.js       # LLM Service Abstraction (Mock & Gemini hook)
│   │   └── routingService.js      # Routing calculation engine
│   ├── .env.example
│   └── server.js             # Express entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Shared design system components
│   │   │   ├── Button.jsx, Card.jsx, Badge.jsx, Modal.jsx
│   │   │   ├── Input.jsx, TextArea.jsx, Select.jsx
│   │   │   ├── StatusBadge.jsx, PriorityBadge.jsx, Alert.jsx
│   │   │   ├── Navbar.jsx, Sidebar.jsx, PageHeader.jsx
│   │   │   ├── EmptyState.jsx, LoadingState.jsx
│   │   │   └── CaseCard.jsx, CategoryCard.jsx
│   │   ├── data/             # Frontend centralized mock data & scenarios
│   │   ├── features/         # Team feature ownership directories
│   │   ├── pages/            # 8 Core application pages
│   │   ├── services/api.js   # API client with client-side fallback
│   │   ├── App.jsx           # Routing & layout shell
│   │   └── index.css         # Tailwind directives & focus styles
│   └── package.json
└── README.md
```

### AI Service Abstraction (`backend/services/triageService.js`)
- Exposes `triageStudent(input)`.
- Defaults to a high-accuracy, deterministic mock keyword/intent classifier.
- Architected extension point: `triageStudentWithGemini(input)` can be activated by providing `GEMINI_API_KEY` in `backend/.env` without changing the frontend or API contracts.
- **Frontend Never Calls Gemini Directly**: All AI interactions remain safely encapsulated in the backend service.

---

## 👥 TEAM DEVELOPMENT RULES

Rules:

1. Never push directly to main.
2. Every feature must use its own branch.
3. Pull/rebase from main before starting work.
4. Open a Pull Request before merging.
5. Do not modify another person's feature files unless explicitly coordinated.
6. Shared components should be changed only when necessary.
7. Do not rename shared files without informing the team.
8. Do not change API contracts without informing the team.
9. Do not introduce new libraries without informing the team.
10. Keep commits small and descriptive.

---

## 🏷️ FEATURE OWNERSHIP

Each teammate has designated responsibility over their feature area:

| Feature Branch | Scope & Responsibility | Primary Directory |
|---|---|---|
| `feature/triage` | Student intake questionnaire, optional chips, natural language input | `frontend/src/features/triage/` & `frontend/src/pages/Triage.jsx` |
| `feature/ai` | AI classification service, prompt engineering, Gemini integration | `backend/services/triageService.js` & `frontend/src/features/ai/` |
| `feature/routing` | Routing engine, SLA calculations, support categories config | `backend/data/routingRules.js` & `frontend/src/features/routing/` |
| `feature/student-dashboard` | Case confirmation and student 6-stage lifecycle tracking | `frontend/src/features/student-dashboard/` & `pages/CaseStatus.jsx` |
| `feature/staff-dashboard` | Staff triage queues, filter controls, and status update actions | `frontend/src/features/staff-dashboard/` & `pages/StaffDashboard.jsx` |
| `feature/analytics` | Impact metrics, operational volume charts, Track 1 narrative | `frontend/src/features/analytics/` & `pages/Analytics.jsx` |

---

## 🛡️ Safety & Configurable Placeholders

All emergency numbers and campus security extensions are clearly marked prototype placeholders:
- `EMERGENCY_SUPPORT_NUMBER`: `"999 / 911 / 112 (Placeholder)"`
- `CRISIS_COUNSELLOR_CONTACT`: `"0800-CARE-NOW (Placeholder)"`
- `CAMPUS_SECURITY_CONTACT`: `"020-5555-0199 (Placeholder)"`

These can be configured via environment variables in `backend/.env`.
