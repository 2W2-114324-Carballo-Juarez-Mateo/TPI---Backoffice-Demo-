import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogoUtn } from '../logo-utn/logo-utn';

export interface NavModule {
  readonly route: string;
  readonly label: string;
  readonly icon: string;
  readonly group: string;
  readonly badge: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, LogoUtn],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  readonly searchTerm = signal<string>('');

  readonly modules: readonly NavModule[] = [
    {
      route: '/dashboard-consolidado',
      label: 'Dashboard Consolidado',
      icon: 'dashboard',
      group: 'Panel General & Operativo',
      badge: '1',
    },
    {
      route: '/observabilidad-institucional',
      label: 'Observabilidad Institucional',
      icon: 'monitoring',
      group: 'Panel General & Operativo',
      badge: '2',
    },
    {
      route: '/gestion-catedras',
      label: 'Gestión de Cátedras',
      icon: 'school',
      group: 'Gestión Académica & Docente',
      badge: '3',
    },
    {
      route: '/panel-profesor',
      label: 'Panel del Profesor (2W2)',
      icon: 'person_search',
      group: 'Gestión Académica & Docente',
      badge: '4',
    },
    {
      route: '/reportes-analiticos',
      label: 'Reportes Analíticos',
      icon: 'analytics',
      group: 'Gestión Académica & Docente',
      badge: '5',
    },
    {
      route: '/parametros-globales',
      label: 'Parámetros Globales (PAR)',
      icon: 'tune',
      group: 'Configuración & Gobernanza IA',
      badge: '6',
    },
    {
      route: '/motor-configuracion',
      label: 'Motor de Configuración',
      icon: 'settings',
      group: 'Configuración & Gobernanza IA',
      badge: '7',
    },
    {
      route: '/gobernanza-llm',
      label: 'Gobernanza Modelos LLM',
      icon: 'psychology',
      group: 'Configuración & Gobernanza IA',
      badge: '8',
    },
    {
      route: '/salud-trazabilidad',
      label: 'Salud y Trazabilidad',
      icon: 'pulse_alert',
      group: 'Infraestructura & Gateway',
      badge: '9',
    },
  ];

  readonly filteredModules = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.modules;
    return this.modules.filter(
      (m) =>
        m.label.toLowerCase().includes(term) ||
        m.group.toLowerCase().includes(term) ||
        m.badge.includes(term)
    );
  });

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
  }
}
