import { Injectable, inject } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

import { Employee } from '../../../core/models/hrms.models';
import { MockDatabaseService } from '../../../core/services/mock-database.service';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly db = inject(MockDatabaseService);

  readonly employees = this.db.employees.asReadonly();

  list(): Observable<Employee[]> {
    return of(this.db.employees()).pipe(delay(180));
  }

  getById(id: number): Employee | undefined {
    return this.db.employees().find((employee) => employee.id === id);
  }

  create(employee: Omit<Employee, 'id'>): Employee {
    const record: Employee = { ...employee, id: Date.now() };
    this.db.employees.update((employees) => [record, ...employees]);
    return record;
  }

  update(id: number, changes: Partial<Employee>): void {
    this.db.employees.update((employees) =>
      employees.map((employee) =>
        employee.id === id ? { ...employee, ...changes } : employee
      )
    );
  }

  deactivate(id: number): void {
    this.update(id, { status: 'Inactive' });
  }
}
