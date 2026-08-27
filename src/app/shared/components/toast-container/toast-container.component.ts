import { Component, inject } from '@angular/core';

import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  template: `
    <div class="toast-stack">
      @for (toast of notifications.toasts(); track toast.id) {
        <div
          class="crm-toast"
          [class.error]="toast.type === 'error'"
          [class.info]="toast.type === 'info'"
        >
          <span>{{ toast.message }}</span>
          <button
            type="button"
            aria-label="Dismiss notification"
            (click)="notifications.dismiss(toast.id)"
          >
            ×
          </button>
        </div>
      }
    </div>
  `
})
export class ToastContainerComponent {
  readonly notifications = inject(NotificationService);
}
