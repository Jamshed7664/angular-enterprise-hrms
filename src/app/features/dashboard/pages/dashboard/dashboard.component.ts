import { SlicePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MockDatabaseService } from '../../../../core/services/mock-database.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, SlicePipe, PageHeaderComponent, StatusBadgeComponent],
  template: `
    <app-page-header
      eyebrow="HR Overview"
      title="Workforce Dashboard"
      subtitle="Monitor people operations, attendance, approvals and hiring from one workspace."
    >
      <a class="btn btn-primary" routerLink="/employees/new">
        <i class="fa-solid fa-user-plus"></i>
        Add Employee
      </a>
    </app-page-header>

    <section class="kpi-grid">
      @for (item of kpis(); track item.label) {
        <article class="kpi-card">
          <div class="kpi-icon"><i [class]="item.icon"></i></div>
          <div>
            <span>{{ item.label }}</span>
            <strong>{{ item.value }}</strong>
            <small>{{ item.note }}</small>
          </div>
        </article>
      }
    </section>

    <section class="dashboard-grid">
      <article class="panel span-2">
        <div class="panel-heading">
          <div>
            <span class="eyebrow">Workforce</span>
            <h2>Department distribution</h2>
          </div>
          <span class="muted">{{ totalDepartmentEmployees() }} employees</span>
        </div>

        <div class="bar-chart">
          @for (department of db.departments(); track department.id) {
            <div class="bar-row">
              <div class="bar-label">
                <span>{{ department.name }}</span>
                <strong>{{ department.employeeCount }}</strong>
              </div>
              <div class="bar-track">
                <span [style.width.%]="departmentWidth(department.employeeCount)"></span>
              </div>
            </div>
          }
        </div>
      </article>

      <article class="panel">
        <div class="panel-heading">
          <div>
            <span class="eyebrow">Today</span>
            <h2>Attendance summary</h2>
          </div>
        </div>

        <div class="metric-list">
          @for (item of attendanceSummary(); track item.label) {
            <div>
              <span>{{ item.label }}</span>
              <strong>{{ item.value }}</strong>
            </div>
          }
        </div>
      </article>

      <article class="panel">
        <div class="panel-heading">
          <div>
            <span class="eyebrow">Approvals</span>
            <h2>Pending requests</h2>
          </div>
          <a routerLink="/leave">Review</a>
        </div>

        <div class="stack-list">
          @for (leave of pendingLeaves(); track leave.id) {
            <div class="list-row">
              <div class="avatar-sm">{{ initials(leave.employeeName) }}</div>
              <div class="grow">
                <strong>{{ leave.employeeName }}</strong>
                <small>{{ leave.type }} · {{ leave.days }} day(s)</small>
              </div>
              <app-status-badge [status]="leave.status" />
            </div>
          }
        </div>
      </article>

      <article class="panel">
        <div class="panel-heading">
          <div>
            <span class="eyebrow">Talent</span>
            <h2>Recruitment pipeline</h2>
          </div>
          <a routerLink="/recruitment">Open ATS</a>
        </div>

        <div class="metric-list compact">
          @for (stage of candidateStages(); track stage.label) {
            <div>
              <span>{{ stage.label }}</span>
              <strong>{{ stage.value }}</strong>
            </div>
          }
        </div>
      </article>

      <article class="panel span-2">
        <div class="panel-heading">
          <div>
            <span class="eyebrow">People</span>
            <h2>Upcoming birthdays & anniversaries</h2>
          </div>
        </div>

        <div class="event-grid">
          @for (employee of db.employees().slice(0, 4); track employee.id) {
            <div class="event-card">
              <div class="avatar-sm">{{ initials(employee.firstName + ' ' + employee.lastName) }}</div>
              <div>
                <strong>{{ employee.firstName }} {{ employee.lastName }}</strong>
                <small>{{ employee.department }} · Birthday {{ employee.dateOfBirth | slice:5 }}</small>
              </div>
            </div>
          }
        </div>
      </article>
    </section>
  `
})
export class DashboardComponent {
  readonly db = inject(MockDatabaseService);

  readonly totalDepartmentEmployees = computed(() =>
    this.db.departments().reduce((sum, department) => sum + department.employeeCount, 0)
  );

  readonly pendingLeaves = computed(() =>
    this.db.leaveRequests().filter((request) => request.status === 'Pending')
  );

  readonly attendanceSummary = computed(() => {
    const records = this.db.attendance();
    return [
      { label: 'Present', value: records.filter((item) => item.status === 'Present').length },
      { label: 'Late', value: records.filter((item) => item.status === 'Late').length },
      { label: 'WFH', value: records.filter((item) => item.status === 'Work From Home').length },
      { label: 'Absent', value: records.filter((item) => item.status === 'Absent').length }
    ];
  });

  readonly candidateStages = computed(() => {
    const candidates = this.db.candidates();
    return ['Applied', 'Screening', 'Interview', 'Offer', 'Hired']
      .map((stage) => ({
        label: stage,
        value: candidates.filter((candidate) => candidate.stage === stage).length
      }));
  });

  readonly kpis = computed(() => [
    { label: 'Total Employees', value: this.totalDepartmentEmployees(), note: 'Across all departments', icon: 'fa-solid fa-users' },
    { label: 'Active Employees', value: this.db.employees().filter((employee) => employee.status === 'Active').length, note: 'Current workforce', icon: 'fa-solid fa-user-check' },
    { label: 'On Leave', value: this.db.employees().filter((employee) => employee.status === 'On Leave').length, note: 'Approved leave today', icon: 'fa-solid fa-plane-departure' },
    { label: 'Pending Approvals', value: this.pendingLeaves().length + this.db.corrections().filter((item) => item.status === 'Pending').length, note: 'Needs action', icon: 'fa-solid fa-clipboard-check' },
    { label: 'Open Positions', value: this.db.jobs().filter((job) => job.status === 'Open').reduce((sum, job) => sum + job.openings, 0), note: 'Active vacancies', icon: 'fa-solid fa-briefcase' },
    { label: 'New Joiners', value: 4, note: 'This month', icon: 'fa-solid fa-user-plus' }
  ]);

  departmentWidth(count: number): number {
    const max = Math.max(...this.db.departments().map((department) => department.employeeCount), 1);
    return Math.round((count / max) * 100);
  }

  initials(name: string): string {
    return name.split(' ').map((part) => part.charAt(0)).slice(0, 2).join('').toUpperCase();
  }
}
