import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="standalone-state">
      <div class="state-icon"><i class="fa-solid fa-compass"></i></div>
      <h1>404</h1>
      <p>The HRMS page you requested could not be found.</p>
      <a class="btn btn-primary" routerLink="/dashboard">Go to dashboard</a>
    </main>
  `
})
export class NotFoundComponent {}
