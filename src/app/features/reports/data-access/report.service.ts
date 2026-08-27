import { Injectable, computed, inject } from '@angular/core';

import { MockDatabaseService } from '../../../core/services/mock-database.service';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private readonly db = inject(MockDatabaseService);

  readonly workforce = computed(() => ({
    employees: this.db.departments().reduce((sum, item) => sum + item.employeeCount, 0),
    departments: this.db.departments().length,
    active: this.db.employees().filter((item) => item.status === 'Active').length,
    onLeave: this.db.employees().filter((item) => item.status === 'On Leave').length
  }));

  readonly attendanceRate = computed(() => {
    const records = this.db.attendance();
    if (!records.length) return 0;
    const present = records.filter((item) => item.status !== 'Absent').length;
    return Math.round((present / records.length) * 100);
  });

  readonly leaveApprovalRate = computed(() => {
    const requests = this.db.leaveRequests();
    const decided = requests.filter((item) => item.status === 'Approved' || item.status === 'Rejected');
    if (!decided.length) return 0;
    return Math.round((decided.filter((item) => item.status === 'Approved').length / decided.length) * 100);
  });
}
