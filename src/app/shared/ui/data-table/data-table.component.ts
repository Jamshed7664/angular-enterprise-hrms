import { Component, input } from '@angular/core';

@Component({
  selector: 'app-data-table',
  standalone: true,
  template: `
    <div class="table-responsive">
      <table class="enterprise-table">
        @if (caption()) {
          <caption class="visually-hidden">{{ caption() }}</caption>
        }
        <ng-content />
      </table>
    </div>
  `
})
export class DataTableComponent {
  readonly caption = input('');
}
