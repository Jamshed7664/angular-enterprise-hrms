# Angular Enterprise HRMS

> **Production-Inspired Human Resource Management System**  
> **Portfolio Flagship Project | Code With Jamshed**

A modern, production-inspired **Human Resource Management System frontend** built with **Angular 20**, **Standalone Components**, **Angular Signals**, **RxJS**, **Reactive Forms**, **Angular CDK**, **Bootstrap**, and a typed mock data architecture.

The project demonstrates scalable Angular engineering, realistic HR workflows, role-aware experiences, reusable UI architecture, responsive design, enterprise dashboards, approvals, analytics, and backend-ready integration patterns.

---

### Demo Credentials

```text
Email: admin@hrms.dev
Password: password
```

---

## Screenshots

Create the following directory inside your repository:

```text
docs/screenshots/
```

Then add your screenshots using the names below.

### HR Dashboard

<img width="1917" height="987" alt="image" src="https://github.com/user-attachments/assets/b5948436-b1d1-402d-a5b5-1367a1daa9da" />


### HR Dashboard - Dark Mode

<img width="1917" height="987" alt="image" src="https://github.com/user-attachments/assets/43b3f72f-2e12-4db6-8f4c-8168d8389148" />

### Employee Directory

<img width="1917" height="987" alt="image" src="https://github.com/user-attachments/assets/75f929be-b93f-4258-97d5-ce55a88c6220" />

### Employee Details

<img width="1917" height="987" alt="image" src="https://github.com/user-attachments/assets/66f5349f-5fbf-4a36-9bb8-e9780ef07e53" />

### Organization

<img width="1917" height="992" alt="image" src="https://github.com/user-attachments/assets/37b7dd98-ebeb-4d0e-b5cf-b4bac77cc634" />

### Attendance Dashboard

<img width="1917" height="987" alt="image" src="https://github.com/user-attachments/assets/1317379d-9e5a-4c59-8df8-00ac59877d71" />


### Leave Management

<img width="1917" height="991" alt="image" src="https://github.com/user-attachments/assets/fc75fe21-759e-4215-9257-201589c78a36" />

### Leave Approval Workflow

<img width="1917" height="991" alt="image" src="https://github.com/user-attachments/assets/156a3c6e-51ac-4f75-b008-475b927ed1bd" />

### Timesheets

<img width="1917" height="991" alt="image" src="https://github.com/user-attachments/assets/28651090-3377-4db8-a86d-f08cc4453a96" />

### Payroll Overview

<img width="1917" height="987" alt="image" src="https://github.com/user-attachments/assets/0fcdb80c-2059-456f-960a-d65d0a3e4cd5" />

### Performance Dashboard

<img width="1917" height="987" alt="image" src="https://github.com/user-attachments/assets/a17db3f8-f157-45c8-9dfb-bd0fa06c2daf" />

### Recruitment Pipeline

<img width="1916" height="992" alt="image" src="https://github.com/user-attachments/assets/c91f1d56-ebd1-4ef1-942f-32fd339d950d" />

### Documents

<img width="1917" height="987" alt="image" src="https://github.com/user-attachments/assets/ca3d14c7-c28e-4c3d-ad12-7d43932b613f" />

### Reports

<img width="1917" height="990" alt="image" src="https://github.com/user-attachments/assets/85c70f9a-ac24-4dd1-a7bb-c8592d18008b" />

### Administration

<img width="1917" height="992" alt="image" src="https://github.com/user-attachments/assets/d7157129-193c-4392-b106-10ecb27a83c0" />

### Settings

<img width="1917" height="982" alt="image" src="https://github.com/user-attachments/assets/035df279-2fa8-4a13-b916-47a1369e3259" />

---

## Project Overview

**Angular Enterprise HRMS** is a realistic enterprise-style HR management frontend created to demonstrate how a large Angular application can be structured for maintainability, scalability, accessibility, responsive design, and future backend integration.

Instead of being a collection of unrelated CRUD screens, the project models connected HR workflows such as employee lifecycle management, organization and department management, attendance tracking, attendance correction approvals, leave requests and approvals, weekly timesheets, payroll overview, performance reviews, recruitment, employee document tracking, reports, administration, notifications, and employee self-service.

The application is suitable for GitHub portfolios, Angular interviews, architecture demonstrations, YouTube walkthroughs, freelance showcases, and frontend system-design discussions.

---

## Tech Stack

