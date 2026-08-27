import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-card">
      <span class="eyebrow">Welcome back</span>
      <h2>Sign in to HRMS</h2>
      <p class="muted">Use the demo account or any valid email with a 6+ character password.</p>

      <form [formGroup]="form" (ngSubmit)="submit()">
        <label>Email address</label>
        <input class="form-control" type="email" formControlName="email" placeholder="hr.manager@example.com">

        @if (form.controls.email.touched && form.controls.email.invalid) {
          <small class="field-error">Enter a valid email address.</small>
        }

        <label>Password</label>
        <input class="form-control" type="password" formControlName="password" placeholder="••••••••">

        @if (error()) {
          <div class="alert alert-danger py-2">{{ error() }}</div>
        }

        <button class="btn btn-primary w-100" type="submit" [disabled]="form.invalid">
          Sign In
        </button>
      </form>

      <div class="auth-links">
        <a routerLink="/auth/forgot-password">Forgot password?</a>
      </div>

      <div class="demo-box">
        <strong>Demo credentials</strong>
        <span>admin@hrms.dev</span>
        <span>password</span>
      </div>
    </div>
  `
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);

  readonly error = signal('');
  readonly form = this.fb.nonNullable.group({
    email: ['admin@hrms.dev', [Validators.required, Validators.email]],
    password: ['password', [Validators.required, Validators.minLength(6)]]
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.getRawValue();
    this.error.set(this.auth.login(email, password) ? '' : 'Unable to sign in.');
  }
}
