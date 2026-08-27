import {
  Component,
  HostListener,
  computed,
  inject,
  signal
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { getInitials } from '../../../core/utils/date.utils';

@Component({
  selector: 'app-user-profile-dropdown',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="dropdown-wrap">
      <button type="button" class="user-chip" (click)="toggle($event)">
        <span class="avatar">{{ initials() }}</span>

        <span class="user-copy">
          <b>{{ auth.user()?.name }}</b>
          <small>{{ auth.user()?.role }}</small>
        </span>

        <i class="fa-solid fa-chevron-down"></i>
      </button>

      @if (open()) {
        <div class="dropdown-panel profile" (click)="$event.stopPropagation()">
          <div class="profile-head">
            <span class="avatar large">{{ initials() }}</span>

            <div>
              <b>{{ auth.user()?.name }}</b>
              <small>{{ auth.user()?.email }}</small>
              <em>{{ auth.user()?.role }}</em>
            </div>
          </div>

          <a routerLink="/settings" (click)="close()">
            <i class="fa-regular fa-user"></i>
            My Profile
          </a>

          <a routerLink="/settings" (click)="close()">
            <i class="fa-solid fa-gear"></i>
            Settings
          </a>

          <button type="button" class="logout" (click)="auth.logout()">
            <i class="fa-solid fa-right-from-bracket"></i>
            Logout
          </button>
        </div>
      }
    </div>
  `
})
export class UserProfileDropdownComponent {
  readonly auth = inject(AuthService);
  readonly open = signal(false);
  readonly initials = computed(() => getInitials(this.auth.user()?.name ?? 'User'));

  toggle(event: MouseEvent): void {
    event.stopPropagation();
    this.open.update((value) => !value);
  }

  @HostListener('document:click')
  close(): void {
    this.open.set(false);
  }
}