| Technology | Purpose |
| --- | --- |
| Angular 20 | Primary frontend framework |
| TypeScript | Strongly typed application code |
| Standalone Components | Modern Angular component architecture |
| Angular Signals | Local and feature-level reactive state |
| RxJS | Async workflows and service streams |
| Angular Router | Navigation and lazy-loaded feature routes |
| Reactive Forms | Business forms and validation |
| Angular CDK | Drag/drop and interaction utilities |
| Bootstrap 5.3 | Responsive layout utilities |
| SCSS | Application styling |
| CSS Variables | Theme and design tokens |
| Font Awesome | Application icons |
| ApexCharts / Charts | Analytics visualization |
| Typed Mock Services | Frontend data-access layer |
| Local Storage | Demo session and preferences |

---

## User Roles

| Role | Primary Responsibility |
| --- | --- |
| Super Admin | System-wide configuration, users, roles and all HR data |
| HR Admin / HR Manager | Employees, departments, attendance, leave, recruitment and reports |
| Manager | Team overview, approvals, attendance, timesheets and performance |
| Employee | Self-service profile, attendance, leave, timesheets and documents |
| Payroll / Finance Viewer | Payroll overview and selected reports |

> Frontend role checks are demonstration-only. Production authorization must also be enforced by the backend.

---

## Main Features

### Authentication & Access

- Login
- Forgot Password
- Reset Password
- OTP / Verification UI
- Session Expired
- Unauthorized / Access Denied
- 404 page
- Authentication guard
- Role-aware route guard
- Current-user profile
- Logout workflow

### HR Dashboard

- Total Employees
- Active Employees
- Employees on Leave
- New Joiners
- Attendance Today
- Open Positions
- Pending Approvals
- Department distribution
- Attendance trend
- Employee growth
- Leave summary
- Upcoming birthdays
- Work anniversaries
- Recent activities
- Quick actions

### Employee Management

- Employee Directory
- Add Employee
- Edit Employee
- Employee Details
- Personal, employment and contact information
- Emergency contacts
- Job / Department / Manager details
- Compensation summary placeholder
- Documents
- Attendance summary
- Leave summary
- Performance summary
- Activity timeline
- Search, filtering, sorting and pagination
- Active / Inactive / On Leave / Terminated statuses
- Deactivate / terminate confirmation flow

### Organization Management

- Departments
- Department Details
- Create/Edit Department
- Designations / Job Titles
- Teams
- Office Locations
- Reporting hierarchy
- Department head assignment
- Organization summary

### Attendance Management

- Attendance Dashboard
- Daily Attendance
- Employee Attendance History
- Clock In / Clock Out demo
- Date-range filters
- Department/team filters
- Attendance correction requests
- Manager approval/rejection
- Monthly attendance summary

Attendance statuses:

```text
Present
Absent
Late
Half Day
Work From Home
```

### Leave Management

- Leave Dashboard
- My Leave
- Employee Leave
- Leave Requests
- Apply Leave
- Leave Details
- Leave Balance
- Leave Types
- Pending Approvals
- Approve / Reject workflow
- Manager comments
- Leave calendar
- Date and employee filters

Leave statuses:

```text
Pending
Approved
Rejected
Cancelled
```

### Timesheet Management

- Timesheet Dashboard
- My Timesheet
- Team Timesheets
- Add Time Entry
- Weekly Timesheet
- Project / Task association
- Billable / Non-billable tracking
- Submit Timesheet
- Approve / Reject Timesheet
- Timesheet status summary

### Payroll Overview

- Payroll Dashboard
- Employee Payroll List
- Salary Structure summary
- Earnings summary
- Deductions summary
- Net Pay overview
- Payroll month filter
- Payroll status
- Payslip preview UI
- Payroll analytics

> Version 1 is presentation/demo only and does not contain a real statutory payroll or tax calculation engine.

### Performance Management

- Performance Dashboard
- Employee Performance List
- Performance Review Details
- Review Cycles
- Goals / Objectives
- Goal progress
- Ratings
- Manager feedback
- Employee self-review placeholder
- Performance distribution
- Top performers

### Recruitment / ATS

- Recruitment Dashboard
- Job Openings
- Create/Edit Job Opening
- Candidate List
- Candidate Details
- Application Pipeline
- Angular CDK drag-and-drop
- Interview scheduling UI
- Candidate notes
- Offer status
- Recruitment analytics

Candidate stages:

