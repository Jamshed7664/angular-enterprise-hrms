import { Injectable, inject } from '@angular/core';

import { Candidate, CandidateStage, JobOpening } from '../../../core/models/hrms.models';
import { MockDatabaseService } from '../../../core/services/mock-database.service';

@Injectable({ providedIn: 'root' })
export class RecruitmentService {
  private readonly db = inject(MockDatabaseService);
  readonly jobs = this.db.jobs.asReadonly();
  readonly candidates = this.db.candidates.asReadonly();

  updateCandidateStage(id: number, stage: CandidateStage): void {
    this.db.candidates.update((items) =>
      items.map((item) => item.id === id ? { ...item, stage } : item)
    );
  }

  addCandidate(candidate: Omit<Candidate, 'id'>): void {
    this.db.candidates.update((items) => [{ ...candidate, id: Date.now() }, ...items]);
  }

  addJob(job: Omit<JobOpening, 'id'>): void {
    this.db.jobs.update((items) => [{ ...job, id: Date.now() }, ...items]);
  }
}
