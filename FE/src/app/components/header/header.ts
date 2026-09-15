import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { LogoUtn } from '../logo-utn/logo-utn';
import { ThemeService } from '../../core/theme.service';
import { ArcadeBadgeComponent } from '../../shared/arcade/arcade-badge/arcade-badge.component';

@Component({
  selector: 'app-header',
  imports: [LogoUtn, ArcadeBadgeComponent],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  readonly themeService = inject(ThemeService);

  readonly systemStatus = signal({
    kafkaOnline: true,
    servicesTotal: 6,
    servicesOnline: 6,
    userRole: 'Sec. Académica',
    userName: 'Prof. Admin Docente',
    userInitials: 'AD',
  });
}
