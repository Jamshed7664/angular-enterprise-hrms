<h1 align="center">🏢 Angular Enterprise HRMS</h1>

<p align="center">
  <strong>A production-inspired Human Resource Management System built with Angular 20</strong>
</p>

<p align="center">
  Modern Angular architecture • Signals • RxJS • Reactive Forms • Role-Based Access • Enterprise UI
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-screenshots">Screenshots</a>
</p>

---

## 📌 Overview

**Angular Enterprise HRMS** is a production-inspired Human Resource Management System frontend designed to demonstrate modern Angular application architecture and realistic enterprise HR workflows.

The application covers the complete employee lifecycle including employee management, attendance, leave, timesheets, payroll, performance, recruitment, reporting, administration, and employee self-service.

The project focuses on:

- Scalable feature-based Angular architecture
- Standalone components
- Angular Signals and computed state
- Reactive Forms and validation
- Lazy-loaded feature routes
- Role-aware navigation and route guards
- Reusable enterprise UI components
- Typed data-access services
- Responsive application design
- Light, dark, and system themes
- Backend-ready integration patterns

> This is a frontend portfolio project. Authentication, authorization, payroll calculations, file storage, and data persistence are mocked or presentation-oriented where noted.

---

## 🚀 Live Demo

> **Live deployment coming soon**

