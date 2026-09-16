import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type ArcadeCardVariant = 'default' | 'cyan' | 'magenta' | 'yellow' | 'neutral';

@Component({
  selector: 'app-arcade-card',
  standalone: true,
  template: `
    <div
      class="arcade-card relative transition-all duration-150"
      [class.arcade-corners]="corners()"
      [class.hover:border-brand]="variant() === 'cyan'"
      [class.hover:border-brand-2]="variant() === 'magenta'"
      [class.hover:border-gold]="variant() === 'yellow'"
      [class.p-3]="padding() === 'sm'"
      [class.p-5]="padding() === 'md'"
      [class.p-7]="padding() === 'lg'"
      [class.p-0]="padding() === 'none'"
    >
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArcadeCardComponent {
  readonly corners = input<boolean>(true);
  readonly variant = input<ArcadeCardVariant>('default');
  readonly padding = input<'none' | 'sm' | 'md' | 'lg'>('md');
}
