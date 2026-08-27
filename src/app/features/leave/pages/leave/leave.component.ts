import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MockDatabaseService } from '../../../../core/services/mock-database.service';
import { LeaveService } from '../../data-access/leave.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-leave',
  standalone: true,
  imports: [ReactiveFormsModule, PageHeaderComponent, StatusBadgeComponent],
  template: `
    <app-page-header
      eyebrow="Absence"
      title="Leave Management"
      subtitle="Track balances, submit leave and manage approval workflows."
    >
      <button class="btn btn-primary" type="button" (click)="showApplyForm.set(!showApplyForm())">
        <i class="fa-solid fa-calendar-plus"></i> Apply Leave
      </button>
    </app-page-header>

    <section class="kpi-grid four">
      <article class="kpi-card"><div class="kpi-icon"><i class="fa-solid fa-umbrella-beach"></i></div><div><span>Annual Leave</span><strong>14</strong><small>days available</small></div></article>
      <article class="kpi-card"><div class="kpi-icon"><i class="fa-solid fa-kit-medical"></i></div><div><span>Sick Leave</span><strong>8</strong><small>days available</small></div></article>
      <article class="kpi-card"><div class="kpi-icon"><i class="fa-solid fa-hourglass-half"></i></div><div><span>Pending</span><strong>{{ pendingCount() }}</strong><small>approval requests</small></div></article>
      <article class="kpi-card"><div class="kpi-icon"><i class="fa-solid fa-calendar-check"></i></div><div><span>Approved</span><strong>{{ approvedCount() }}</strong><small>current period</small></div></article>
    </section>

    @if (showApplyForm()) {
      <form class="panel inline-form-panel" [formGroup]="form" (ngSubmit)="submitLeave()">
        <div class="panel-heading"><h2>New Leave Request</h2></div>
        <div class="form-grid">
          <div>
            <label>Employee</label>
            <select class="form-select" formControlName="employeeId">
              @for (employee of db.employees(); track employee.id) {
                <option [value]="employee.id">{{ employee.firstName }} {{ employee.lastName }}</option>
              }
            </select>
          </div>
          <div><label>Leave Type</label><select class="form-select" formControlName="type"><option>Annual Leave</option><option>Sick Leave</option><option>Casual Leave</option></select></div>
          <div><label>From</label><input class="form-control" type="date" formControlName="fromDate"></div>
          <div><label>To</label><input class="form-control" type="date" formControlName="toDate"></div>
          <div><label>Days</label><input class="form-control" type="number" formControlName="days"></div>
          <div class="span-2"><label>Reason</label><textarea class="form-control" rows="3" formControlName="reason"></textarea></div>
        </div>
        <div class="form-actions">
          <button class="btn btn-light" type="button" (click)="showApplyForm.set(false)">Cancel</button>
          <button class="btn btn-primary" type="submit" [disabled]="form.invalid">Submit Request</button>
        </div>
      </form>
    }

    <section class="panel">
      <div class="panel-heading">
        <div><span class="eyebrow">Requests</span><h2>Leave Requests</h2></div>
        <select #status class="form-select compact-control" (change)="statusFilter.set(status.value)">
          <option>All</option><option>Pending</option><option>Approved</option><option>Rejected</option><option>Cancelled</option>
        </select>
      </div>

      <div class="table-responsive">
        <table class="enterprise-table">
          <thead><tr><th>Employee</th><th>Type</th><th>Dates</th><th>Days</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            @for (request of filteredRequests(); track request.id) {
              <tr>
                <td><strong>{{ request.employeeName }}</strong><small class="table-subtext">{{ request.reason }}</small></td>
                <td>{{ request.type }}</td>
                <td>{{ request.fromDate }} → {{ request.toDate }}</td>
                <td>{{ request.days }}</td>
                <td><app-status-badge [status]="request.status" /></td>
                <td>
                  @if (request.status === 'Pending') {
                    <div class="action-group">
                      <button class="btn btn-sm btn-light" type="button" (click)="service.updateStatus(request.id, 'Rejected', 'Not approved in demo workflow.')">Reject</button>
                      <button class="btn btn-sm btn-primary" type="button" (click)="service.updateStatus(request.id, 'Approved', 'Approved by HR Manager.')">Approve</button>
                    </div>
                  } @else {
                    <span class="muted">{{ request.managerComment || 'No action required' }}</span>
                  }
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  `
})
export class LeaveComponent {
  readonly service = inject(LeaveService);
  readonly db = inject(MockDatabaseService);
  readonly showApplyForm = signal(false);
  readonly statusFilter = signal('All');
  private readonly fb = inject(FormBuilder);

  readonly pendingCount = computed(() => this.service.requests().filter((request) => request.status === 'Pending').length);
  readonly approvedCount = computed(() => this.service.requests().filter((request) => request.status === 'Approved').length);
  readonly filteredRequests = computed(() => {
    const status = this.statusFilter();
    return this.service.requests().filter((request) => status === 'All' || request.status === status);
  });

  readonly form = this.fb.nonNullable.group({
    employeeId: [1, Validators.required],
    type: ['Annual Leave', Validators.required],
    fromDate: ['', Validators.required],
    toDate: ['', Validators.required],
    days: [1, [Validators.required, Validators.min(1)]],
    reason: ['', [Validators.required, Validators.minLength(5)]]
  });

  submitLeave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const raw = this.form.getRawValue();
    const employee = this.db.employees().find((item) => item.id === Number(raw.employeeId));
    if (!employee) {
      return;
    }
    this.service.create({
      ...raw,
      employeeId: Number(raw.employeeId),
      employeeName: `${employee.firstName} ${employee.lastName}`
    });
    this.showApplyForm.set(false);
  }
}
