import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-card">
      <span class="eyebrow">Verification</span>
      <h2>Verify your account</h2>
      <p class="muted">Enter the six-digit demo verification code.</p>
      <input class="form-control otp-input" maxlength="6" [formControl]="code" placeholder="123456">
      <button class="btn btn-primary w-100 mt-3" type="button" (click)="verify()">Verify</button>
      @if (verified()) {
        <div class="alert alert-success mt-3">Verification successful.</div>
      }
      <a class="auth-back-link" routerLink="/auth/login">Back to sign in</a>
    </div>
  `
})
export class VerificationComponent {
  readonly code = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^\d{6}$/)] });
  readonly verified = signal(false);

  verify(): void {
    this.code.markAsTouched();
    this.verified.set(this.code.valid);
  }
}
