import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  template: `
    <div class="empty-state">
      <i [class]="icon()"></i>
      <h3>{{ title() }}</h3>
      <p>{{ message() }}</p>
      <ng-content />
    </div>
  `
})
export class EmptyStateComponent {
  readonly title = input('No data found');
  readonly message = input('There is nothing to display yet.');
  readonly icon = input('fa-regular fa-folder-open');
}
