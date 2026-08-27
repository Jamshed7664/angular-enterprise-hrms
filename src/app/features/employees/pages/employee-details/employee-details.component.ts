import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { MockDatabaseService } from '../../../../core/services/mock-database.service';
import { EmployeeService } from '../../data-access/employee.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink, PageHeaderComponent, StatusBadgeComponent],
  template: `
    @if (employee(); as employee) {
      <app-page-header
        eyebrow="Employee Profile"
        [title]="employee.firstName + ' ' + employee.lastName"
        [subtitle]="employee.employeeCode + ' · ' + employee.designation"
      >
        <a class="btn btn-light" routerLink="/employees">Back</a>
        <a class="btn btn-primary" [routerLink]="['/employees', employee.id, 'edit']">Edit Profile</a>
      </app-page-header>

      <section class="profile-hero panel">
        <div class="profile-avatar">{{ employee.firstName.charAt(0) }}{{ employee.lastName.charAt(0) }}</div>
        <div class="grow">
          <div class="profile-title">
            <h2>{{ employee.firstName }} {{ employee.lastName }}</h2>
            <app-status-badge [status]="employee.status" />
          </div>
          <p>{{ employee.designation }} · {{ employee.department }}</p>
          <div class="profile-meta">
            <span><i class="fa-solid fa-location-dot"></i> {{ employee.location }}</span>
            <span><i class="fa-solid fa-envelope"></i> {{ employee.email }}</span>
            <span><i class="fa-solid fa-phone"></i> {{ employee.phone }}</span>
          </div>
        </div>
      </section>

      <section class="details-grid">
        <article class="panel">
          <div class="panel-heading"><h2>Personal Information</h2></div>
          <dl class="detail-list">
            <div><dt>Date of birth</dt><dd>{{ employee.dateOfBirth | date:'mediumDate' }}</dd></div>
            <div><dt>Address</dt><dd>{{ employee.address }}</dd></div>
            <div><dt>Emergency contact</dt><dd>{{ employee.emergencyContact }}</dd></div>
          </dl>
        </article>

        <article class="panel">
          <div class="panel-heading"><h2>Employment Information</h2></div>
          <dl class="detail-list">
            <div><dt>Join date</dt><dd>{{ employee.joinDate | date:'mediumDate' }}</dd></div>
            <div><dt>Manager</dt><dd>{{ employee.manager }}</dd></div>
            <div><dt>Annual CTC</dt><dd>{{ employee.salary | currency:'INR':'symbol':'1.0-0' }}</dd></div>
          </dl>
        </article>

        <article class="panel">
          <div class="panel-heading"><h2>Attendance Summary</h2></div>
          <div class="summary-number">{{ employeeAttendance().length }}</div>
          <p class="muted">Attendance records available in this demo period.</p>
        </article>

        <article class="panel">
          <div class="panel-heading"><h2>Leave Summary</h2></div>
          <div class="summary-number">{{ employeeLeaves().length }}</div>
          <p class="muted">Leave request(s) associated with this employee.</p>
        </article>

        <article class="panel span-2">
          <div class="panel-heading"><h2>Documents</h2></div>
          <div class="stack-list">
            @for (document of employeeDocuments(); track document.id) {
              <div class="list-row">
                <i class="fa-regular fa-file-pdf list-icon"></i>
                <div class="grow">
                  <strong>{{ document.fileName }}</strong>
                  <small>{{ document.category }}</small>
                </div>
                <app-status-badge [status]="document.status" />
              </div>
            } @empty {
              <div class="empty-table">No documents attached in the demo dataset.</div>
            }
          </div>
        </article>
      </section>
    } @else {
      <div class="panel standalone-state">
        <h2>Employee not found</h2>
        <a class="btn btn-primary" routerLink="/employees">Back to directory</a>
      </div>
    }
  `
})
export class EmployeeDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(EmployeeService);
  private readonly db = inject(MockDatabaseService);

  readonly id = Number(this.route.snapshot.paramMap.get('id'));
  readonly employee = computed(() => this.service.getById(this.id));
  readonly employeeAttendance = computed(() => this.db.attendance().filter((item) => item.employeeId === this.id));
  readonly employeeLeaves = computed(() => this.db.leaveRequests().filter((item) => item.employeeId === this.id));
  readonly employeeDocuments = computed(() => {
    const employee = this.employee();
    if (!employee) {
      return [];
    }
    const name = `${employee.firstName} ${employee.lastName}`;
    return this.db.documents().filter((item) => item.employeeName === name);
  });
}
