import { Injectable, inject } from '@angular/core';

import { LeaveRequest, WorkflowStatus } from '../../../core/models/hrms.models';
import { MockDatabaseService } from '../../../core/services/mock-database.service';

@Injectable({ providedIn: 'root' })
export class LeaveService {
  private readonly db = inject(MockDatabaseService);
  readonly requests = this.db.leaveRequests.asReadonly();

  create(request: Omit<LeaveRequest, 'id' | 'status'>): void {
    this.db.leaveRequests.update((items) => [
      { ...request, id: Date.now(), status: 'Pending' },
      ...items
    ]);
  }

  updateStatus(id: number, status: WorkflowStatus, managerComment = ''): void {
    this.db.leaveRequests.update((items) =>
      items.map((item) => item.id === id ? { ...item, status, managerComment } : item)
    );
  }
}
