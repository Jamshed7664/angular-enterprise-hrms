import { Component, computed, inject, signal } from '@angular/core';

import { AttendanceService } from '../../data-access/attendance.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [PageHeaderComponent, StatusBadgeComponent],
  template: `
    <app-page-header
      eyebrow="Time & Attendance"
      title="Attendance Management"
      subtitle="Review daily attendance, employee hours and correction requests."
    >
      <button class="btn btn-primary" type="button" (click)="clockedIn.set(!clockedIn())">
        <i class="fa-solid fa-fingerprint"></i>
        {{ clockedIn() ? 'Clock Out' : 'Clock In' }}
      </button>
    </app-page-header>

    <section class="kpi-grid four">
      @for (metric of metrics(); track metric.label) {
        <article class="kpi-card">
          <div class="kpi-icon"><i [class]="metric.icon"></i></div>
          <div><span>{{ metric.label }}</span><strong>{{ metric.value }}</strong><small>{{ metric.note }}</small></div>
        </article>
      }
    </section>

    <section class="panel">
      <div class="panel-heading">
        <div><span class="eyebrow">Daily Attendance</span><h2>Today</h2></div>
        <div class="toolbar-inline">
          <select #department class="form-select compact-control" (change)="departmentFilter.set(department.value)">
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Human Resources</option>
            <option>Sales</option>
            <option>Finance</option>
          </select>
        </div>
      </div>

      <div class="table-responsive">
        <table class="enterprise-table">
          <thead><tr><th>Employee</th><th>Department</th><th>Check In</th><th>Check Out</th><th>Hours</th><th>Status</th></tr></thead>
          <tbody>
            @for (record of filteredRecords(); track record.id) {
              <tr>
                <td><strong>{{ record.employeeName }}</strong></td>
                <td>{{ record.department }}</td>
                <td>{{ record.checkIn }}</td>
                <td>{{ record.checkOut }}</td>
                <td>{{ record.hours }}</td>
                <td><app-status-badge [status]="record.status" /></td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </section>

    <section class="panel mt-panel">
      <div class="panel-heading">
        <div><span class="eyebrow">Approvals</span><h2>Attendance Corrections</h2></div>
      </div>
      <div class="stack-list">
        @for (request of service.corrections(); track request.id) {
          <div class="list-row">
            <div class="grow">
              <strong>{{ request.employeeName }}</strong>
              <small>{{ request.date }} · Requested {{ request.requestedStatus }} · {{ request.reason }}</small>
            </div>
            <app-status-badge [status]="request.status" />
            @if (request.status === 'Pending') {
              <button class="btn btn-sm btn-light" type="button" (click)="service.decideCorrection(request.id, false)">Reject</button>
              <button class="btn btn-sm btn-primary" type="button" (click)="service.decideCorrection(request.id, true)">Approve</button>
            }
          </div>
        }
      </div>
    </section>
  `
})
export class AttendanceComponent {
  readonly service = inject(AttendanceService);
  readonly departmentFilter = signal('All Departments');
  readonly clockedIn = signal(false);

  readonly filteredRecords = computed(() => {
    const department = this.departmentFilter();
    return this.service.records().filter((record) =>
      department === 'All Departments' || record.department === department
    );
  });

  readonly metrics = computed(() => {
    const records = this.service.records();
    return [
      { label: 'Present', value: records.filter((item) => item.status === 'Present').length, note: 'On time today', icon: 'fa-solid fa-user-check' },
      { label: 'Late', value: records.filter((item) => item.status === 'Late').length, note: 'Late arrivals', icon: 'fa-solid fa-clock' },
      { label: 'WFH', value: records.filter((item) => item.status === 'Work From Home').length, note: 'Remote today', icon: 'fa-solid fa-house-laptop' },
      { label: 'Absent', value: records.filter((item) => item.status === 'Absent').length, note: 'No attendance', icon: 'fa-solid fa-user-xmark' }
    ];
  });
}
