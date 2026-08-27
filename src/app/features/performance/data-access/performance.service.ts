import { Injectable, inject } from '@angular/core';
import { MockDatabaseService } from '../../../core/services/mock-database.service';

@Injectable({ providedIn: 'root' })
export class PerformanceService {
  private readonly db = inject(MockDatabaseService);
  readonly reviews = this.db.performance.asReadonly();

  updateGoalProgress(reviewId: number, goalId: number, progress: number): void {
    this.db.performance.update((reviews) =>
      reviews.map((review) => review.id === reviewId
        ? {
            ...review,
            goals: review.goals.map((goal) =>
              goal.id === goalId
                ? { ...goal, progress, status: progress >= 100 ? 'Completed' : progress < 60 ? 'At Risk' : 'On Track' }
                : goal
            )
          }
        : review
      )
    );
  }
}
