import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  template: `
    <div class="pagination-bar">
      <span>Page {{ page() }} of {{ totalPages() }}</span>

      <div class="action-group">
        <button
          class="btn btn-sm btn-light"
          type="button"
          [disabled]="page() <= 1"
          (click)="pageChange.emit(page() - 1)"
        >
          Previous
        </button>

        <button
          class="btn btn-sm btn-light"
          type="button"
          [disabled]="page() >= totalPages()"
          (click)="pageChange.emit(page() + 1)"
        >
          Next
        </button>
      </div>
    </div>
  `
})
export class PaginationComponent {
  readonly page = input(1);
  readonly pageSize = input(10);
  readonly total = input(0);
  readonly pageChange = output<number>();

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.total() / this.pageSize()))
  );
}
