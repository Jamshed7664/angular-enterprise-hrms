import { Injectable, inject } from '@angular/core';

import { AttendanceStatus } from '../../../core/models/hrms.models';
import { MockDatabaseService } from '../../../core/services/mock-database.service';

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  private readonly db = inject(MockDatabaseService);
  readonly records = this.db.attendance.asReadonly();
  readonly corrections = this.db.corrections.asReadonly();

  updateStatus(id: number, status: AttendanceStatus): void {
    this.db.attendance.update((records) =>
      records.map((record) => record.id === id ? { ...record, status } : record)
    );
  }

  decideCorrection(id: number, approved: boolean): void {
    this.db.corrections.update((requests) =>
      requests.map((request) =>
        request.id === id ? { ...request, status: approved ? 'Approved' : 'Rejected' } : request
      )
    );
  }
}
