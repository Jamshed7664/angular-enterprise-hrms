import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <article class="panel">
      <ng-content />
    </article>
  `
})
export class CardComponent {}
