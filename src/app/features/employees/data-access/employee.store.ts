import { Injectable, computed, inject, signal } from '@angular/core';

import { EmployeeService } from './employee.service';

@Injectable({ providedIn: 'root' })
export class EmployeeStore {
  private readonly service = inject(EmployeeService);

  readonly query = signal('');
  readonly status = signal('All');

  readonly employees = this.service.employees;

  readonly filteredEmployees = computed(() => {
    const query = this.query().trim().toLowerCase();
    const status = this.status();

    return this.employees().filter((employee) => {
      const matchesQuery =
        !query ||
        `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        employee.employeeCode.toLowerCase().includes(query) ||
        employee.department.toLowerCase().includes(query);

      return matchesQuery && (status === 'All' || employee.status === status);
    });
  });
}
