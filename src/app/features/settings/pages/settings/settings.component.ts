import { TitleCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../../../core/services/auth.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { SettingsService } from '../../../../core/services/settings.service';
import { ThemeMode, ThemeService } from '../../../../core/services/theme.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule, TitleCasePipe, PageHeaderComponent],
  template: `
    <app-page-header
      eyebrow="Preferences"
      title="Settings & Self Service"
      subtitle="Manage your profile, company preferences, appearance, notifications and security."
    />

    <div class="settings-layout">
      <aside class="settings-nav">
        @for (tab of tabs; track tab.id) {
          <button type="button" [class.active]="activeTab() === tab.id" (click)="activeTab.set(tab.id)">
            <i [class]="tab.icon"></i>{{ tab.label }}
          </button>
        }
      </aside>

      <section class="panel settings-content">
        @if (activeTab() === 'profile') {
          <div class="section-heading"><h2>My Profile</h2><p>Personal account information used in this demo session.</p></div>
          <form [formGroup]="profileForm" (ngSubmit)="save('Profile saved.')">
            <div class="form-grid">
              <div><label>Name</label><input class="form-control" formControlName="name"></div>
              <div><label>Email</label><input class="form-control" formControlName="email"></div>
              <div><label>Role</label><input class="form-control" [value]="auth.user()?.role || ''" disabled></div>
              <div><label>Phone</label><input class="form-control" formControlName="phone"></div>
            </div>
            <div class="form-actions"><button class="btn btn-primary" type="submit">Save Profile</button></div>
          </form>
        }

        @if (activeTab() === 'appearance') {
          <div class="section-heading"><h2>Appearance</h2><p>Choose how the HRMS interface should look.</p></div>
          <div class="theme-options">
            @for (mode of themeModes; track mode) {
              <button type="button" [class.active]="theme.theme() === mode" (click)="theme.setTheme(mode)">
                <i [class]="themeIcon(mode)"></i>
                <strong>{{ mode | titlecase }}</strong>
                <small>{{ modeDescription(mode) }}</small>
              </button>
            }
          </div>
        }

        @if (activeTab() === 'notifications') {
          <div class="section-heading"><h2>Notification Preferences</h2><p>Control which HR events generate alerts.</p></div>
          <div class="settings-list">
            @for (preference of notificationPreferences; track preference.label) {
              <div><span><strong>{{ preference.label }}</strong><small>{{ preference.help }}</small></span><input type="checkbox" [checked]="preference.enabled"></div>
            }
          </div>
          <div class="form-actions"><button class="btn btn-primary" type="button" (click)="save('Notification preferences saved.')">Save Preferences</button></div>
        }

        @if (activeTab() === 'company') {
          <div class="section-heading"><h2>Company Settings</h2><p>Demo organization profile and working-hours configuration.</p></div>
          <form [formGroup]="companyForm" (ngSubmit)="save('Company settings saved.')">
            <div class="form-grid">
              <div><label>Company Name</label><input class="form-control" formControlName="companyName"></div>
              <div><label>Timezone</label><select class="form-select" formControlName="timezone"><option>Asia/Kolkata</option><option>UTC</option></select></div>
              <div><label>Working Start</label><input class="form-control" type="time" formControlName="startTime"></div>
              <div><label>Working End</label><input class="form-control" type="time" formControlName="endTime"></div>
            </div>
            <div class="form-actions"><button class="btn btn-primary" type="submit">Save Company Settings</button></div>
          </form>
        }

        @if (activeTab() === 'security') {
          <div class="section-heading"><h2>Security</h2><p>Change-password demonstration and session controls.</p></div>
          <div class="security-card">
            <i class="fa-solid fa-key"></i>
            <div class="grow"><strong>Change Password</strong><small>Use a strong, unique password for production accounts.</small></div>
            <button class="btn btn-light" type="button">Change</button>
          </div>
          <div class="security-card">
            <i class="fa-solid fa-shield-halved"></i>
            <div class="grow"><strong>Demo Session</strong><small>Authentication is frontend-only until a backend enforces authorization.</small></div>
            <button class="btn btn-danger-outline" type="button" (click)="auth.logout()">Sign Out</button>
          </div>
        }
      </section>
    </div>
  `
})
export class SettingsComponent {
  readonly auth = inject(AuthService);
  readonly theme = inject(ThemeService);
  readonly settings = inject(SettingsService);
  private readonly notifications = inject(NotificationService);
  private readonly fb = inject(FormBuilder);

  readonly activeTab = signal('profile');
  readonly themeModes: ThemeMode[] = ['light', 'dark', 'system'];
  readonly tabs = [
    { id: 'profile', label: 'My Profile', icon: 'fa-regular fa-user' },
    { id: 'company', label: 'Company', icon: 'fa-regular fa-building' },
    { id: 'appearance', label: 'Appearance', icon: 'fa-solid fa-palette' },
    { id: 'notifications', label: 'Notifications', icon: 'fa-regular fa-bell' },
    { id: 'security', label: 'Security', icon: 'fa-solid fa-shield-halved' }
  ];

  readonly profileForm = this.fb.nonNullable.group({
    name: [this.auth.user()?.name ?? 'Meera Iyer', Validators.required],
    email: [this.auth.user()?.email ?? 'admin@hrms.dev', [Validators.required, Validators.email]],
    phone: ['+91 90000 10002']
  });

  readonly companyForm = this.fb.nonNullable.group({
    companyName: ['Northstar Technologies', Validators.required],
    timezone: ['Asia/Kolkata', Validators.required],
    startTime: ['09:00', Validators.required],
    endTime: ['18:00', Validators.required]
  });

  readonly notificationPreferences = [
    { label: 'Leave approvals', help: 'New leave requests and approval outcomes.', enabled: true },
    { label: 'Attendance corrections', help: 'Correction requests requiring review.', enabled: true },
    { label: 'Recruitment activity', help: 'Candidate and interview updates.', enabled: true },
    { label: 'Payroll updates', help: 'Monthly payroll processing notifications.', enabled: false }
  ];

  save(message: string): void {
    this.notifications.show(message);
  }

  themeIcon(mode: ThemeMode): string {
    return mode === 'light' ? 'fa-solid fa-sun' : mode === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-display';
  }

  modeDescription(mode: ThemeMode): string {
    return mode === 'light' ? 'Bright workspace' : mode === 'dark' ? 'Low-light workspace' : 'Follow device preference';
  }
}