```text
Applied
Screening
Interview
Offer
Hired
Rejected
```

### Employee Documents

- Document Center
- Employee Documents
- Document Categories
- Upload UI placeholder
- View / Download action placeholders
- Expiry date tracking
- Expiring documents widget
- Search and filters

### Reports & Analytics

- Workforce Overview Report
- Headcount Report
- Department Report
- Attendance Report
- Leave Report
- Timesheet Report
- Payroll Summary Report
- Performance Report
- Recruitment Report
- Date-range filters
- Department filters
- Charts and summary cards
- CSV/PDF export-ready UI

### Administration

- User Management
- Roles
- Permissions
- Role-Permission Matrix
- Approval configuration placeholder
- Audit Log
- System notifications
- Master data configuration

### Settings & Employee Self-Service

- My Profile
- Personal Preferences
- Theme preferences
- Notification Preferences
- Security Settings
- Change Password
- Company Settings
- Working Hours
- Holiday Calendar
- Leave Policy placeholder

---

## Architecture

```text
src/
├── app/
│   ├── core/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── services/
│   │   ├── models/
│   │   ├── constants/
│   │   ├── enums/
│   │   └── utils/
│   ├── shared/
│   │   ├── components/
│   │   ├── ui/
│   │   ├── directives/
│   │   ├── pipes/
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
├── environments/
└── styles/
```

---

## Example Employee Feature Structure

```text
employees/
├── pages/
│   ├── employee-list/
│   ├── employee-details/
│   └── employee-form/
├── components/
│   ├── employee-table/
│   ├── employee-summary/
│   ├── employee-personal-info/
│   ├── employee-job-info/
│   ├── employee-documents/
│   └── employee-activity-timeline/
├── data-access/
│   ├── employee.service.ts
│   └── employee.store.ts
├── models/
│   └── employee.model.ts
└── employee.routes.ts
```

---

## State Management

The application primarily uses **Angular Signals**.

```ts
readonly employees = signal<Employee[]>([]);

readonly activeEmployees = computed(() =>
  this.employees().filter(employee => employee.status === 'Active')
);
```

RxJS is used for asynchronous service workflows where stream semantics are more appropriate.

---

## Reactive Forms

```ts
readonly employeeForm = this.fb.nonNullable.group({
  firstName: ['', Validators.required],
  lastName: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  departmentId: ['', Validators.required],
  designation: ['', Validators.required],
  joiningDate: ['', Validators.required]
});
```

---

## Lazy Loading

```ts
{
  path: 'employees',
  loadChildren: () =>
    import('./features/employees/employee.routes')
      .then(routes => routes.EMPLOYEE_ROUTES)
}
```

---

## Responsive Design

Designed for:

- Desktop
- Laptop
- Tablet
- Mobile

Includes:

- Collapsible sidebar
- Mobile navigation
- Responsive tables
- Adaptive KPI cards
- Mobile-friendly forms
- Scrollable recruitment pipeline
- Responsive notification/profile dropdowns

---

## Light / Dark / System Theme

```scss
:root {
  --app-bg: #f8fafc;
  --surface: #ffffff;
  --text: #0f172a;
}

html.dark {
  --app-bg: #0f172a;
  --surface: #111827;
  --text: #f8fafc;
}
```

Supported preferences:

```text
Light
Dark
System
```

---

## Mock Data Architecture

```text
Component
   ↓
Feature Store / Data Access
   ↓
Domain Service
   ↓
Mock Database
```

The mock layer is structured to resemble future REST operations and can later be replaced by Spring Boot, Node/Express, NestJS, .NET, Firebase, or another backend.

---

## Recommended Full-Stack Evolution

```text
Angular 20
      ↓
Spring Boot REST API
      ↓
Spring Security + JWT
      ↓
Spring Data JPA
      ↓
MySQL
      ↓
Redis / Kafka
      ↓
Docker
      ↓
Kubernetes / Cloud
```

---

## Getting Started

### Prerequisites

```text
Node.js 20+
npm
Angular CLI 20
```

Check versions:

```bash
node -v
npm -v
ng version
```

### Clone

```bash
git clone https://github.com/YOUR_USERNAME/angular-enterprise-hrms.git
cd angular-enterprise-hrms
```

### Install

```bash
npm install
```

### Run

```bash
npm start
```

or:

```bash
ng serve
```

Open:

```text
http://localhost:4200
```

### Demo Login

