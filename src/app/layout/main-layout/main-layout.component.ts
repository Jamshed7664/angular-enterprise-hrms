import { Component, inject, signal } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ThemeService } from '../../core/services/theme.service';
import { NotificationDropdownComponent } from '../../shared/components/notification-dropdown/notification-dropdown.component';
import { ToastContainerComponent } from '../../shared/components/toast-container/toast-container.component';
import { UserProfileDropdownComponent } from '../../shared/components/user-profile-dropdown/user-profile-dropdown.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ToastContainerComponent,
    NotificationDropdownComponent,
    UserProfileDropdownComponent
  ],
  template: `
    <div class="app-shell" [class.sidebar-collapsed]="collapsed()">
      <aside class="sidebar">
        <div class="sidebar-brand">
          <span class="brand-mark">CJ</span>

          <div class="brand-copy">
            <b>Enterprise HRMS</b>
            <small>Code With Jamshed</small>
          </div>

          <button
            type="button"
            class="icon-btn desktop-only"
            aria-label="Toggle sidebar"
            (click)="toggleSidebar()"
          >
            <i class="fa-solid fa-bars"></i>
          </button>
        </div>

        <nav>
          @for (item of nav; track item.path) {
            <a [routerLink]="item.path" routerLinkActive="active">
              <i [class]="item.icon"></i>
              <span>{{ item.label }}</span>
            </a>
          }
        </nav>

        <div class="sidebar-foot">
          <button type="button" (click)="auth.logout()">
            <i class="fa-solid fa-right-from-bracket"></i>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <section class="main-area">
        <header class="topbar">
          <button
            type="button"
            class="icon-btn mobile-only"
            aria-label="Open navigation"
            (click)="toggleSidebar()"
          >
            <i class="fa-solid fa-bars"></i>
          </button>

          <div class="topbar-title">
            <b>HR Workspace</b>
            <small>People • Operations • Insights</small>
          </div>

          <div class="topbar-actions">
            <button
              type="button"
              class="icon-btn"
              aria-label="Switch theme"
              (click)="theme.toggle()"
            >
              <i
                [class]="
                  theme.effectiveTheme() === 'light'
                    ? 'fa-solid fa-moon'
                    : 'fa-solid fa-sun'
                "
              ></i>
            </button>

            <app-notification-dropdown />
            <app-user-profile-dropdown />
          </div>
        </header>

        <main class="content">
          <router-outlet />
        </main>
      </section>
    </div>

    <app-toast-container />
  `
})
export class MainLayoutComponent {
  readonly auth = inject(AuthService);
  readonly theme = inject(ThemeService);
  readonly collapsed = signal(false);

  readonly nav = [
    { label: 'Dashboard', path: '/dashboard', icon: 'fa-solid fa-chart-pie' },
    { label: 'Employees', path: '/employees', icon: 'fa-solid fa-id-badge' },
    { label: 'Organization', path: '/organization', icon: 'fa-solid fa-sitemap' },
    { label: 'Attendance', path: '/attendance', icon: 'fa-solid fa-user-clock' },
    { label: 'Leave Management', path: '/leave', icon: 'fa-solid fa-calendar-check' },
    { label: 'Timesheets', path: '/timesheets', icon: 'fa-solid fa-clock' },
    { label: 'Payroll', path: '/payroll', icon: 'fa-solid fa-money-check-dollar' },
    { label: 'Performance', path: '/performance', icon: 'fa-solid fa-bullseye' },
    { label: 'Recruitment', path: '/recruitment', icon: 'fa-solid fa-user-tie' },
    { label: 'Documents', path: '/documents', icon: 'fa-solid fa-folder-open' },
    { label: 'Reports', path: '/reports', icon: 'fa-solid fa-chart-line' },
    { label: 'Administration', path: '/administration', icon: 'fa-solid fa-user-shield' },
    { label: 'Settings', path: '/settings', icon: 'fa-solid fa-gear' }
  ];

  toggleSidebar(): void {
    this.collapsed.update((value) => !value);
  }
}
