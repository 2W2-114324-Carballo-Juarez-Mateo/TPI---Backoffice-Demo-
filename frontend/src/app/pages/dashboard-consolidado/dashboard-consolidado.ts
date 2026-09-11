import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

export interface TransactionLog {
  readonly id: string;
  readonly origin: string;
  readonly destination: string;
  readonly action: string;
  readonly status: 'Completado' | 'Reintentando';
  readonly timestamp: string;
  readonly latency: string;
}

export interface SystemAlert {
  readonly id: string;
  readonly title: string;
  readonly severity: 'warning' | 'info' | 'success';
  readonly timeAgo: string;
  readonly description: string;
}

export interface DayActivity {
  readonly day: string;
  readonly date: string;
  readonly value: string;
  readonly heightPercent: number;
  readonly isPeak?: boolean;
}

@Component({
  selector: 'app-dashboard-consolidado',
  imports: [],
  templateUrl: './dashboard-consolidado.html',
  styleUrl: './dashboard-consolidado.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardConsolidado {
  readonly isSyncing = signal<boolean>(false);
  readonly syncMessage = signal<string>('');
  readonly timeRange = signal<'7d' | '30d' | 'year'>('7d');
  readonly searchTerm = signal<string>('');
  readonly toastAlerts = signal<string>('');

  readonly kpis = signal([
    { title: 'Matrícula Activa', value: '12,480', delta: '+4.2% este mes', api: 'API: Matrícula', icon: 'group', color: 'primary' },
    { title: 'Desafíos Completados', value: '45,920', delta: '+12.8% vs ayer', api: 'API: Desafíos', icon: 'bolt', color: 'secondary' },
    { title: 'Prácticos Entregados', value: '8,340', delta: '98.1% a tiempo', api: 'API: Prácticos', icon: 'assignment', color: 'tertiary' },
    { title: 'Tasa Sincronización', value: '99.8%', delta: 'Gateway Óptimo', api: '6/6 Servicios', icon: 'dns', color: 'emerald' },
  ]);

  readonly alerts = signal<readonly SystemAlert[]>([
    {
      id: 'ALT-01',
      title: 'Latencia en Banco de Pruebas',
      severity: 'warning',
      timeAgo: 'Hace 12m',
      description: 'Pico > 450ms detectado en clúster secundario de evaluación unitaria.',
    },
    {
      id: 'ALT-02',
      title: 'Backup Automático Completado',
      severity: 'info',
      timeAgo: 'Hace 1h',
      description: 'Snapshot programado de snapshots de progreso XP y matrículas FRC.',
    },
    {
      id: 'ALT-03',
      title: 'Notificaciones Push Operativas',
      severity: 'success',
      timeAgo: 'Hace 2h',
      description: 'Cola Kafka de difusión masiva procesada al 100% sin retrasos.',
    },
  ]);

  readonly weeklyActivity = signal<readonly DayActivity[]>([
    { day: 'Lun', date: '18 May', value: '4.5k', heightPercent: 45 },
    { day: 'Mar', date: '19 May', value: '7.0k', heightPercent: 70 },
    { day: 'Mié', date: '20 May', value: '8.5k', heightPercent: 85 },
    { day: 'Jue', date: '21 May', value: '6.0k', heightPercent: 60 },
    { day: 'Vie', date: '22 May', value: '9.8k', heightPercent: 100, isPeak: true },
    { day: 'Sáb', date: '23 May', value: '4.0k', heightPercent: 40 },
    { day: 'Dom', date: '24 May', value: '2.5k', heightPercent: 25 },
  ]);

  readonly transactions = signal<readonly TransactionLog[]>([
    { id: '#TRX-98421', origin: 'Matrícula', destination: 'Progreso/XP', action: 'Asignación de créditos iniciales', status: 'Completado', timestamp: '2024-05-24 14:22:01', latency: '42ms' },
    { id: '#TRX-98420', origin: 'Desafíos', destination: 'Banco', action: 'Validación de código fuente unitario', status: 'Completado', timestamp: '2024-05-24 14:21:55', latency: '118ms' },
    { id: '#TRX-98419', origin: 'Prácticos', destination: 'Notificaciones', action: 'Envío de alerta de entrega exitosa', status: 'Completado', timestamp: '2024-05-24 14:20:12', latency: '85ms' },
    { id: '#TRX-98418', origin: 'Banco', destination: 'Progreso/XP', action: 'Recompensas por resolución de test', status: 'Reintentando', timestamp: '2024-05-24 14:19:40', latency: '450ms' },
    { id: '#TRX-98417', origin: 'Matrícula', destination: 'Notificaciones', action: 'Aviso de inscripción a cátedra', status: 'Completado', timestamp: '2024-05-24 14:18:05', latency: '62ms' },
  ]);

  readonly filteredTransactions = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.transactions();
    return this.transactions().filter(
      (t) =>
        t.id.toLowerCase().includes(term) ||
        t.origin.toLowerCase().includes(term) ||
        t.destination.toLowerCase().includes(term) ||
        t.action.toLowerCase().includes(term) ||
        t.status.toLowerCase().includes(term)
    );
  });

  setTimeRange(range: '7d' | '30d' | 'year'): void {
    this.timeRange.set(range);
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
  }

  viewAllAlerts(): void {
    this.toastAlerts.set('Abriendo registro consolidado de 14 alertas del sistema...');
    setTimeout(() => this.toastAlerts.set(''), 3000);
  }

  forceSync(): void {
    this.isSyncing.set(true);
    this.syncMessage.set('Sincronizando con clúster Kafka y microservicios...');
    setTimeout(() => {
      this.isSyncing.set(false);
      this.syncMessage.set('Sincronización completada con 6 microservicios.');
      setTimeout(() => this.syncMessage.set(''), 3500);
    }, 1200);
  }
}
