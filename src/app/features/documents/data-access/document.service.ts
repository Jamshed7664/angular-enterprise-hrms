import { Injectable, inject } from '@angular/core';
import { EmployeeDocument } from '../../../core/models/hrms.models';
import { MockDatabaseService } from '../../../core/services/mock-database.service';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  private readonly db = inject(MockDatabaseService);
  readonly documents = this.db.documents.asReadonly();

  add(document: Omit<EmployeeDocument, 'id'>): void {
    this.db.documents.update((items) => [{ ...document, id: Date.now() }, ...items]);
  }
}
