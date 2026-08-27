import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  readonly company = signal({
    name: 'Acme Digital India',
    workingHours: '09:00 - 18:00',
    timezone: 'Asia/Kolkata'
  });

  readonly preferences = signal({
    emailNotifications: true,
    approvalReminders: true,
    peopleEvents: true,
    recruitmentUpdates: true
  });
}
