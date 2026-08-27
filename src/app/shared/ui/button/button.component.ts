import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button
      type="button"
      class="btn"
      [class.btn-primary]="variant() === 'primary'"
      [class.btn-light]="variant() === 'secondary'"
      [class.btn-danger]="variant() === 'danger'"
      [disabled]="disabled()"
    >
      <ng-content />
    </button>
  `
})
export class ButtonComponent {
  readonly variant = input<'primary' | 'secondary' | 'danger'>('primary');
  readonly disabled = input(false);
}
