import { Routes } from '@angular/router';

export const DOCUMENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/documents/documents.component').then((m) => m.DocumentsComponent)
  }
];
