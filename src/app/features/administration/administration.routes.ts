import { Routes } from '@angular/router';

export const ADMINISTRATION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/administration/administration.component')
        .then((m) => m.AdministrationComponent)
  }
];
