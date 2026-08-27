import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-session-expired',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="auth-card text-center">
      <div class="state-icon warning"><i class="fa-solid fa-clock-rotate-left"></i></div>
      <h2>Session expired</h2>
      <p class="muted">Your session has expired. Sign in again to continue securely.</p>
      <a class="btn btn-primary" routerLink="/auth/login">Sign in again</a>
    </div>
  `
})
export class SessionExpiredComponent {}
