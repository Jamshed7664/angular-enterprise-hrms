import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-access-denied',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="standalone-state">
      <div class="state-icon danger"><i class="fa-solid fa-shield-halved"></i></div>
      <h1>Access denied</h1>
      <p>Your current demo role does not have permission to open this area.</p>
      <a class="btn btn-primary" routerLink="/dashboard">Back to dashboard</a>
    </main>
  `
})
export class AccessDeniedComponent {}
