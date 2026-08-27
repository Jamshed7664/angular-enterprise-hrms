import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/hrms.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly key = 'hrms_session';
  private readonly currentUser = signal<User | null>(this.restore());
  readonly user = this.currentUser.asReadonly();
  readonly isAuthenticated = computed(() => this.currentUser() !== null);

  constructor(private readonly router: Router) {}

  login(email: string, password: string): boolean {
    if (!email || password.length < 6) {
      return false;
    }

    const user: User = {
      id: 1,
      name: 'Meera Iyer',
      email,
      role: 'HR Manager'
    };

    localStorage.setItem(this.key, JSON.stringify(user));
    this.currentUser.set(user);
    void this.router.navigateByUrl('/dashboard');
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.key);
    this.currentUser.set(null);
    void this.router.navigateByUrl('/auth/login');
  }

  private restore(): User | null {
    try {
      return JSON.parse(localStorage.getItem(this.key) ?? 'null') as User | null;
    } catch {
      return null;
    }
  }
}
