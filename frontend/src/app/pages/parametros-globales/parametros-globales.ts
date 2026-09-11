import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

export interface GlobalParameter {
  readonly code: string;
  readonly name: string;
  readonly category: 'Economía & Gamificación' | 'Evaluación & IA' | 'Seguridad & Plataforma';
  readonly value: string;
  readonly consumers: string;
  readonly version: string;
  readonly status: 'Vigente' | 'Modificado';
  readonly lastUpdated: string;
}

@Component({
  selector: 'app-parametros-globales',
  imports: [],
  templateUrl: './parametros-globales.html',
  styleUrl: './parametros-globales.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParametrosGlobales {
  readonly searchTerm = signal<string>('');
  readonly selectedCategory = signal<string>('Todos los Parámetros (18)');
  readonly selectedParamForEdit = signal<GlobalParameter | null>(null);
  readonly auditReason = signal<string>('');
  readonly toastMessage = signal<string>('');

  readonly stats = signal({
    totalKeys: 18,
    connectedModules: 12,
    syncRate: '99.98%',
    lastKafkaEvent: '14:02:18 UTC',
  });

  readonly params = signal<readonly GlobalParameter[]>([
    {
      code: 'PAR-01',
      name: 'XP Base por desafío superado (B/M/A)',
      category: 'Economía & Gamificación',
      value: '100 / 250 / 500 XP',
      consumers: 'Tema 08 (Ledger) • Tema 10 (Progreso)',
      version: 'v1.0',
      status: 'Vigente',
      lastUpdated: '2026-03-01 10:00 UTC',
    },
    {
      code: 'PAR-02',
      name: 'XP de desafíos personalizados generados por LLM',
      category: 'Economía & Gamificación',
      value: '10 / 20 / 30 XP',
      consumers: 'Tema 07 (IA) • Tema 08 (Ledger)',
      version: 'v1.0',
      status: 'Vigente',
      lastUpdated: '2026-03-01 10:00 UTC',
    },
    {
      code: 'PAR-03',
      name: 'Monedas por desafío superado (Obligatorio/Opcional)',
      category: 'Economía & Gamificación',
      value: '100 / 50 monedas',
      consumers: 'Tema 08 (Banco y Ledger)',
      version: 'v1.1',
      status: 'Modificado',
      lastUpdated: '2026-03-15 14:22 UTC',
    },
    {
      code: 'PAR-04',
      name: 'Rango de variación de XP por calidad y tiempo',
      category: 'Economía & Gamificación',
      value: '±15% sobre XP base',
      consumers: 'Tema 08 (Ledger)',
      version: 'v1.0',
      status: 'Vigente',
      lastUpdated: '2026-03-01 10:00 UTC',
    },
    {
      code: 'PAR-05',
      name: 'Bonus / penalidad de XP por uso de IA (RF-IA-15)',
      category: 'Evaluación & IA',
      value: '±20% sobre XP base',
      consumers: 'Tema 07 (IA) • Tema 08 (Ledger)',
      version: 'v1.0',
      status: 'Vigente',
      lastUpdated: '2026-03-01 10:00 UTC',
    },
    {
      code: 'PAR-06',
      name: 'Precio en monedas de 1 vida',
      category: 'Economía & Gamificación',
      value: '300 monedas',
      consumers: 'Tema 09 (Mercado) • Tema 10 (Vidas)',
      version: 'v1.0',
      status: 'Vigente',
      lastUpdated: '2026-03-01 10:00 UTC',
    },
    {
      code: 'PAR-07',
      name: 'Precio en monedas de equipamiento con efecto mecánico',
      category: 'Economía & Gamificación',
      value: '500 monedas',
      consumers: 'Tema 09 (Mercado)',
      version: 'v1.0',
      status: 'Vigente',
      lastUpdated: '2026-03-01 10:00 UTC',
    },
    {
      code: 'PAR-08',
      name: 'Umbral de XP para desbloqueo de sección de roadmap',
      category: 'Economía & Gamificación',
      value: '500 XP (Ajustable por docente)',
      consumers: 'Tema 10 (Roadmap y Progreso)',
      version: 'v1.0',
      status: 'Vigente',
      lastUpdated: '2026-03-01 10:00 UTC',
    },
    {
      code: 'PAR-09',
      name: 'Curva de XP para los 10 niveles del sistema',
      category: 'Economía & Gamificación',
      value: '0 / 250 / 600 / 1.1k / 1.8k / 2.8k / 4.2k / 6k / 8.5k / 12k XP',
      consumers: 'Tema 10 (Progreso)',
      version: 'v1.0',
      status: 'Vigente',
      lastUpdated: '2026-03-01 10:00 UTC',
    },
    {
      code: 'PAR-10',
      name: '% de muestreo de auditoría humana de scores IA (RF-IA-17)',
      category: 'Evaluación & IA',
      value: '10% de correcciones',
      consumers: 'Tema 07 (IA) • Tema 12 (Backoffice)',
      version: 'v1.0',
      status: 'Vigente',
      lastUpdated: '2026-03-01 10:00 UTC',
    },
    {
      code: 'PAR-11',
      name: 'Umbral de similitud para salvaguarda anti-fuga (RF-IA-20)',
      category: 'Evaluación & IA',
      value: '70% de similitud',
      consumers: 'Tema 07 (Evaluador LLM)',
      version: 'v1.0',
      status: 'Vigente',
      lastUpdated: '2026-03-01 10:00 UTC',
    },
    {
      code: 'PAR-12',
      name: 'Vidas iniciales por curso / máximo de vidas vigentes',
      category: 'Economía & Gamificación',
      value: '3 / 3 vidas',
      consumers: 'Tema 10 (Roadmap y Vidas)',
      version: 'v1.0',
      status: 'Vigente',
      lastUpdated: '2026-03-01 10:00 UTC',
    },
    {
      code: 'PAR-13',
      name: 'Máximo de reintentos configurable por desafío (RF-DES-07)',
      category: 'Economía & Gamificación',
      value: '3 reintentos (default: 0)',
      consumers: 'Tema 03 (Desafíos) • Tema 05 (Runner)',
      version: 'v1.0',
      status: 'Vigente',
      lastUpdated: '2026-03-01 10:00 UTC',
    },
    {
      code: 'PAR-14',
      name: 'Tolerancia máxima de calibración evaluador Golden Set (RF-IA-31)',
      category: 'Evaluación & IA',
      value: 'Avg ≤ ±5.0 pts • Max ≤ ±10.0 pts',
      consumers: 'Tema 07 (Evaluación IA) • Tema 12 (Backoffice)',
      version: 'v1.0',
      status: 'Vigente',
      lastUpdated: '2026-03-01 10:00 UTC',
    },
    {
      code: 'PAR-15',
      name: 'Periodicidad de re-calibración del evaluador (RF-IA-32)',
      category: 'Evaluación & IA',
      value: 'Mensual / Ante cambio de versión',
      consumers: 'Tema 07 (IA) • Tema 12 (Backoffice)',
      version: 'v1.0',
      status: 'Vigente',
      lastUpdated: '2026-03-01 10:00 UTC',
    },
    {
      code: 'PAR-16',
      name: 'Plazo de conservación de datos académicos (RF-NFR-10)',
      category: 'Seguridad & Plataforma',
      value: '5 años (Ley 25.326)',
      consumers: 'Tema 12 (Orquestador) • Tema 01 (Gateway)',
      version: 'v1.0',
      status: 'Vigente',
      lastUpdated: '2026-03-01 10:00 UTC',
    },
    {
      code: 'PAR-17',
      name: 'Ventana de preaviso al ADMIN antes de vencimiento (RF-NFR-10)',
      category: 'Seguridad & Plataforma',
      value: '90 días previos',
      consumers: 'Tema 12 (Backoffice)',
      version: 'v1.0',
      status: 'Vigente',
      lastUpdated: '2026-03-01 10:00 UTC',
    },
    {
      code: 'PAR-18',
      name: 'Umbral mínimo de respuestas para exponer CSAT (RF-ENC-13)',
      category: 'Seguridad & Plataforma',
      value: '5 respuestas anónimas',
      consumers: 'Tema 04 (Encuestas) • Tema 12 (Reporting)',
      version: 'v1.0',
      status: 'Vigente',
      lastUpdated: '2026-03-01 10:00 UTC',
    },
  ]);

  readonly filteredParams = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const cat = this.selectedCategory();

    return this.params().filter((p) => {
      const matchesTerm =
        !term ||
        p.code.toLowerCase().includes(term) ||
        p.name.toLowerCase().includes(term) ||
        p.consumers.toLowerCase().includes(term);

      const matchesCat =
        cat === 'Todos los Parámetros (18)' ||
        p.category === cat;

      return matchesTerm && matchesCat;
    });
  });

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
  }

  selectCategory(cat: string): void {
    this.selectedCategory.set(cat);
  }

  openEditModal(param: GlobalParameter): void {
    this.selectedParamForEdit.set(param);
    this.auditReason.set('');
  }

  closeEditModal(): void {
    this.selectedParamForEdit.set(null);
    this.auditReason.set('');
  }

  onReasonInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.auditReason.set(target.value);
  }

  saveParam(newValue: string): void {
    const current = this.selectedParamForEdit();
    if (!current) return;

    if (!this.auditReason().trim()) {
      this.toastMessage.set('ERROR: Debe ingresar el motivo del cambio para la bitácora AdminAuditLog (RF-AUD-02).');
      setTimeout(() => this.toastMessage.set(''), 4000);
      return;
    }

    // Actualizar parámetro inmutable hacia adelante (RF-CFG-06)
    this.params.update((list) =>
      list.map((p) =>
        p.code === current.code
          ? {
              ...p,
              value: newValue,
              version: `v1.${parseInt(p.version.slice(3) || '0', 10) + 1}`,
              status: 'Modificado',
              lastUpdated: 'Justo ahora (UTC)',
            }
          : p
      )
    );

    this.toastMessage.set(
      `Evento GlobalConfigurationChanged emitido a Kafka para ${current.code}. Versión incrementada. Bitácora RF-AUD-02 registrada.`
    );
    setTimeout(() => this.toastMessage.set(''), 4500);
    this.closeEditModal();
  }

  viewHistory(param: GlobalParameter): void {
    this.toastMessage.set(`Historial de versiones para ${param.code}: Versión base v1.0 • Cambios registrados en topic administration.events.`);
    setTimeout(() => this.toastMessage.set(''), 4000);
  }

  exportJSON(): void {
    this.toastMessage.set('Exportando catálogo completo de 24 parámetros en JSON schema compatible...');
    setTimeout(() => {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.params(), null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', 'Catalogo_Parametros_PAR_FRC.json');
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.removeChild(downloadAnchor);
      this.toastMessage.set('Descarga de JSON completada.');
      setTimeout(() => this.toastMessage.set(''), 3000);
    }, 600);
  }
}
