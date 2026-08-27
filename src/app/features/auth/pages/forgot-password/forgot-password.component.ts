import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-card">
      <span class="eyebrow">Account recovery</span>
      <h2>Forgot password</h2>
      <p class="muted">Enter your work email to simulate a password reset request.</p>

      <label>Email address</label>
      <input class="form-control" type="email" [formControl]="email">

      <button class="btn btn-primary w-100 mt-3" type="button" (click)="send()">
        Send reset link
      </button>

      @if (sent()) {
        <div class="alert alert-success mt-3">
          Demo reset instructions have been generated.
        </div>
      }

      <a class="auth-back-link" routerLink="/auth/login">Back to sign in</a>
    </div>
  `
})
export class ForgotPasswordComponent {
  readonly email = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] });
  readonly sent = signal(false);

  send(): void {
    this.email.markAsTouched();
    if (this.email.valid) {
      this.sent.set(true);
    }
  }
}
