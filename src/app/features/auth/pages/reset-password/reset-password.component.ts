import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-card">
      <span class="eyebrow">Security</span>
      <h2>Reset password</h2>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <label>New password</label>
        <input class="form-control" type="password" formControlName="password">

        <label>Confirm password</label>
        <input class="form-control" type="password" formControlName="confirmPassword">

        @if (mismatch()) {
          <small class="field-error">Passwords must match.</small>
        }

        <button class="btn btn-primary w-100 mt-3" type="submit">Update password</button>
      </form>

      @if (saved()) {
        <div class="alert alert-success mt-3">Password updated in the demo flow.</div>
      }

      <a class="auth-back-link" routerLink="/auth/login">Return to login</a>
    </div>
  `
})
export class ResetPasswordComponent {
  readonly saved = signal(false);
  readonly form = new FormGroup({
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] }),
    confirmPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  mismatch(): boolean {
    const value = this.form.getRawValue();
    return this.form.touched && value.password !== value.confirmPassword;
  }

  submit(): void {
    this.form.markAllAsTouched();
    const value = this.form.getRawValue();
    this.saved.set(this.form.valid && value.password === value.confirmPassword);
  }
}
