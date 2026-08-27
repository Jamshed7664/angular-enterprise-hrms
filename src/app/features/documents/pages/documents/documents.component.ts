import { Component, computed, inject, signal } from '@angular/core';

import { DocumentService } from '../../data-access/document.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [PageHeaderComponent, StatusBadgeComponent],
  template: `
    <app-page-header
      eyebrow="Employee Records"
      title="Document Center"
      subtitle="Track employee document metadata, categories and expiry status."
    >
      <button class="btn btn-primary" type="button">
        <i class="fa-solid fa-cloud-arrow-up"></i> Upload Document
      </button>
    </app-page-header>

    <section class="kpi-grid four">
      <article class="kpi-card"><div class="kpi-icon"><i class="fa-solid fa-file"></i></div><div><span>Total Documents</span><strong>{{ service.documents().length }}</strong><small>metadata records</small></div></article>
      <article class="kpi-card"><div class="kpi-icon"><i class="fa-solid fa-circle-check"></i></div><div><span>Valid</span><strong>{{ count('Valid') }}</strong><small>current documents</small></div></article>
      <article class="kpi-card"><div class="kpi-icon"><i class="fa-solid fa-triangle-exclamation"></i></div><div><span>Expiring</span><strong>{{ count('Expiring') }}</strong><small>needs attention</small></div></article>
      <article class="kpi-card"><div class="kpi-icon"><i class="fa-solid fa-circle-xmark"></i></div><div><span>Expired</span><strong>{{ count('Expired') }}</strong><small>action required</small></div></article>
    </section>

    <section class="panel">
      <div class="toolbar">
        <div class="search-box">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input #query type="search" placeholder="Search employee or document..." (input)="search.set(query.value)">
        </div>
        <select #status class="form-select compact-control" (change)="filter.set(status.value)">
          <option>All</option><option>Valid</option><option>Expiring</option><option>Expired</option>
        </select>
      </div>

      <div class="table-responsive">
        <table class="enterprise-table">
          <thead><tr><th>Document</th><th>Employee</th><th>Category</th><th>Expiry</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            @for (document of filteredDocuments(); track document.id) {
              <tr>
                <td><strong><i class="fa-regular fa-file-pdf me-2"></i>{{ document.fileName }}</strong></td>
                <td>{{ document.employeeName }}</td>
                <td>{{ document.category }}</td>
                <td>{{ document.expiryDate || '—' }}</td>
                <td><app-status-badge [status]="document.status" /></td>
                <td><button class="icon-action" type="button" aria-label="View"><i class="fa-regular fa-eye"></i></button><button class="icon-action" type="button" aria-label="Download"><i class="fa-solid fa-download"></i></button></td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </section>

    <div class="info-banner mt-panel">
      <i class="fa-solid fa-circle-info"></i>
      <div><strong>Mock storage only</strong><span>v1 stores document metadata only. Real upload/download storage is deferred.</span></div>
    </div>
  `
})
export class DocumentsComponent {
  readonly service = inject(DocumentService);
  readonly search = signal('');
  readonly filter = signal('All');

  readonly filteredDocuments = computed(() => {
    const query = this.search().trim().toLowerCase();
    const status = this.filter();
    return this.service.documents().filter((document) => {
      const matchesQuery = !query || document.employeeName.toLowerCase().includes(query) || document.fileName.toLowerCase().includes(query);
      return matchesQuery && (status === 'All' || document.status === status);
    });
  });

  count(status: 'Valid' | 'Expiring' | 'Expired'): number {
    return this.service.documents().filter((document) => document.status === status).length;
  }
}
