import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { Component, computed, inject } from '@angular/core';

import { Candidate, CandidateStage } from '../../../../core/models/hrms.models';
import { RecruitmentService } from '../../data-access/recruitment.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-recruitment',
  standalone: true,
  imports: [CdkDrag, CdkDropList, CdkDropListGroup, PageHeaderComponent, StatusBadgeComponent],
  template: `
    <app-page-header
      eyebrow="Applicant Tracking"
      title="Recruitment"
      subtitle="Manage openings, candidates, interviews and the hiring pipeline."
    >
      <button class="btn btn-primary" type="button"><i class="fa-solid fa-briefcase"></i> New Job Opening</button>
    </app-page-header>

    <section class="kpi-grid four">
      <article class="kpi-card"><div class="kpi-icon"><i class="fa-solid fa-briefcase"></i></div><div><span>Open Jobs</span><strong>{{ openJobs() }}</strong><small>active roles</small></div></article>
      <article class="kpi-card"><div class="kpi-icon"><i class="fa-solid fa-users"></i></div><div><span>Applicants</span><strong>{{ totalApplicants() }}</strong><small>across openings</small></div></article>
      <article class="kpi-card"><div class="kpi-icon"><i class="fa-solid fa-comments"></i></div><div><span>Interviews</span><strong>{{ candidatesFor('Interview').length }}</strong><small>in pipeline</small></div></article>
      <article class="kpi-card"><div class="kpi-icon"><i class="fa-solid fa-file-signature"></i></div><div><span>Offers</span><strong>{{ candidatesFor('Offer').length }}</strong><small>awaiting decision</small></div></article>
    </section>

    <section class="panel">
      <div class="panel-heading"><div><span class="eyebrow">Open Positions</span><h2>Job Openings</h2></div></div>
      <div class="job-grid">
        @for (job of service.jobs(); track job.id) {
          <article class="job-card">
            <div class="job-icon"><i class="fa-solid fa-briefcase"></i></div>
            <div class="grow">
              <div class="job-title"><h3>{{ job.title }}</h3><app-status-badge [status]="job.status" /></div>
              <p>{{ job.department }} · {{ job.location }} · {{ job.type }}</p>
              <small>{{ job.openings }} opening(s) · {{ job.applicants }} applicants</small>
            </div>
          </article>
        }
      </div>
    </section>

    <section class="panel mt-panel">
      <div class="panel-heading">
        <div><span class="eyebrow">Candidate Pipeline</span><h2>Applicant Tracking Board</h2></div>
        <span class="muted">Drag candidates between stages</span>
      </div>

      <div class="ats-board" cdkDropListGroup>
        @for (stage of stages; track stage) {
          <section
            class="ats-column"
            cdkDropList
            [id]="stage"
            [cdkDropListData]="candidatesFor(stage)"
            (cdkDropListDropped)="drop($event, stage)"
          >
            <div class="ats-column-head">
              <strong>{{ stage }}</strong>
              <span>{{ candidatesFor(stage).length }}</span>
            </div>

            @for (candidate of candidatesFor(stage); track candidate.id) {
              <article class="candidate-card" cdkDrag [cdkDragData]="candidate">
                <div class="candidate-top">
                  <div class="avatar-sm">{{ initials(candidate.name) }}</div>
                  <div class="grow">
                    <strong>{{ candidate.name }}</strong>
                    <small>{{ candidate.jobTitle }}</small>
                  </div>
                  <span class="candidate-rating"><i class="fa-solid fa-star"></i>{{ candidate.rating }}</span>
                </div>
                <p>{{ candidate.experience }} yrs · Applied {{ candidate.appliedDate }}</p>
                <small>{{ candidate.notes }}</small>
              </article>
            } @empty {
              <div class="ats-empty">Drop candidate here</div>
            }
          </section>
        }
      </div>
    </section>
  `
})
export class RecruitmentComponent {
  readonly service = inject(RecruitmentService);
  readonly stages: CandidateStage[] = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected'];

  readonly openJobs = computed(() => this.service.jobs().filter((job) => job.status === 'Open').length);
  readonly totalApplicants = computed(() => this.service.jobs().reduce((sum, job) => sum + job.applicants, 0));

  candidatesFor(stage: CandidateStage): Candidate[] {
    return this.service.candidates().filter((candidate) => candidate.stage === stage);
  }

  drop(event: CdkDragDrop<Candidate[]>, stage: CandidateStage): void {
    const candidate = event.item.data as Candidate;
    if (candidate && candidate.stage !== stage) {
      this.service.updateCandidateStage(candidate.id, stage);
    }
  }

  initials(name: string): string {
    return name.split(' ').map((part) => part.charAt(0)).slice(0, 2).join('').toUpperCase();
  }
}
