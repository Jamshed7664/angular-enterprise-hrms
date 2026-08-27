import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  template: `
    @if (open()) {
      <div class="modal-backdrop-custom" (click)="cancel.emit()">
        <section
          class="dialog-card"
          role="dialog"
          aria-modal="true"
          (click)="$event.stopPropagation()"
        >
          <div class="state-icon danger">
            <i class="fa-solid fa-triangle-exclamation"></i>
          </div>

          <h3>{{ title() }}</h3>
          <p>{{ message() }}</p>

          <div class="form-actions">
            <button class="btn btn-light" type="button" (click)="cancel.emit()">
              Cancel
            </button>
            <button class="btn btn-danger" type="button" (click)="confirm.emit()">
              {{ confirmLabel() }}
            </button>
          </div>
        </section>
      </div>
    }
  `
})
export class ConfirmationDialogComponent {
  readonly open = input(false);
  readonly title = input('Confirm action');
  readonly message = input('Are you sure you want to continue?');
  readonly confirmLabel = input('Confirm');

  readonly confirm = output<void>();
  readonly cancel = output<void>();
}
