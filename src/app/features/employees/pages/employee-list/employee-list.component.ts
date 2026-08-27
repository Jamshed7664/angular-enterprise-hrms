import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { EmployeeStore } from '../../data-access/employee.store';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [RouterLink, PageHeaderComponent, StatusBadgeComponent],
  template: `
    <app-page-header
      eyebrow="People"
      title="Employee Directory"
      subtitle="Manage employee profiles, employment details and workforce status."
    >
      <a class="btn btn-primary" routerLink="/employees/new">
        <i class="fa-solid fa-user-plus"></i> Add Employee
      </a>
    </app-page-header>

    <section class="panel">
      <div class="toolbar">
        <div class="search-box">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input
            #search
            type="search"
            placeholder="Search name, email, code or department..."
            [value]="store.query()"
            (input)="store.query.set(search.value)"
          >
        </div>

        <select #status class="form-select compact-control" (change)="store.status.set(status.value)">
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>On Leave</option>
          <option>Terminated</option>
        </select>
      </div>

      <div class="table-responsive">
        <table class="enterprise-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Location</th>
              <th>Status</th>
              <th class="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            @for (employee of store.filteredEmployees(); track employee.id) {
              <tr>
                <td>
                  <a class="identity-cell" [routerLink]="['/employees', employee.id]">
                    <span class="avatar-sm">{{ initials(employee.firstName, employee.lastName) }}</span>
                    <span>
                      <strong>{{ employee.firstName }} {{ employee.lastName }}</strong>
                      <small>{{ employee.employeeCode }} · {{ employee.email }}</small>
                    </span>
                  </a>
                </td>
                <td>{{ employee.department }}</td>
                <td>{{ employee.designation }}</td>
                <td>{{ employee.location }}</td>
                <td><app-status-badge [status]="employee.status" /></td>
                <td class="text-end">
                  <a class="icon-action" [routerLink]="['/employees', employee.id]" aria-label="View employee">
                    <i class="fa-regular fa-eye"></i>
                  </a>
                  <a class="icon-action" [routerLink]="['/employees', employee.id, 'edit']" aria-label="Edit employee">
                    <i class="fa-regular fa-pen-to-square"></i>
                  </a>
                </td>
              </tr>
            } @empty {
              <tr><td colspan="6"><div class="empty-table">No employees match the selected filters.</div></td></tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  `
})
export class EmployeeListComponent {
  readonly store = inject(EmployeeStore);

  initials(firstName: string, lastName: string): string {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }
}
