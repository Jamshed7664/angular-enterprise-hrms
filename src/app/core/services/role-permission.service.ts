import { Injectable, inject } from '@angular/core';

import { UserRole } from '../models/hrms.models';
import { MockDatabaseService } from './mock-database.service';

@Injectable({ providedIn: 'root' })
export class RolePermissionService {
  private readonly db = inject(MockDatabaseService);

  readonly roles = this.db.rolePermissions.asReadonly();

  can(role: UserRole, permission: string): boolean {
    const config = this.db.rolePermissions().find((item) => item.role === role);

    return !!config &&
      (config.permissions.includes('all') || config.permissions.includes(permission));
  }
}
