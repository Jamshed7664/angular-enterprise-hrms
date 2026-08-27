import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <main class="auth-shell">
      <section class="auth-brand-panel">
        <div class="auth-brand">
          <span class="brand-mark">CJ</span>
          <div>
            <strong>Angular Enterprise HRMS</strong>
            <small>Code With Jamshed</small>
          </div>
        </div>

        <div class="auth-copy">
          <span class="eyebrow">Enterprise Human Resources</span>
          <h1>Manage people, performance and HR operations from one workspace.</h1>
          <p>
            A production-inspired Angular 20 portfolio application with realistic
            employee, attendance, leave, payroll and recruitment workflows.
          </p>

          <div class="auth-feature-grid">
            <span><i class="fa-solid fa-users"></i> Employee lifecycle</span>
            <span><i class="fa-solid fa-clock"></i> Attendance</span>
            <span><i class="fa-solid fa-calendar-check"></i> Leave approvals</span>
            <span><i class="fa-solid fa-chart-line"></i> HR analytics</span>
          </div>
        </div>
      </section>

      <section class="auth-form-panel">
        <router-outlet />
      </section>
    </main>
  `
})
export class AuthLayoutComponent {}
