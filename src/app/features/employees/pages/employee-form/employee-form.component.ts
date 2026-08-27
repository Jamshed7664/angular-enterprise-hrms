import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { EmployeeStatus } from '../../../../core/models/hrms.models';
import { NotificationService } from '../../../../core/services/notification.service';
import { EmployeeService } from '../../data-access/employee.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, PageHeaderComponent],
  template: `
    <app-page-header
      eyebrow="Employees"
      [title]="isEdit ? 'Edit Employee' : 'Add Employee'"
      subtitle="Maintain personal, job and contact information."
    />

    <form class="panel form-panel" [formGroup]="form" (ngSubmit)="save()">
      <div class="form-section">
        <div class="section-heading">
          <h2>Personal information</h2>
          <p>Basic identity and contact details.</p>
        </div>

        <div class="form-grid">
          <div>
            <label>Employee Code *</label>
            <input class="form-control" formControlName="employeeCode">
          </div>
          <div>
            <label>First Name *</label>
            <input class="form-control" formControlName="firstName">
          </div>
          <div>
            <label>Last Name *</label>
            <input class="form-control" formControlName="lastName">
          </div>
          <div>
            <label>Email *</label>
            <input class="form-control" type="email" formControlName="email">
          </div>
          <div>
            <label>Phone *</label>
            <input class="form-control" formControlName="phone">
          </div>
          <div>
            <label>Date of Birth *</label>
            <input class="form-control" type="date" formControlName="dateOfBirth">
          </div>
          <div class="span-2">
            <label>Address *</label>
            <input class="form-control" formControlName="address">
          </div>
          <div>
            <label>Emergency Contact *</label>
            <input class="form-control" formControlName="emergencyContact">
          </div>
        </div>
      </div>

      <div class="form-section">
        <div class="section-heading">
          <h2>Employment information</h2>
          <p>Organization, reporting and employment status.</p>
        </div>

        <div class="form-grid">
          <div>
            <label>Department *</label>
            <select class="form-select" formControlName="department">
              <option>Engineering</option>
              <option>Human Resources</option>
              <option>Sales</option>
              <option>Finance</option>
              <option>Marketing</option>
            </select>
          </div>
          <div>
            <label>Designation *</label>
            <input class="form-control" formControlName="designation">
          </div>
          <div>
            <label>Manager *</label>
            <input class="form-control" formControlName="manager">
          </div>
          <div>
            <label>Location *</label>
            <input class="form-control" formControlName="location">
          </div>
          <div>
            <label>Join Date *</label>
            <input class="form-control" type="date" formControlName="joinDate">
          </div>
          <div>
            <label>Status *</label>
            <select class="form-select" formControlName="status">
              <option>Active</option>
              <option>Inactive</option>
              <option>On Leave</option>
              <option>Terminated</option>
            </select>
          </div>
          <div>
            <label>Annual CTC (₹) *</label>
            <input class="form-control" type="number" formControlName="salary">
          </div>
        </div>
      </div>

      @if (form.invalid && form.touched) {
        <div class="alert alert-danger">Please complete all required fields with valid values.</div>
      }

      <div class="form-actions">
        <a class="btn btn-light" routerLink="/employees">Cancel</a>
        <button class="btn btn-primary" type="submit">
          {{ isEdit ? 'Save Changes' : 'Create Employee' }}
        </button>
      </div>
    </form>
  `
})
export class EmployeeFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(EmployeeService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly notifications = inject(NotificationService);

  readonly employeeId = Number(this.route.snapshot.paramMap.get('id'));
  readonly isEdit = Number.isFinite(this.employeeId) && this.employeeId > 0;

  readonly form = this.fb.nonNullable.group({
    employeeCode: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[+\d][\d\s-]{7,}$/)]],
    department: ['Engineering', Validators.required],
    designation: ['', Validators.required],
    manager: ['', Validators.required],
    joinDate: ['', Validators.required],
    status: ['Active' as EmployeeStatus, Validators.required],
    location: ['', Validators.required],
    salary: [0, [Validators.required, Validators.min(1)]],
    dateOfBirth: ['', Validators.required],
    address: ['', Validators.required],
    emergencyContact: ['', Validators.required]
  });

  constructor() {
    if (this.isEdit) {
      const employee = this.service.getById(this.employeeId);
      if (employee) {
        this.form.patchValue(employee);
      }
    }
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    if (this.isEdit) {
      this.service.update(this.employeeId, this.form.getRawValue());
      this.notifications.show('Employee updated successfully.');
    } else {
      this.service.create(this.form.getRawValue());
      this.notifications.show('Employee created successfully.');
    }

    void this.router.navigateByUrl('/employees');
  }
}
