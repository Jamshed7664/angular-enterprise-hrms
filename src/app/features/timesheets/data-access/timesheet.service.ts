import { Injectable, inject } from '@angular/core';

import { TimesheetStatus } from '../../../core/models/hrms.models';
import { MockDatabaseService } from '../../../core/services/mock-database.service';

@Injectable({ providedIn: 'root' })
export class TimesheetService {
  private readonly db = inject(MockDatabaseService);
  readonly timesheets = this.db.timesheets.asReadonly();

  updateStatus(id: number, status: TimesheetStatus): void {
    this.db.timesheets.update((items) =>
      items.map((item) => item.id === id ? { ...item, status } : item)
    );
  }
}
