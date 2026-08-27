import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () =>
      import('./layout/auth-layout/auth-layout.component')
        .then((m) => m.AuthLayoutComponent),
    loadChildren: () =>
      import('./features/auth/auth.routes')
        .then((m) => m.AUTH_ROUTES)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/main-layout/main-layout.component')
        .then((m) => m.MainLayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes')
            .then((m) => m.DASHBOARD_ROUTES)
      },
      {
        path: 'employees',
        loadChildren: () =>
          import('./features/employees/employee.routes')
            .then((m) => m.EMPLOYEE_ROUTES)
      },
      {
        path: 'organization',
        loadChildren: () =>
          import('./features/organization/organization.routes')
            .then((m) => m.ORGANIZATION_ROUTES)
      },
      {
        path: 'attendance',
        loadChildren: () =>
          import('./features/attendance/attendance.routes')
            .then((m) => m.ATTENDANCE_ROUTES)
      },
      {
        path: 'leave',
        loadChildren: () =>
          import('./features/leave/leave.routes')
            .then((m) => m.LEAVE_ROUTES)
      },
      {
        path: 'timesheets',
        loadChildren: () =>
          import('./features/timesheets/timesheet.routes')
            .then((m) => m.TIMESHEET_ROUTES)
      },
      {
        path: 'payroll',
        canActivate: [roleGuard],
        data: { roles: ['Super Admin', 'HR Manager', 'Payroll Viewer'] },
        loadChildren: () =>
          import('./features/payroll/payroll.routes')
            .then((m) => m.PAYROLL_ROUTES)
      },
      {
        path: 'performance',
        loadChildren: () =>
          import('./features/performance/performance.routes')
            .then((m) => m.PERFORMANCE_ROUTES)
      },
      {
        path: 'recruitment',
        loadChildren: () =>
          import('./features/recruitment/recruitment.routes')
            .then((m) => m.RECRUITMENT_ROUTES)
      },
      {
        path: 'documents',
        loadChildren: () =>
          import('./features/documents/document.routes')
            .then((m) => m.DOCUMENT_ROUTES)
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./features/reports/report.routes')
            .then((m) => m.REPORT_ROUTES)
      },
      {
        path: 'administration',
        canActivate: [roleGuard],
        data: { roles: ['Super Admin', 'HR Manager'] },
        loadChildren: () =>
          import('./features/administration/administration.routes')
            .then((m) => m.ADMINISTRATION_ROUTES)
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./features/settings/settings.routes')
            .then((m) => m.SETTINGS_ROUTES)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      }
    ]
  },
  {
    path: 'access-denied',
    loadComponent: () =>
      import('./features/auth/pages/access-denied/access-denied.component')
        .then((m) => m.AccessDeniedComponent)
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/auth/pages/not-found/not-found.component')
        .then((m) => m.NotFoundComponent)
  }
];
