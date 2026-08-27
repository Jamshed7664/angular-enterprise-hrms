import { Injectable, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly key = 'hrms_theme';

  readonly theme = signal<ThemeMode>(
    (localStorage.getItem(this.key) as ThemeMode | null) ?? 'light'
  );

  constructor() {
    this.apply();
  }

  toggle(): void {
    this.setTheme(this.effectiveTheme() === 'light' ? 'dark' : 'light');
  }

  setTheme(theme: ThemeMode): void {
    this.theme.set(theme);
    localStorage.setItem(this.key, theme);
    this.apply();
  }

  effectiveTheme(): 'light' | 'dark' {
    const currentTheme = this.theme();

    if (currentTheme === 'system') {
      return matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }

    return currentTheme;
  }

  private apply(): void {
    const effectiveTheme = this.effectiveTheme();

    document.documentElement.classList.toggle(
      'dark',
      effectiveTheme === 'dark'
    );

    document.documentElement.dataset['theme'] = effectiveTheme;
  }
}