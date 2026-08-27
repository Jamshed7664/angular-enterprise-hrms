import { Component, input } from '@angular/core';

@Component({
  selector: 'app-chart-wrapper',
  standalone: true,
  template: `
    <article class="panel">
      <div class="panel-heading">
        <div>
          <span class="eyebrow">{{ eyebrow() }}</span>
          <h2>{{ title() }}</h2>
        </div>
      </div>

      <div class="chart-wrapper">
        <ng-content />
      </div>
    </article>
  `
})
export class ChartWrapperComponent {
  readonly title = input.required<string>();
  readonly eyebrow = input('Analytics');
}
