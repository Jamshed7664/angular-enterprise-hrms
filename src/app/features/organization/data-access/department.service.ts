import { Injectable, inject } from '@angular/core';
import { Department } from '../../../core/models/hrms.models';
import { MockDatabaseService } from '../../../core/services/mock-database.service';

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  private readonly db = inject(MockDatabaseService);
  readonly departments = this.db.departments.asReadonly();

  create(department: Omit<Department, 'id'>): void {
    this.db.departments.update((items) => [{ ...department, id: Date.now() }, ...items]);
  }

  update(id: number, changes: Partial<Department>): void {
    this.db.departments.update((items) =>
      items.map((item) => item.id === id ? { ...item, ...changes } : item)
    );
  }
}
