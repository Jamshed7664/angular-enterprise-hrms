import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent)
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./pages/forgot-password/forgot-password.component')
        .then((m) => m.ForgotPasswordComponent)
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./pages/reset-password/reset-password.component')
        .then((m) => m.ResetPasswordComponent)
  },
  {
    path: 'verify',
    loadComponent: () =>
      import('./pages/verification/verification.component')
        .then((m) => m.VerificationComponent)
  },
  {
    path: 'session-expired',
    loadComponent: () =>
      import('./pages/session-expired/session-expired.component')
        .then((m) => m.SessionExpiredComponent)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  }
];
