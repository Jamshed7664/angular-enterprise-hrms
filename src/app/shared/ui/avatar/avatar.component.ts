import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  standalone: true,
  template: `
    <span class="avatar-sm" [attr.aria-label]="name()">
      {{ initials() }}
    </span>
  `
})
export class AvatarComponent {
  readonly name = input.required<string>();

  readonly initials = computed(() =>
    this.name()
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join('')
      .toUpperCase()
  );
}
