# Angular Enterprise HRMS

**Production-Inspired Human Resource Management System**  
**Portfolio Flagship Project | Code With Jamshed**

Angular Enterprise HRMS is a modern, production-inspired Human Resource Management System frontend built with Angular 20. It demonstrates scalable Angular architecture, realistic HR workflows, reusable enterprise UI, role-aware experiences, responsive design, Signals, Reactive Forms, Angular CDK, typed mock services, and backend-ready integration patterns.

## Highlights

- Angular 20 + TypeScript
- Standalone Components
- Angular Signals and computed state
- RxJS-ready data-access services
- Reactive Forms and validation
- Lazy-loaded feature routes
- Role-aware route guard demonstration
- Responsive enterprise sidebar/header
- Light, dark and system themes
- Notification and current-user dropdowns
- Typed mock database with synthetic HR data
- Angular CDK recruitment pipeline
- Backend-ready feature services

## Demo Credentials

```text
Email: admin@hrms.dev
Password: password
```

The v1 authentication flow is intentionally mocked for portfolio demonstration.

## Main Modules

### Authentication & Access

- Login
- Forgot Password
- Reset Password
- OTP / verification demo
- Session Expired
- Access Denied
- 404 page
- Auth guard
- Role guard
- Current-user session

### HR Dashboard

- Total workforce KPI
- Active employee KPI
- Employees on leave
- Pending approvals
- Open positions
- New joiners
- Department distribution
- Attendance summary
- Leave approval queue
- Recruitment pipeline summary
- Upcoming people events

### Employee Management

- Employee Directory
- Search and status filtering
- Add Employee
- Edit Employee
- Employee Details
- Personal information
- Employment information
- Compensation summary
- Attendance summary
- Leave summary
- Documents
- Status badges
- Feature-level service and Signal store

### Organization

- Department cards
- Department creation
- Department heads
- Office locations
- Employee counts
- Reporting hierarchy visualization

### Attendance

- Daily attendance dashboard
- Present / Late / WFH / Absent KPIs
- Department filtering
- Clock In / Clock Out demo
- Attendance records
- Attendance correction requests
- Approval / rejection workflow

### Leave Management

- Leave balances
- Apply Leave form
- Leave request list
- Status filtering
- Pending approvals
- Approve / reject workflow
- Manager comments

### Timesheets

- Weekly team timesheets
- Total and billable hours
- Draft / Submitted / Approved / Rejected states
- Submit workflow
- Manager approval / rejection
- Time-entry detail chips

### Payroll

- Payroll overview
- Basic salary
- Allowances
- Deductions
- Net pay
- Payroll status
- Mark as Paid demo
- Payslip action placeholder

> Payroll is presentation-only in v1. It does not perform real statutory, tax, banking or payment calculations.

### Performance

- Review cycles
- Ratings
- Manager feedback
- Goals
- Goal progress
- Goal status
- Average rating
- Top-performer summary

### Recruitment / ATS

- Job openings
- Applicant counts
- Candidate pipeline
- Applied
- Screening
- Interview
- Offer
- Hired
- Rejected
- Angular CDK drag and drop

### Documents

- Employee document metadata
- Categories
- Expiry dates
- Valid / Expiring / Expired statuses
- Search and filtering
- View / Download placeholders

> Real binary file storage is intentionally deferred.

### Reports & Analytics

- Workforce Overview
- Headcount
- Department
- Attendance
- Leave
- Timesheet
- Payroll Summary
- Performance
- Recruitment
- Date filters
- Department filter
- Export UI placeholders
- Workforce and attendance visual summaries

### Administration

- Role-permission matrix
- Approval configuration
- Audit Log
- Scoped/full access visualization
- System administration UI

### Settings & Employee Self-Service

- My Profile
- Company Settings
- Working Hours
- Timezone
- Appearance
- Light / Dark / System theme
- Notification Preferences
- Security
- Change Password placeholder
- Sign out

## Technology Stack

| Technology | Responsibility |
| --- | --- |
| Angular 20 | Primary frontend framework |
| TypeScript | Strongly typed application code |
| Standalone Components | Component architecture |
| Angular Signals | Local and feature state |
| RxJS | Async/data-access workflows |
| Angular Router | Navigation and lazy loading |
| Reactive Forms | Business forms and validation |
| Angular CDK | Drag/drop and interaction utilities |
| Bootstrap 5.3 | Responsive utilities |
| SCSS + CSS Variables | Design system and theming |
| Font Awesome | Icons |
| Typed Mock Services | v1 data layer |

## Architecture

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
│   ├── shared/
│   │   ├── components/
│   │   ├── directives/
│   │   ├── pipes/
│   │   ├── ui/
│   │   └── validators/
│   ├── layout/
│   │   ├── auth-layout/
│   │   └── main-layout/
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
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── assets/
│   ├── images/
│   ├── icons/
│   └── mock-data/
├── environments/
├── styles/
└── styles.scss
```

## Employee Feature Example

```text
employees/
├── pages/
│   ├── employee-list/
│   ├── employee-details/
│   └── employee-form/
├── data-access/
│   ├── employee.service.ts
│   └── employee.store.ts
└── employee.routes.ts
```

## Routing Strategy

Major HR domains are lazy loaded. Auth pages use an authentication layout, while protected HRMS pages use the main application shell.

Role metadata is demonstrated on restricted routes such as Payroll and Administration. Frontend authorization is a UI demonstration only; real production authorization must be enforced by a backend.

## State Management

Angular Signals are used for:

- session state
- theme state
- mock database state
- filters
- selected UI state
- derived KPIs
- feature-level stores

Computed Signals are used instead of repeated expensive template calculations.

## Backend-Ready Data Layer

Components consume data from core or feature services rather than embedding business datasets in templates.

```text
Component
   ↓
