import { Routes } from '@angular/router';

export const PERFORMANCE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/performance/performance.component').then((m) => m.PerformanceComponent)
  }
];
