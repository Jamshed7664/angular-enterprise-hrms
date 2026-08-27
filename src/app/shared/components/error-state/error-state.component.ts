import { Component, output } from '@angular/core';

@Component({
  selector: 'app-error-state',
  standalone: true,
  template: `
    <div class="empty-state">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <h3>Unable to load data</h3>
      <p>Please try again. If the issue continues, check the application console.</p>
      <button class="btn btn-primary" type="button" (click)="retry.emit()">
        Retry
      </button>
    </div>
  `
})
export class ErrorStateComponent {
  readonly retry = output<void>();
}
