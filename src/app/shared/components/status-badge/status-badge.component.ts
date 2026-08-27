import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  template: `
    <span class="status-badge" [attr.data-status]="statusKey()">
      {{ status() }}
    </span>
  `
})
export class StatusBadgeComponent {
  readonly status = input.required<string>();

  readonly statusKey = computed(() =>
    this.status().toLowerCase().replace(/\s+/g, '-')
  );
}
