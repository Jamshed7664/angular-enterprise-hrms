import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { DepartmentService } from '../../data-access/department.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-organization',
  standalone: true,
  imports: [ReactiveFormsModule, PageHeaderComponent],
  template: `
    <app-page-header
      eyebrow="Organization"
      title="Departments & Structure"
      subtitle="Manage departments, leadership, office locations and reporting structure."
    >
      <button class="btn btn-primary" type="button" (click)="showForm.set(!showForm())">
        <i class="fa-solid fa-plus"></i> New Department
      </button>
    </app-page-header>

    @if (showForm()) {
      <form class="panel inline-form-panel" [formGroup]="form" (ngSubmit)="save()">
        <div class="form-grid">
          <div><label>Department Name</label><input class="form-control" formControlName="name"></div>
          <div><label>Code</label><input class="form-control" formControlName="code"></div>
          <div><label>Department Head</label><input class="form-control" formControlName="head"></div>
          <div><label>Location</label><input class="form-control" formControlName="location"></div>
          <div><label>Employee Count</label><input class="form-control" type="number" formControlName="employeeCount"></div>
        </div>
        <div class="form-actions">
          <button class="btn btn-light" type="button" (click)="showForm.set(false)">Cancel</button>
          <button class="btn btn-primary" type="submit" [disabled]="form.invalid">Save Department</button>
        </div>
      </form>
    }

    <section class="card-grid">
      @for (department of service.departments(); track department.id) {
        <article class="panel department-card">
          <div class="department-icon">{{ department.code }}</div>
          <div>
            <h2>{{ department.name }}</h2>
            <p>{{ department.location }}</p>
          </div>
          <dl class="detail-list compact">
            <div><dt>Department Head</dt><dd>{{ department.head }}</dd></div>
            <div><dt>Employees</dt><dd>{{ department.employeeCount }}</dd></div>
          </dl>
        </article>
      }
    </section>

    <section class="panel mt-panel">
      <div class="panel-heading">
        <div><span class="eyebrow">Hierarchy</span><h2>Reporting structure</h2></div>
      </div>
      <div class="org-chart">
        <div class="org-node primary">Chief People Officer</div>
        <div class="org-line"></div>
        <div class="org-row">
          @for (department of service.departments(); track department.id) {
            <div class="org-node">
              <strong>{{ department.head }}</strong>
              <span>{{ department.name }}</span>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class OrganizationComponent {
  readonly service = inject(DepartmentService);
  readonly showForm = signal(false);
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    code: ['', Validators.required],
    head: ['', Validators.required],
    employeeCount: [1, [Validators.required, Validators.min(1)]],
    location: ['', Validators.required]
  });

  save(): void {
    if (this.form.invalid) {
      return;
    }
    this.service.create(this.form.getRawValue());
    this.form.reset({ name: '', code: '', head: '', employeeCount: 1, location: '' });
    this.showForm.set(false);
  }
}
