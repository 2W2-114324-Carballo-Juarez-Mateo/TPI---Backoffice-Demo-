import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

export interface OperationalParam {
  readonly code: string;
  readonly name: string;
  readonly category: string;
  readonly value: string;
  readonly type: string;
  readonly author: string;
  readonly status: 'Vigente' | 'Modificado';
  readonly lastSync: string;
}

export interface AdminAuditEntry {
  readonly id: string;
  readonly paramCode: string;
  readonly changeDescription: string;
  readonly actor: string;
  readonly ip: string;
  readonly timeAgo: string;
  readonly justification: string;
}

@Component({
  selector: 'app-motor-configuracion',
  imports: [],
  templateUrl: './motor-configuracion.html',
  styleUrl: './motor-configuracion.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MotorConfiguracion {
  readonly searchTerm = signal<string>('');
  readonly selectedCategory = signal<string>('Todas');
  readonly selectedStatus = signal<string>('Todos');
  readonly feedback = signal<string>('');

  readonly summaryCards = signal([
    { title: 'Total Parámetros', value: '24', sub: '100% Sincronizados', icon: 'tune', color: 'primary' },
    { title: 'Modificados Hoy', value: '3', sub: 'Eventos Kafka emitidos', icon: 'history', color: 'secondary' },
    { title: 'Categorías Activas', value: '6', sub: 'XP, Límites, IA, Vidas...', icon: 'category', color: 'tertiary' },
    { title: 'Ambiente Activo', value: 'PRODUCCIÓN', sub: 'Clúster FRC-Mendoza', icon: 'dns', color: 'emerald' },
  ]);

  readonly params = signal<readonly OperationalParam[]>([
    { code: 'PAR-01', name: 'XP Base por dificultad', category: 'Economía', value: '100 / 250 / 500 XP', type: 'String', author: 'admin.gomez', status: 'Vigente', lastSync: '14:02:18 UTC' },
    { code: 'PAR-02', name: 'Multiplicador XP por entrega a tiempo', category: 'Economía', value: '1.25x', type: 'Float', author: 'm.castro', status: 'Modificado', lastSync: '13:20:10 UTC' },
    { code: 'PAR-03', name: 'Monedas por desafío resuelto', category: 'Economía', value: '100 / 50 monedas', type: 'String', author: 'admin.gomez', status: 'Vigente', lastSync: '14:02:18 UTC' },
    { code: 'PAR-06', name: 'Precio de reposición de vida', category: 'Vidas', value: '300 monedas', type: 'Integer', author: 'admin.gomez', status: 'Vigente', lastSync: '14:02:18 UTC' },
    { code: 'PAR-11', name: 'Umbral anti-plagio de código', category: 'Evaluación', value: '70%', type: 'Percentage', author: 'm.castro', status: 'Vigente', lastSync: '14:02:18 UTC' },
    { code: 'PAR-14', name: 'Tolerancia Golden Set Base', category: 'Gobernanza IA', value: '±5.0 pts', type: 'Float', author: 'admin.docente', status: 'Vigente', lastSync: '09:15:00 UTC' },
  ]);

  readonly auditHistory = signal<readonly AdminAuditEntry[]>([
    {
      id: 'AUD-PAR-02',
      paramCode: 'PAR-02',
      changeDescription: 'Valor actualizado de 1.15x a 1.25x (Multiplicador de entrega temprana)',
      actor: 'm.castro (Admin)',
      ip: '192.168.40.12',
      timeAgo: 'Hace 42 min',
      justification: 'Incentivo pedagógico para elevar entregas en primeros 3 días de sprint.',
    },
    {
      id: 'AUD-PAR-03',
      paramCode: 'PAR-03',
      changeDescription: 'Ajuste de recompensa en monedas de 80 a 100 para desafíos obligatorios',
      actor: 'admin.gomez',
      ip: '192.168.40.5',
      timeAgo: 'Hace 3 horas',
      justification: 'Calibración de economía para equiparar costo de compra de vidas.',
    },
    {
      id: 'AUD-PAR-14',
      paramCode: 'PAR-14',
      changeDescription: 'Homologación de tolerancia de calibración Claude 3.5 Sonnet',
      actor: 'admin.docente',
      ip: '192.168.40.1',
      timeAgo: 'Ayer, 18:40',
      justification: 'Cierre de acta de Consejo Académico para inicio de ciclo 2026.',
    },
  ]);

  readonly filteredParams = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const cat = this.selectedCategory();
    const stat = this.selectedStatus();

    return this.params().filter((p) => {
      const matchesTerm =
        !term ||
        p.code.toLowerCase().includes(term) ||
        p.name.toLowerCase().includes(term) ||
        p.author.toLowerCase().includes(term);

      const matchesCat = cat === 'Todas' || p.category === cat;
      const matchesStat = stat === 'Todos' || p.status === stat;

      return matchesTerm && matchesCat && matchesStat;
    });
  });

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
  }

  onSelectCategory(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCategory.set(target.value);
  }

  onSelectStatus(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedStatus.set(target.value);
  }

  forceClusterSync(): void {
    this.feedback.set('Forzando sincronización de clúster Kafka y refresco de cachés Redis locales...');
    setTimeout(() => {
      this.feedback.set('Clúster FRC sincronizado al 100%. Hash de configuración validado.');
      setTimeout(() => this.feedback.set(''), 3500);
    }, 1100);
  }

  exportAudit(): void {
    this.feedback.set('Descargando archivo JSON de auditoría de configuración global (AdminAuditLog)...');
    setTimeout(() => {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.auditHistory(), null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', 'AdminAuditLog_FRC_Config.json');
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.removeChild(downloadAnchor);
      this.feedback.set('Bitácora AdminAuditLog descargada con éxito.');
      setTimeout(() => this.feedback.set(''), 3000);
    }, 700);
  }
}