<!-- Replace the URL below after deployment -->
<!-- [🚀 View Live Application](https://your-live-url.com) -->

### Demo Account

```text
Email: admin@hrms.dev
Password: password
```

The authentication flow is intentionally mocked for demonstration purposes.

---

## ✨ Features

| Module | Key Capabilities |
|---|---|
| 🔐 **Authentication** | Login, forgot/reset password, OTP demo, session handling, auth & role guards |
| 📊 **HR Dashboard** | Workforce KPIs, approvals, attendance insights, recruitment summary & people events |
| 👥 **Employees** | Directory, employee profiles, employment information, compensation & documents |
| 🏢 **Organization** | Departments, department heads, office locations & reporting hierarchy |
| ⏱️ **Attendance** | Attendance KPIs, clock-in/out demo, corrections & approval workflow |
| 🌴 **Leave** | Leave balances, requests, filters, manager comments & approvals |
| 🕒 **Timesheets** | Weekly timesheets, billable hours, submission & manager approval |
| 💰 **Payroll** | Salary overview, allowances, deductions, net pay & payroll status |
| 🎯 **Performance** | Review cycles, ratings, goals, feedback & performance summaries |
| 💼 **Recruitment / ATS** | Job openings and drag-and-drop candidate pipeline |
| 📁 **Documents** | Employee document metadata, expiry tracking, categories & status |
| 📈 **Reports** | Workforce, attendance, leave, payroll, performance & recruitment analytics |
| 🛡️ **Administration** | Role-permission matrix, approval configuration & audit log |
| ⚙️ **Settings** | Profile, company settings, working hours, theme, notifications & security |

---

## ⭐ Technical Highlights

### Modern Angular

- Angular 20
- Standalone Components
- Angular Signals
- Computed Signals
- Reactive Forms
- Angular Router
- Lazy Loading
- Functional application architecture

### Enterprise Architecture

- Feature-based project structure
- Separation of UI and data-access concerns
- Core and shared layers
- Feature-level services and stores
- Typed models
- Reusable components
- Centralized application services

### State Management

Angular Signals are used for:

- Session state
- Theme state
- Feature-level stores
- Filters
- Selected UI state
- Mock database state
- Derived dashboard KPIs

Computed Signals are used for derived state instead of repeatedly calculating values inside templates.

RxJS supports asynchronous and data-access workflows.

### Access Control

The project demonstrates:

- Authentication guards
- Role guards
- Restricted routes
- Role-aware navigation
- Permission-oriented administration UI

> Frontend authorization is for demonstration purposes. A production application must enforce authorization on the backend.

---

## 🛠 Tech Stack

| Technology | Usage |
|---|---|
| **Angular 20** | Frontend framework |
| **TypeScript** | Strongly typed application development |
| **Standalone Components** | Angular component architecture |
| **Angular Signals** | Reactive application and feature state |
| **RxJS** | Async and data-access workflows |
| **Angular Router** | Navigation and lazy-loaded features |
| **Reactive Forms** | Enterprise forms and validation |
| **Angular CDK** | Drag-and-drop and interaction utilities |
| **Bootstrap 5.3** | Responsive layout utilities |
| **SCSS** | Component and application styling |
| **CSS Variables** | Design system and theming |
| **Font Awesome** | Application icons |
| **Typed Mock Services** | Demonstration data layer |

---

## 🏗 Architecture

The application follows a feature-oriented architecture designed to keep business domains isolated while sharing common infrastructure and reusable UI.

```text
src/
├── app/
│   ├── core/
│   │   ├── constants/
│   │   ├── enums/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── models/
│   │   ├── services/
│   │   └── utils/
│   │
│   ├── shared/
│   │   ├── components/
│   │   ├── directives/
│   │   ├── pipes/
│   │   ├── ui/
│   │   └── validators/
│   │
│   ├── layout/
│   │   ├── auth-layout/
│   │   └── main-layout/
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── employees/
│   │   ├── organization/
│   │   ├── attendance/
│   │   ├── leave/
│   │   ├── timesheets/
│   │   ├── payroll/
│   │   ├── performance/
│   │   ├── recruitment/
│   │   ├── documents/
│   │   ├── reports/
│   │   ├── administration/
│   │   └── settings/
│   │
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
│
├── assets/
├── environments/
├── styles/
└── styles.scss
```

### Feature Structure Example

Individual business domains can own their pages, data-access layer, store, and routing.

```text
employees/
├── pages/
│   ├── employee-list/
│   ├── employee-details/
│   └── employee-form/
│
├── data-access/
│   ├── employee.service.ts
│   └── employee.store.ts
│
└── employee.routes.ts
```

This helps keep features independently maintainable as the application grows.

---

## 🔄 Data Flow

Components consume data through feature-level services or stores instead of directly embedding business datasets inside templates.

```text
┌─────────────────────────┐
│       Component         │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Feature Service / Store │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│   MockDatabaseService   │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│     Future REST API     │
└─────────────────────────┘
```

The mock data layer is intentionally isolated so it can later be replaced with a real backend such as:

- Spring Boot
- Node.js / Express
- NestJS
- .NET
- Firebase
- Other REST APIs

---

## 🧭 Routing Strategy

Major HR domains are lazy loaded to keep feature boundaries clear and avoid loading the complete application upfront.

The application uses separate layouts for:

### Authentication

```text
Login
Forgot Password
Reset Password
OTP / Verification
```

### Protected Application

```text
Dashboard
Employees
Attendance
Leave
Payroll
Performance
Recruitment
Reports
Administration
Settings
```

Role metadata is demonstrated on restricted routes such as **Payroll** and **Administration**.

---

## 🎨 Theming & Responsive Design

The application supports:

- ☀️ Light theme
- 🌙 Dark theme
- 💻 System theme
- 📱 Responsive layouts
- Collapsible enterprise navigation
- Responsive tables and forms
- Mobile-friendly views

Theme preferences are managed through application state.

---

## 🧲 Recruitment Pipeline

The recruitment module demonstrates an ATS-style candidate pipeline using **Angular CDK Drag & Drop**.

```text
Applied
   ↓
Screening
   ↓
Interview
   ↓
Offer
   ↓
Hired
```

Candidates can also move into a rejected state as part of the demonstration workflow.

---

## 📊 HR Analytics

The reporting area includes visual summaries for:

- Workforce
- Headcount
- Department distribution
- Attendance
- Leave
- Timesheets
- Payroll
- Performance
- Recruitment

Reports support date and department filtering in the current frontend implementation.

---

## 📸 Screenshots

### HR Dashboard

![HR Dashboard](docs/screenshots/hr-dashboard.png)

### Dark Theme

![HR Dashboard Dark Theme](docs/screenshots/hr-dashboard-dark.png)

### Employee Directory

![Employee Directory](docs/screenshots/employee-directory.png)

### Attendance

![Attendance Dashboard](docs/screenshots/attendance.png)

### Leave Management

![Leave Management](docs/screenshots/leave-management.png)

### Recruitment Pipeline

![Recruitment Pipeline](docs/screenshots/recruitment-pipeline.png)

> Additional application screenshots can be stored under `docs/screenshots/`.

---

## ⚙️ Getting Started

### Prerequisites

Install a Node.js version supported by Angular 20 and npm.

Verify your installation:

```bash
node -v
npm -v
```

### Clone

```bash
git clone https://github.com/Jamshed7664/angular-enterprise-hrms.git
cd angular-enterprise-hrms
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm start
```

Open:

```text
http://localhost:4200
```

### Production Build

```bash
npm run build
```

---

## 🔐 Security & Privacy

This repository is designed as a portfolio demonstration and follows several important security principles:

- Only synthetic employee data is included
- No real employee PII should be committed
- API keys and secrets should never be committed
- Frontend role guards are demonstration-only
- Production authorization must be enforced server-side
- Real authentication should use secure backend-issued tokens or sessions
- Unsafe dynamic HTML rendering should be avoided

---

## ♿ Accessibility

The UI is designed with accessibility considerations including:

- Semantic page structure
- Associated form labels
- Keyboard-friendly navigation
- Visible focus states
- Labels for icon-only actions
- Readable status information
- Light and dark theme contrast

---

## ⚠️ Portfolio Scope

This project demonstrates frontend architecture and HR workflows.

Some capabilities intentionally remain mocked or presentation-oriented.

### Authentication

Authentication is mocked for portfolio demonstration. Production authentication would require secure backend-issued sessions or tokens.

### Payroll

Payroll screens demonstrate frontend workflows and presentation only.

The application does **not** perform real:

- Tax calculations
- Statutory calculations
- Banking transactions
- Salary payments

### Documents

Document management currently represents metadata and UI workflows.

Real binary file storage and signing are outside the current frontend scope.

---

## 🗺️ Roadmap

Potential future enhancements include:

- [ ] Real backend integration
- [ ] JWT / OAuth / SSO
- [ ] Server-side RBAC
- [ ] Real database persistence
- [ ] WebSocket updates
- [ ] Production payroll engine
- [ ] Document storage and signing
- [ ] Email / SMS / push notifications
- [ ] Internationalization (i18n)
- [ ] Multi-company / multi-tenant architecture
- [ ] Employee onboarding/offboarding
- [ ] Benefits administration
- [ ] Expense management
- [ ] Advanced audit and compliance

---

## 👨‍💻 Author

### Jamshed Ahmad

**Frontend Engineer | Angular Developer**

Building scalable, maintainable, and modern enterprise web applications with Angular and TypeScript.

[LinkedIn](https://www.linkedin.com/in/jamshed-ahmad7664) • [GitHub](https://github.com/Jamshed7664)

---

<p align="center">
  <strong>Built with Angular 20 & TypeScript</strong>
</p>

<p align="center">
  <sub>Designed and developed by Jamshed Ahmad</sub>
</p>
