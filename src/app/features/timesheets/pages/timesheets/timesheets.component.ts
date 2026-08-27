import { Component, computed, inject } from '@angular/core';

import { TimesheetService } from '../../data-access/timesheet.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-timesheets',
  standalone: true,
  imports: [PageHeaderComponent, StatusBadgeComponent],
  template: `
    <app-page-header
      eyebrow="Time Tracking"
      title="Timesheets"
      subtitle="Track weekly hours, billable utilization and manager approvals."
    >
      <button class="btn btn-primary" type="button">
        <i class="fa-solid fa-plus"></i> Add Time Entry
      </button>
    </app-page-header>

    <section class="kpi-grid four">
      <article class="kpi-card"><div class="kpi-icon"><i class="fa-solid fa-clock"></i></div><div><span>Total Hours</span><strong>{{ totalHours() }}</strong><small>this week</small></div></article>
      <article class="kpi-card"><div class="kpi-icon"><i class="fa-solid fa-sack-dollar"></i></div><div><span>Billable</span><strong>{{ billableHours() }}</strong><small>hours</small></div></article>
      <article class="kpi-card"><div class="kpi-icon"><i class="fa-solid fa-paper-plane"></i></div><div><span>Submitted</span><strong>{{ submittedCount() }}</strong><small>awaiting review</small></div></article>
      <article class="kpi-card"><div class="kpi-icon"><i class="fa-solid fa-circle-check"></i></div><div><span>Approved</span><strong>{{ approvedCount() }}</strong><small>timesheets</small></div></article>
    </section>

    <section class="panel">
      <div class="panel-heading"><div><span class="eyebrow">Weekly View</span><h2>Team Timesheets</h2></div></div>
      <div class="table-responsive">
        <table class="enterprise-table">
          <thead><tr><th>Employee</th><th>Week</th><th>Total</th><th>Billable</th><th>Status</th><th>Workflow</th></tr></thead>
          <tbody>
            @for (timesheet of service.timesheets(); track timesheet.id) {
              <tr>
                <td><strong>{{ timesheet.employeeName }}</strong></td>
                <td>{{ timesheet.week }}</td>
                <td>{{ timesheet.totalHours }}h</td>
                <td>{{ timesheet.billableHours }}h</td>
                <td><app-status-badge [status]="timesheet.status" /></td>
                <td>
                  @if (timesheet.status === 'Draft') {
                    <button class="btn btn-sm btn-primary" type="button" (click)="service.updateStatus(timesheet.id, 'Submitted')">Submit</button>
                  } @else if (timesheet.status === 'Submitted') {
                    <div class="action-group">
                      <button class="btn btn-sm btn-light" type="button" (click)="service.updateStatus(timesheet.id, 'Rejected')">Reject</button>
                      <button class="btn btn-sm btn-primary" type="button" (click)="service.updateStatus(timesheet.id, 'Approved')">Approve</button>
                    </div>
                  } @else {
                    <span class="muted">Completed</span>
                  }
                </td>
              </tr>
              <tr class="detail-row">
                <td colspan="6">
                  @for (entry of timesheet.entries; track entry.id) {
                    <span class="time-chip">{{ entry.date }} · {{ entry.project }} · {{ entry.task }} · {{ entry.hours }}h · {{ entry.billable ? 'Billable' : 'Non-billable' }}</span>
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
export class TimesheetsComponent {
  readonly service = inject(TimesheetService);
  readonly totalHours = computed(() => this.service.timesheets().reduce((sum, item) => sum + item.totalHours, 0));
  readonly billableHours = computed(() => this.service.timesheets().reduce((sum, item) => sum + item.billableHours, 0));
  readonly submittedCount = computed(() => this.service.timesheets().filter((item) => item.status === 'Submitted').length);
  readonly approvedCount = computed(() => this.service.timesheets().filter((item) => item.status === 'Approved').length);
}