Feature Data-Access Service / Store
   ↓
MockDatabaseService
   ↓
Future REST API
```

The mock layer can later be replaced with:

- Spring Boot
- Node.js / Express
- NestJS
- .NET
- Firebase
- another REST backend

## Getting Started

### Prerequisites

Use a Node.js version supported by Angular 20 and npm.

```bash
node -v
npm -v
```

### Install

```bash
git clone https://github.com/YOUR_USERNAME/angular-enterprise-hrms.git
cd angular-enterprise-hrms
npm install
```

### Run

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

## Screenshots

Create the following directory:

```text
docs/screenshots/
```

Recommended images:

### HR Dashboard

![HR Dashboard](docs/screenshots/hr-dashboard.png)

### HR Dashboard — Dark Theme

![HR Dashboard Dark Theme](docs/screenshots/hr-dashboard-dark.png)

### Employee Directory

![Employee Directory](docs/screenshots/employee-directory.png)

### Employee Details

![Employee Details](docs/screenshots/employee-details.png)

### Attendance Dashboard

![Attendance Dashboard](docs/screenshots/attendance.png)

### Leave Management

![Leave Management](docs/screenshots/leave-management.png)

### Leave Approval Workflow

![Leave Approval](docs/screenshots/leave-approval.png)

### Timesheets

![Timesheets](docs/screenshots/timesheets.png)

### Payroll Overview

![Payroll Overview](docs/screenshots/payroll.png)

### Performance Dashboard

![Performance](docs/screenshots/performance.png)

### Recruitment Pipeline

![Recruitment Pipeline](docs/screenshots/recruitment-pipeline.png)

### Reports

![Reports](docs/screenshots/reports.png)

### Settings

![Settings](docs/screenshots/settings.png)

### Responsive Mobile View

![Mobile View](docs/screenshots/mobile-view.png)

## Security & Privacy

- Only synthetic employee data is included.
- No real employee PII should be committed.
- No API keys, secrets or private credentials belong in the repository.
- Role guards are demonstration-only until authorization is enforced server-side.
- Avoid unsafe dynamic HTML rendering.
- Real authentication should use secure backend-issued tokens/sessions.

## Accessibility

The UI is designed around:

- semantic page structure
- associated form labels
- keyboard-friendly buttons and navigation
- visible focus states
- icon labels for icon-only actions
- readable status text
- light/dark contrast

## v1.0 Scope

Implemented as a portfolio-ready frontend MVP:

- [x] Application shell and responsive navigation
- [x] Auth flows
- [x] HR Dashboard
- [x] Employee Management
- [x] Organization
- [x] Attendance
- [x] Leave + approvals
- [x] Timesheets
- [x] Payroll overview
- [x] Performance
- [x] Recruitment / ATS
- [x] Document Center
- [x] Reports
- [x] Administration
- [x] Settings
- [x] Light/Dark/System theme
- [x] Notifications
- [x] Current-user profile
- [x] Typed mock data layer
- [x] Lazy feature routes
- [x] Role-aware route demo

## Future Enhancements

- Real backend and database
- JWT / OAuth / SSO
- Biometric attendance
- Production payroll engine
- Bank/payment integration
- Real document storage/signing
- Email/SMS/push delivery
- Advanced workflow engine
- WebSocket updates
- Server-side RBAC
- Advanced audit/compliance
- i18n
- Multi-company / multi-tenant
- Onboarding/offboarding automation
- Benefits administration
- Expense management

## Suggested Demo Story

1. Sign in as HR Manager.
2. Review workforce KPIs.
3. Open Employee Directory.
4. Inspect an employee profile.
5. Add or edit an employee.
6. Review today's attendance.
7. Approve an attendance correction.
8. Apply for leave and approve/reject a request.
9. Review weekly timesheets.
10. Open payroll summary.
11. Inspect performance goals.
12. Drag a recruitment candidate to another stage.
13. Review document expiry.
14. Explore reports.
15. Open the role-permission matrix and audit log.
16. Switch between light and dark themes.
17. Open notifications and current-user profile.

## Repository

```text
angular-enterprise-hrms
```

## Release

```text
v1.0.0
```

## Author

**Jamshed Ahmad**  
**Code With Jamshed**

Frontend / Angular portfolio project focused on modern enterprise application engineering.

## Suggested GitHub Topics

```text
angular
angular20
typescript
hrms
human-resource-management
enterprise-application
standalone-components
angular-signals
rxjs
reactive-forms
angular-cdk
bootstrap
scss
responsive-design
dark-mode
frontend
portfolio-project
```

## License

Add the MIT License if you want the repository to be freely reusable.

---

<p align="center">
  <strong>Built with Angular 20 by Code With Jamshed</strong>
</p>
