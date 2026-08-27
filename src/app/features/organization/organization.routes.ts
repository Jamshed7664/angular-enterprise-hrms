import { Routes } from '@angular/router';

export const ORGANIZATION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/organization/organization.component')
        .then((m) => m.OrganizationComponent)
  }
];
