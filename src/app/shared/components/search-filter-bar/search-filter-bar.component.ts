import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-filter-bar',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="toolbar">
      <div class="search-box">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input
          type="search"
          [placeholder]="placeholder()"
          [ngModel]="query()"
          (ngModelChange)="queryChange.emit($event)"
        >
      </div>

      <ng-content />
    </div>
  `
})
export class SearchFilterBarComponent {
  readonly query = input('');
  readonly placeholder = input('Search...');
  readonly queryChange = output<string>();
}
