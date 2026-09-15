import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export type ArcadeButtonColor = 'cyan' | 'magenta' | 'yellow' | 'green' | 'neutral';

@Component({
  selector: 'app-arcade-button',
  standalone: true,
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      (click)="btnClick.emit($event)"
      class="btn-arcade-pipos inline-flex items-center justify-center font-retro text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      [class.btn-arcade-cyan]="color() === 'cyan'"
      [class.btn-arcade-magenta]="color() === 'magenta'"
      [class.btn-arcade-yellow]="color() === 'yellow'"
      [class.btn-arcade-green]="color() === 'green'"
      [class.btn-arcade-neutral]="color() === 'neutral'"
      [class.px-2.5]="size() === 'sm'"
      [class.py-1]="size() === 'sm'"
      [class.text-[9px]]="size() === 'sm'"
      [class.px-4]="size() === 'md'"
      [class.py-2]="size() === 'md'"
      [class.text-xs]="size() === 'md'"
      [class.px-5]="size() === 'lg'"
      [class.py-2.5]="size() === 'lg'"
      [class.text-sm]="size() === 'lg'"
    >
      <ng-content></ng-content>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArcadeButtonComponent {
  readonly color = input<ArcadeButtonColor>('cyan');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly disabled = input<boolean>(false);
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly btnClick = output<MouseEvent>();
}
