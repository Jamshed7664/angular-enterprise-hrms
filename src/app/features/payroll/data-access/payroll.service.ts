import { Injectable, inject } from '@angular/core';

import { MockDatabaseService } from '../../../core/services/mock-database.service';

@Injectable({ providedIn: 'root' })
export class PayrollService {
  private readonly db = inject(MockDatabaseService);
  readonly records = this.db.payroll.asReadonly();

  markPaid(id: number): void {
    this.db.payroll.update((records) =>
      records.map((record) => record.id === id ? { ...record, status: 'Paid' } : record)
    );
  }
}
