import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  template: `
    @if (open()) {
      <div class="modal-backdrop-custom" (click)="closed.emit()">
        <section
          class="dialog-card"
          role="dialog"
          aria-modal="true"
          [attr.aria-label]="title()"
          (click)="$event.stopPropagation()"
        >
          <div class="panel-heading">
            <h2>{{ title() }}</h2>
            <button class="icon-btn" type="button" aria-label="Close" (click)="closed.emit()">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <ng-content />
        </section>
      </div>
    }
  `
})
export class ModalComponent {
  readonly open = input(false);
  readonly title = input('Dialog');
  readonly closed = output<void>();
}
