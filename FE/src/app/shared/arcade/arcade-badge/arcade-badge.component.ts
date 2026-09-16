import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type ArcadeBadgeTone = 'cyan' | 'magenta' | 'yellow' | 'gold' | 'green' | 'red' | 'neutral';
export type ArcadeBadgeAppearance = 'solid' | 'outline';
export type ArcadeBadgeSize = 'sm' | 'md';

@Component({
  selector: 'app-arcade-badge',
  standalone: true,
  template: `
    <span
      class="inline-flex items-center font-retro uppercase tracking-wider border rounded-sm whitespace-nowrap align-middle"
      [class.text-[8px]]="size() === 'sm'"
      [class.px-1.5]="size() === 'sm'"
      [class.py-0.5]="size() === 'sm'"
      [class.gap-1]="size() === 'sm'"
      [class.text-[10px]]="size() === 'md'"
      [class.px-2]="size() === 'md'"
      [class.py-1]="size() === 'md'"
      [class.gap-1.5]="size() === 'md'"
      [class.bg-brand-2]="tone() === 'cyan' && appearance() === 'solid'"
      [class.text-slate-950]="tone() === 'cyan' && appearance() === 'solid'"
      [class.border-brand-2]="tone() === 'cyan' && appearance() === 'solid'"
      [class.text-brand-2]="tone() === 'cyan' && appearance() === 'outline'"
      [class.border-brand-2/60]="tone() === 'cyan' && appearance() === 'outline'"
      [class.bg-brand-2/10]="tone() === 'cyan' && appearance() === 'outline'"
      [class.bg-brand]="tone() === 'magenta' && appearance() === 'solid'"
      [class.text-white]="tone() === 'magenta' && appearance() === 'solid'"
      [class.border-brand]="tone() === 'magenta' && appearance() === 'solid'"
      [class.text-brand]="tone() === 'magenta' && appearance() === 'outline'"
      [class.border-brand/60]="tone() === 'magenta' && appearance() === 'outline'"
      [class.bg-brand/10]="tone() === 'magenta' && appearance() === 'outline'"
      [class.bg-gold]="(tone() === 'yellow' || tone() === 'gold') && appearance() === 'solid'"
      [class.text-slate-950]="(tone() === 'yellow' || tone() === 'gold') && appearance() === 'solid'"
      [class.border-gold]="(tone() === 'yellow' || tone() === 'gold') && appearance() === 'solid'"
      [class.text-gold]="(tone() === 'yellow' || tone() === 'gold') && appearance() === 'outline'"
      [class.border-gold/60]="(tone() === 'yellow' || tone() === 'gold') && appearance() === 'outline'"
      [class.bg-gold/10]="(tone() === 'yellow' || tone() === 'gold') && appearance() === 'outline'"
      [class.bg-success]="tone() === 'green' && appearance() === 'solid'"
      [class.text-slate-950]="tone() === 'green' && appearance() === 'solid'"
      [class.border-success]="tone() === 'green' && appearance() === 'solid'"
      [class.text-success]="tone() === 'green' && appearance() === 'outline'"
      [class.border-success/60]="tone() === 'green' && appearance() === 'outline'"
      [class.bg-success/10]="tone() === 'green' && appearance() === 'outline'"
      [class.bg-danger]="tone() === 'red' && appearance() === 'solid'"
      [class.text-white]="tone() === 'red' && appearance() === 'solid'"
      [class.border-danger]="tone() === 'red' && appearance() === 'solid'"
      [class.text-danger]="tone() === 'red' && appearance() === 'outline'"
      [class.border-danger/60]="tone() === 'red' && appearance() === 'outline'"
      [class.bg-danger/10]="tone() === 'red' && appearance() === 'outline'"
      [class.bg-surface-2]="tone() === 'neutral' && appearance() === 'solid'"
      [class.text-ink]="tone() === 'neutral' && appearance() === 'solid'"
      [class.border-line]="tone() === 'neutral' && appearance() === 'solid'"
      [class.text-ink-soft]="tone() === 'neutral' && appearance() === 'outline'"
      [class.border-line]="tone() === 'neutral' && appearance() === 'outline'"
      [class.bg-surface-2/40]="tone() === 'neutral' && appearance() === 'outline'"
    >
      <ng-content></ng-content>
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArcadeBadgeComponent {
  readonly tone = input<ArcadeBadgeTone>('cyan');
  readonly appearance = input<ArcadeBadgeAppearance>('outline');
  readonly size = input<ArcadeBadgeSize>('md');
}
