import { Component, inject } from '@angular/core';

import { MockDatabaseService } from '../../../../core/services/mock-database.service';
import { ReportService } from '../../data-access/report.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [PageHeaderComponent],
  template: `
    <app-page-header
      eyebrow="People Analytics"
      title="Reports & Analytics"
      subtitle="Explore workforce, attendance, leave, payroll, performance and recruitment insights."
    >
      <button class="btn btn-light" type="button"><i class="fa-solid fa-file-csv"></i> Export CSV</button>
      <button class="btn btn-primary" type="button"><i class="fa-regular fa-file-pdf"></i> Export PDF</button>
    </app-page-header>

    <section class="panel report-filters">
      <div><label>From</label><input class="form-control" type="date" value="2026-08-01"></div>
      <div><label>To</label><input class="form-control" type="date" value="2026-08-31"></div>
      <div><label>Department</label><select class="form-select"><option>All Departments</option>@for (department of db.departments(); track department.id) {<option>{{ department.name }}</option>}</select></div>
      <button class="btn btn-primary" type="button">Apply Filters</button>
    </section>

    <section class="kpi-grid four">
      <article class="kpi-card"><div class="kpi-icon"><i class="fa-solid fa-users"></i></div><div><span>Headcount</span><strong>{{ service.workforce().employees }}</strong><small>workforce</small></div></article>
      <article class="kpi-card"><div class="kpi-icon"><i class="fa-solid fa-chart-pie"></i></div><div><span>Attendance Rate</span><strong>{{ service.attendanceRate() }}%</strong><small>selected period</small></div></article>
      <article class="kpi-card"><div class="kpi-icon"><i class="fa-solid fa-calendar-check"></i></div><div><span>Leave Approval</span><strong>{{ service.leaveApprovalRate() }}%</strong><small>decided requests</small></div></article>
      <article class="kpi-card"><div class="kpi-icon"><i class="fa-solid fa-building"></i></div><div><span>Departments</span><strong>{{ service.workforce().departments }}</strong><small>organization units</small></div></article>
    </section>

    <section class="dashboard-grid">
      <article class="panel span-2">
        <div class="panel-heading"><div><span class="eyebrow">Headcount Report</span><h2>Department Distribution</h2></div></div>
        <div class="bar-chart">
          @for (department of db.departments(); track department.id) {
            <div class="bar-row">
              <div class="bar-label"><span>{{ department.name }}</span><strong>{{ department.employeeCount }}</strong></div>
              <div class="bar-track"><span [style.width.%]="width(department.employeeCount)"></span></div>
            </div>
          }
        </div>
      </article>

      <article class="panel">
        <div class="panel-heading"><div><span class="eyebrow">Report Catalog</span><h2>Available Reports</h2></div></div>
        <div class="report-list">
          @for (report of reports; track report) {
            <button type="button"><i class="fa-solid fa-chart-column"></i><span>{{ report }}</span><i class="fa-solid fa-chevron-right"></i></button>
          }
        </div>
      </article>

      <article class="panel span-3">
        <div class="panel-heading"><div><span class="eyebrow">Attendance Report</span><h2>Current Snapshot</h2></div></div>
        <div class="metric-list">
          @for (status of attendanceStatuses; track status) {
            <div><span>{{ status }}</span><strong>{{ attendanceCount(status) }}</strong></div>
          }
        </div>
      </article>
    </section>
  `
})
export class ReportsComponent {
  readonly service = inject(ReportService);
  readonly db = inject(MockDatabaseService);
  readonly attendanceStatuses = ['Present', 'Late', 'Work From Home', 'Absent'];
  readonly reports = ['Workforce Overview', 'Headcount', 'Department', 'Attendance', 'Leave', 'Timesheet', 'Payroll Summary', 'Performance', 'Recruitment'];

  width(count: number): number {
    const max = Math.max(...this.db.departments().map((item) => item.employeeCount), 1);
    return Math.round((count / max) * 100);
  }

  attendanceCount(status: string): number {
    return this.db.attendance().filter((item) => item.status === status).length;
  }
}
