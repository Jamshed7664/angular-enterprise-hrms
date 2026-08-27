import { DecimalPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';

import { PerformanceService } from '../../data-access/performance.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-performance',
  standalone: true,
  imports: [DecimalPipe, PageHeaderComponent, StatusBadgeComponent],
  template: `
    <app-page-header
      eyebrow="Talent Development"
      title="Performance Management"
      subtitle="Manage review cycles, goals, ratings and manager feedback."
    >
      <button class="btn btn-primary" type="button"><i class="fa-solid fa-plus"></i> New Review Cycle</button>
    </app-page-header>

    <section class="kpi-grid four">
      <article class="kpi-card"><div class="kpi-icon"><i class="fa-solid fa-star"></i></div><div><span>Average Rating</span><strong>{{ averageRating() | number:'1.1-1' }}</strong><small>out of 5</small></div></article>
      <article class="kpi-card"><div class="kpi-icon"><i class="fa-solid fa-trophy"></i></div><div><span>Top Performers</span><strong>{{ topPerformers() }}</strong><small>rating ≥ 4.5</small></div></article>
      <article class="kpi-card"><div class="kpi-icon"><i class="fa-solid fa-bullseye"></i></div><div><span>Goals On Track</span><strong>{{ onTrackGoals() }}</strong><small>active objectives</small></div></article>
      <article class="kpi-card"><div class="kpi-icon"><i class="fa-solid fa-check-double"></i></div><div><span>Completed Reviews</span><strong>{{ completedReviews() }}</strong><small>current cycle</small></div></article>
    </section>

    <section class="card-grid two">
      @for (review of service.reviews(); track review.id) {
        <article class="panel review-card">
          <div class="review-head">
            <div class="avatar-sm">{{ initials(review.employeeName) }}</div>
            <div class="grow">
              <h2>{{ review.employeeName }}</h2>
              <p>{{ review.cycle }} · Manager: {{ review.manager }}</p>
            </div>
            <div class="rating-box"><i class="fa-solid fa-star"></i>{{ review.rating }}</div>
          </div>

          <p class="review-feedback">{{ review.feedback }}</p>

          @for (goal of review.goals; track goal.id) {
            <div class="goal-block">
              <div class="bar-label">
                <strong>{{ goal.title }}</strong>
                <span>{{ goal.progress }}%</span>
              </div>
              <div class="bar-track"><span [style.width.%]="goal.progress"></span></div>
              <div class="goal-meta">
                <app-status-badge [status]="goal.status" />
                <small>Due {{ goal.dueDate }}</small>
              </div>
            </div>
          }
        </article>
      }
    </section>
  `
})
export class PerformanceComponent {
  readonly service = inject(PerformanceService);
  readonly averageRating = computed(() => {
    const values = this.service.reviews();
    return values.length ? values.reduce((sum, item) => sum + item.rating, 0) / values.length : 0;
  });
  readonly topPerformers = computed(() => this.service.reviews().filter((item) => item.rating >= 4.5).length);
  readonly onTrackGoals = computed(() => this.service.reviews().flatMap((item) => item.goals).filter((goal) => goal.status === 'On Track').length);
  readonly completedReviews = computed(() => this.service.reviews().filter((item) => item.status === 'Completed').length);

  initials(name: string): string {
    return name.split(' ').map((part) => part.charAt(0)).slice(0, 2).join('').toUpperCase();
  }
}
