import { Routes } from '@angular/router';

export const TIMESHEET_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/timesheets/timesheets.component').then((m) => m.TimesheetsComponent)
  }
];
