import { Component, inject } from '@angular/core';

import { MockDatabaseService } from '../../../../core/services/mock-database.service';
import { RolePermissionService } from '../../../../core/services/role-permission.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [PageHeaderComponent],
  template: `
    <app-page-header
      eyebrow="System"
      title="Administration"
      subtitle="Manage role permissions, approval configuration, audit activity and system controls."
    >
      <button class="btn btn-primary" type="button"><i class="fa-solid fa-user-shield"></i> Add User</button>
    </app-page-header>

    <section class="dashboard-grid">
      <article class="panel span-2">
        <div class="panel-heading"><div><span class="eyebrow">RBAC</span><h2>Role-Permission Matrix</h2></div></div>
        <div class="table-responsive">
          <table class="enterprise-table">
            <thead><tr><th>Role</th><th>Permissions</th><th>Level</th></tr></thead>
            <tbody>
              @for (role of permissions.roles(); track role.role) {
                <tr>
                  <td><strong>{{ role.role }}</strong></td>
                  <td>
                    <div class="permission-wrap">
                      @for (permission of role.permissions; track permission) {
                        <span class="permission-chip">{{ permission }}</span>
                      }
                    </div>
                  </td>
                  <td>{{ role.permissions.includes('all') ? 'Full Access' : 'Scoped Access' }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </article>

      <article class="panel">
        <div class="panel-heading"><div><span class="eyebrow">Configuration</span><h2>Approval Rules</h2></div></div>
        <div class="settings-list">
          <div><span><strong>Leave approval</strong><small>Manager → HR</small></span><input type="checkbox" checked></div>
          <div><span><strong>Attendance correction</strong><small>Manager approval</small></span><input type="checkbox" checked></div>
          <div><span><strong>Timesheet approval</strong><small>Reporting manager</small></span><input type="checkbox" checked></div>
        </div>
      </article>

      <article class="panel span-3">
        <div class="panel-heading"><div><span class="eyebrow">Compliance</span><h2>Audit Log</h2></div></div>
        <div class="table-responsive">
          <table class="enterprise-table">
            <thead><tr><th>Timestamp</th><th>Actor</th><th>Module</th><th>Action</th><th>Details</th></tr></thead>
            <tbody>
              @for (log of db.auditLogs(); track log.id) {
                <tr><td>{{ log.timestamp }}</td><td>{{ log.actor }}</td><td>{{ log.module }}</td><td><strong>{{ log.action }}</strong></td><td>{{ log.details }}</td></tr>
              }
            </tbody>
          </table>
        </div>
      </article>
    </section>
  `
})
export class AdministrationComponent {
  readonly db = inject(MockDatabaseService);
  readonly permissions = inject(RolePermissionService);
}
