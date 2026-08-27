import { Routes } from '@angular/router';

export const RECRUITMENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/recruitment/recruitment.component').then((m) => m.RecruitmentComponent)
  }
];
