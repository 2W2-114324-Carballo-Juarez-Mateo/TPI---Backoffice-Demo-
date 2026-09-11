import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

export interface ServiceNodeHealth {
  readonly id: string;
  readonly name: string;
  readonly hostname: string;
  readonly port: number;
  readonly httpStatus: number;
  readonly latency: string;
  readonly cpuPercent: number;
  readonly status: 'Saludable' | 'Degradado';
  readonly isDegraded?: boolean;
}

export interface CrossServiceTrace {
  readonly traceId: string;
  readonly endpoint: string;
  readonly flow: string;
  readonly httpStatus: number;
  readonly totalLatency: string;
  readonly timestamp: string;
}

@Component({
  selector: 'app-salud-trazabilidad',
  imports: [],
  templateUrl: './salud-trazabilidad.html',
  styleUrl: './salud-trazabilidad.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaludTrazabilidad {
  readonly isSyncing = signal<boolean>(false);
  readonly feedback = signal<string>('');
  readonly searchTerm = signal<string>('');
  readonly selectedStatusFilter = signal<string>('Todos');

  readonly stats = signal([
    { title: 'Salud Global del Sistema', value: '99.98%', sub: 'Uptime últimas 24h', icon: 'verified', color: 'emerald' },
    { title: 'Latencia Promedio', value: '34.2 ms', sub: '-4.1ms vs ayer', icon: 'speed', color: 'primary' },
    { title: 'Transacciones Cross-Service', value: '1.42M', sub: 'Procesadas hoy', icon: 'hub', color: 'secondary' },
    { title: 'Circuit Breakers', value: '0 Disparados', sub: 'Gateway Óptimo', icon: 'bolt', color: 'amber' },
  ]);

  readonly microservices = signal<readonly ServiceNodeHealth[]>([
    { id: 'T02', name: 'Matrícula y Usuarios', hostname: 'srv-matricula-v2', port: 8081, httpStatus: 200, latency: '24 ms', cpuPercent: 18.4, status: 'Saludable' },
    { id: 'T03', name: 'Desafíos Core', hostname: 'srv-desafios-core', port: 8082, httpStatus: 200, latency: '41 ms', cpuPercent: 32.1, status: 'Saludable' },
    { id: 'T05', name: 'Prácticos & Lab', hostname: 'srv-practicos-lab', port: 8083, httpStatus: 503, latency: '824 ms', cpuPercent: 94.8, status: 'Degradado', isDegraded: true },
    { id: 'T08', name: 'Banco & Ledger', hostname: 'srv-banco-trans', port: 8084, httpStatus: 200, latency: '19 ms', cpuPercent: 12.0, status: 'Saludable' },
    { id: 'T10', name: 'Progreso & XP', hostname: 'srv-progreso-xp', port: 8085, httpStatus: 200, latency: '28 ms', cpuPercent: 24.5, status: 'Saludable' },
    { id: 'T11', name: 'Notificaciones Push', hostname: 'srv-notif-push', port: 8086, httpStatus: 200, latency: '31 ms', cpuPercent: 15.2, status: 'Saludable' },
  ]);

  readonly traces = signal<readonly CrossServiceTrace[]>([
    {
      traceId: '#tr-8f92a1bc',
      endpoint: 'POST /api/v1/inscripcion',
      flow: 'Matrícula (T02) → Banco (T08) → Progreso (T10)',
      httpStatus: 200,
      totalLatency: '142 ms',
      timestamp: 'Hace 12 seg',
    },
    {
      traceId: '#tr-4e51f09d',
      endpoint: 'POST /api/v1/practicos/subir',
      flow: 'Prácticos (T05) → Desafíos (T03)',
      httpStatus: 503,
      totalLatency: '1,250 ms',
      timestamp: 'Hace 45 seg',
    },
    {
      traceId: '#tr-9a12c4ee',
      endpoint: 'GET /api/v1/estudiante/xp',
      flow: 'Gateway (T01) → Progreso & XP (T10)',
      httpStatus: 200,
      totalLatency: '18 ms',
      timestamp: 'Hace 1 min',
    },
    {
      traceId: '#tr-3b77e2aa',
      endpoint: 'POST /api/v1/banco/transferir',
      flow: 'Banco (T08) → Notificaciones (T11)',
      httpStatus: 200,
      totalLatency: '54 ms',
      timestamp: 'Hace 2 min',
    },
  ]);

  readonly filteredTraces = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const status = this.selectedStatusFilter();

    return this.traces().filter((t) => {
      const matchesTerm =
        !term ||
        t.traceId.toLowerCase().includes(term) ||
        t.endpoint.toLowerCase().includes(term) ||
        t.flow.toLowerCase().includes(term);

      let matchesStatus = true;
      if (status === '200') matchesStatus = t.httpStatus === 200;
      else if (status === '503') matchesStatus = t.httpStatus === 503;

      return matchesTerm && matchesStatus;
    });
  });

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
  }

  onSelectStatus(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedStatusFilter.set(target.value);
  }

  syncCaches(): void {
    this.isSyncing.set(true);
    this.feedback.set('Purgando y sincronizando cachés L1 Redis y Gateway...');
    setTimeout(() => {
      this.isSyncing.set(false);
      this.feedback.set('Cachés sincronizados con éxito. Latencia global optimizada.');
      setTimeout(() => this.feedback.set(''), 3500);
    }, 1000);
  }
}
