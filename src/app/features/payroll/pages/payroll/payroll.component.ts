import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';

import { PayrollService } from '../../data-access/payroll.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-payroll',
  standalone: true,
  imports: [CurrencyPipe, PageHeaderComponent, StatusBadgeComponent],
  template: `
    <app-page-header
      eyebrow="Compensation"
      title="Payroll Overview"
      subtitle="Presentation-only payroll summary. Statutory calculation and payment processing are intentionally deferred."
    >
      <select class="form-select compact-control">
        <option>August 2026</option>
        <option>July 2026</option>
      </select>
    </app-page-header>

    <section class="kpi-grid four">
      <article class="kpi-card"><div class="kpi-icon"><i class="fa-solid fa-wallet"></i></div><div><span>Net Payroll</span><strong>{{ netPayroll() | currency:'INR':'symbol':'1.0-0' }}</strong><small>selected month</small></div></article>
      <article class="kpi-card"><div class="kpi-icon"><i class="fa-solid fa-plus"></i></div><div><span>Allowances</span><strong>{{ allowances() | currency:'INR':'symbol':'1.0-0' }}</strong><small>total</small></div></article>
      <article class="kpi-card"><div class="kpi-icon"><i class="fa-solid fa-minus"></i></div><div><span>Deductions</span><strong>{{ deductions() | currency:'INR':'symbol':'1.0-0' }}</strong><small>total</small></div></article>
      <article class="kpi-card"><div class="kpi-icon"><i class="fa-solid fa-circle-check"></i></div><div><span>Processed</span><strong>{{ processed() }}</strong><small>employee records</small></div></article>
    </section>

    <section class="panel">
      <div class="panel-heading"><div><span class="eyebrow">August 2026</span><h2>Employee Payroll</h2></div></div>
      <div class="table-responsive">
        <table class="enterprise-table">
          <thead><tr><th>Employee</th><th>Basic</th><th>Allowances</th><th>Deductions</th><th>Net Pay</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            @for (record of service.records(); track record.id) {
              <tr>
                <td><strong>{{ record.employeeName }}</strong></td>
                <td>{{ record.basic | currency:'INR':'symbol':'1.0-0' }}</td>
                <td>{{ record.allowances | currency:'INR':'symbol':'1.0-0' }}</td>
                <td>{{ record.deductions | currency:'INR':'symbol':'1.0-0' }}</td>
                <td><strong>{{ record.netPay | currency:'INR':'symbol':'1.0-0' }}</strong></td>
                <td><app-status-badge [status]="record.status" /></td>
                <td>
                  @if (record.status === 'Processed') {
                    <button class="btn btn-sm btn-primary" type="button" (click)="service.markPaid(record.id)">Mark Paid</button>
                  } @else {
                    <button class="btn btn-sm btn-light" type="button">Payslip</button>
                  }
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </section>

    <div class="info-banner mt-panel">
      <i class="fa-solid fa-circle-info"></i>
      <div>
        <strong>Demo payroll module</strong>
        <span>No real tax, statutory, banking or payment calculations are performed in v1.</span>
      </div>
    </div>
  `
})
export class PayrollComponent {
  readonly service = inject(PayrollService);
  readonly netPayroll = computed(() => this.service.records().reduce((sum, item) => sum + item.netPay, 0));
  readonly allowances = computed(() => this.service.records().reduce((sum, item) => sum + item.allowances, 0));
  readonly deductions = computed(() => this.service.records().reduce((sum, item) => sum + item.deductions, 0));
  readonly processed = computed(() => this.service.records().filter((item) => item.status !== 'Draft').length);
}
