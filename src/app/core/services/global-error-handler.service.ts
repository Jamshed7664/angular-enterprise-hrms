import { ErrorHandler, Injectable, inject } from '@angular/core';

import { NotificationService } from './notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private readonly notifications = inject(NotificationService);

  handleError(error: unknown): void {
    console.error('HRMS application error:', error);
    this.notifications.show('Something went wrong. Please try again.', 'error');
  }
}