```text
Email: admin@hrms.dev
Password: password
```

### Production Build

```bash
npm run build
```

---

## Recommended Screenshot Names

Store screenshots inside:

```text
docs/screenshots/
```

Use:

```text
hr-dashboard.png
hr-dashboard-dark.png
employees.png
employee-details.png
attendance.png
leave-management.png
leave-approval.png
timesheets.png
payroll.png
performance.png
recruitment-pipeline.png
documents.png
reports.png
administration.png
settings.png
mobile-view.png
```

---

## Suggested Portfolio / YouTube Demo Flow

1. Login as HR Admin
2. Review workforce KPIs
3. Toggle dark mode
4. Open notifications
5. Open current-user profile
6. Browse Employee Directory
7. Add/edit an employee
8. Open Employee Details
9. Review departments
10. View attendance
11. Clock In / Clock Out
12. Submit attendance correction
13. Apply for leave
14. Approve/reject leave
15. Review timesheets
16. Approve/reject timesheet
17. Review payroll
18. Open performance reviews
19. Review goals
20. Open recruitment pipeline
21. Drag candidate between stages
22. Review documents
23. Open reports
24. Review role-permission matrix
25. Open settings
26. Demonstrate mobile responsiveness

---

## Development Roadmap

### v1.0.0

- [x] Angular 20 architecture
- [x] Standalone Components
- [x] Signals
- [x] Authentication
- [x] Role-aware navigation
- [x] HR Dashboard
- [x] Employee Management
- [x] Organization
- [x] Attendance
- [x] Leave Management
- [x] Approval workflows
- [x] Timesheets
- [x] Payroll Overview
- [x] Performance
- [x] Recruitment / ATS
- [x] CDK recruitment pipeline
- [x] Documents
- [x] Reports
- [x] Administration
- [x] Settings
- [x] Notifications
- [x] Current-user profile
- [x] Light/Dark/System theme
- [x] Typed mock data layer
- [x] Responsive UI

### v1.1

- [ ] Spring Boot backend
- [ ] MySQL
- [ ] JWT authentication
- [ ] Refresh tokens
- [ ] Server-side pagination
- [ ] Real file upload
- [ ] CSV export
- [ ] PDF export
- [ ] Advanced analytics

### v2.0

- [ ] Production RBAC
- [ ] Biometric attendance
- [ ] Real payroll engine
- [ ] Email/SMS notifications
- [ ] WebSocket updates
- [ ] Advanced audit reporting
- [ ] Employee onboarding/offboarding
- [ ] Expense management
- [ ] Benefits administration
- [ ] Internationalization
- [ ] Multi-company support

---

## Security & Privacy

Use synthetic HR data only. Never commit real employee PII, payroll information, passwords, API keys, secrets, or private company data.

---

## Project Goals

This project demonstrates:

- Enterprise Angular architecture
- Feature-based design
- Standalone Components
- Angular Signals
- RxJS
- Reactive Forms
- Lazy-loaded routes
- Approval workflows
- Role-aware UI
- HR domain modeling
- Responsive SaaS design
- Angular CDK interactions
- Backend-ready frontend architecture

---

## Repository

```text
angular-enterprise-hrms
```

## Version

```text
v1.0.0
```

---

## Suggested GitHub Topics

```text
angular
angular20
typescript
hrms
human-resource-management
employee-management
standalone-components
angular-signals
rxjs
reactive-forms
angular-cdk
bootstrap
scss
dark-mode
enterprise-application
frontend
portfolio-project
attendance-management
leave-management
recruitment
```

---

## Author

**Jamshed Ahmad**  
Software Engineer | Frontend Developer

**Brand:** Code With Jamshed

---

## Connect

```text
GitHub:   https://github.com/Jamshed7664
LinkedIn: www.linkedin.com/in/jamshed-ahmad7664
YouTube:  https://www.youtube.com/@CodeWithJamshed
```

---

## Support

If you find this project useful:

- Star the repository
- Fork the project
- Share it with other developers
- Follow **Code With Jamshed**
- Subscribe for more Angular and full-stack projects

---

## License

This project is intended for learning, portfolio presentation, demonstrations and personal development.

You can add the MIT License if you want the repository to be publicly reusable.

---

<p align="center">
  <b>Built with Angular 20 ❤️ by Code With Jamshed</b>
</p>

<p align="center">
  Enterprise HRMS • Angular Signals • Standalone Components • Responsive UI
</p>
