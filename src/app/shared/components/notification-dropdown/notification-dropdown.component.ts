import { DatePipe } from '@angular/common';
import {
  Component,
  HostListener,
  computed,
  inject,
  signal
} from '@angular/core';
import { MockDatabaseService } from '../../../core/services/mock-database.service';

@Component({
  selector: 'app-notification-dropdown',
  standalone: true,
  imports: [DatePipe],
  template: `
    <div class="dropdown-wrap">
      <button
        type="button"
        class="icon-btn"
        aria-label="Notifications"
        (click)="toggle($event)"
      >
        <i class="fa-regular fa-bell"></i>

        @if (unreadCount() > 0) {
          <span class="notification-dot">{{ unreadCount() }}</span>
        }
      </button>

      @if (open()) {
        <div class="dropdown-panel notifications" (click)="$event.stopPropagation()">
          <div class="dropdown-title">
            <div>
              <b>Notifications</b>
              <small>{{ unreadCount() }} unread</small>
            </div>

            <button type="button" (click)="markAllRead()">Mark all read</button>
          </div>

          @for (item of db.notifications(); track item.id) {
            <button
              type="button"
              class="notification-item"
              [class.unread]="!item.read"
              (click)="markRead(item.id)"
            >
              <i class="fa-regular fa-bell"></i>

              <span>
                <b>{{ item.title }}</b>
                <small>{{ item.message }}</small>
                <em>{{ item.createdAt | date:'short' }}</em>
              </span>
            </button>
          }
        </div>
      }
    </div>
  `
})
export class NotificationDropdownComponent {
  readonly db = inject(MockDatabaseService);
  readonly open = signal(false);

  readonly unreadCount = computed(
    () => this.db.notifications().filter((item) => !item.read).length
  );

  toggle(event: MouseEvent): void {
    event.stopPropagation();
    this.open.update((value) => !value);
  }

  markRead(id: number): void {
    this.db.notifications.update((items) =>
      items.map((item) => item.id === id ? { ...item, read: true } : item)
    );
  }

  markAllRead(): void {
    this.db.notifications.update((items) =>
      items.map((item) => ({ ...item, read: true }))
    );
  }

  @HostListener('document:click')
  close(): void {
    this.open.set(false);
  }
}
