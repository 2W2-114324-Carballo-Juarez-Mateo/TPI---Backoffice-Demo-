import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { LogoUtn } from '../logo-utn/logo-utn';

@Component({
  selector: 'app-header',
  imports: [LogoUtn],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  readonly systemStatus = signal({
    kafkaOnline: true,
    servicesTotal: 6,
    servicesOnline: 6,
    userRole: 'Sec. Académica',
    userName: 'Mg. Ing. Admin Docente',
    userInitials: 'AD',
  });
}
