import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  template: `
    <div class="crm-loader" role="status" aria-live="polite">
      <span class="spinner-border spinner-border-sm"></span>
      <span>Loading...</span>
    </div>
  `
})
export class LoaderComponent {}
