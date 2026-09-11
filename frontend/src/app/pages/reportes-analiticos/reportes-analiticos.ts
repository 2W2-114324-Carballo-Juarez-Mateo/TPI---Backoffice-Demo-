import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

export interface XpLevelDistribution {
  readonly level: string;
  readonly students: number;
  readonly range: string;
  readonly heightPercent: number;
}

export interface CatedraPerformance {
  readonly parCode: string;
  readonly subject: string;
  readonly inscriptos: number;
  readonly xpAvg: number;
  readonly passRate: number;
  readonly status: 'Óptimo' | 'En Seguimiento';
}

@Component({
  selector: 'app-reportes-analiticos',
  imports: [],
  templateUrl: './reportes-analiticos.html',
  styleUrl: './reportes-analiticos.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportesAnaliticos {
  readonly selectedDept = signal<string>('Sistemas');
  readonly selectedCarrera = signal<string>('Ingeniería en Sistemas de Información');
  readonly selectedCohorte = signal<string>('Cohorte 2026 (Ingreso)');
  readonly feedback = signal<string>('');

  readonly kpis = signal([
    {
      title: 'XP Promedio Estudiantil',
      value: '14,285 XP',
      delta: '+12.4% vs cohorte anterior',
      icon: 'bolt',
      desc: 'Acumulado promedio en cohorte activa',
    },
    {
      title: 'Retención por Desafíos',
      value: '88.3%',
      delta: '+4.1% tasa de retención',
      icon: 'person_check',
      desc: 'Correlación positiva con desafíos entregados',
    },
    {
      title: 'Efectividad en Prácticos',
      value: '92.7%',
      delta: '+2.8% aprobados 1° intento',
      icon: 'verified',
      desc: 'Validación en bancos de pruebas unitarias',
    },
    {
      title: 'Índice PAR Activo',
      value: 'PAR-994.2',
      delta: 'Estable Sync Gateway',
      icon: 'sync_alt',
      desc: 'Métricas agregadas sincronizadas',
    },
  ]);

  readonly xpDistribution = signal<readonly XpLevelDistribution[]>([
    { level: 'Nivel 1', students: 120, range: '0 - 2k XP', heightPercent: 20 },
    { level: 'Nivel 2', students: 340, range: '2k - 5k XP', heightPercent: 58 },
    { level: 'Nivel 3', students: 580, range: '5k - 10k XP', heightPercent: 100 },
    { level: 'Nivel 4', students: 410, range: '10k - 20k XP', heightPercent: 70 },
    { level: 'Nivel 5', students: 190, range: '20k+ XP', heightPercent: 32 },
  ]);

  readonly catedrasPerformance = signal<readonly CatedraPerformance[]>([
    {
      parCode: 'PAR-1042',
      subject: 'Sistemas de Información (K1051)',
      inscriptos: 85,
      xpAvg: 16420,
      passRate: 94.2,
      status: 'Óptimo',
    },
    {
      parCode: 'PAR-1088',
      subject: 'Algoritmos y Estructuras de Datos (K1022)',
      inscriptos: 140,
      xpAvg: 13100,
      passRate: 89.0,
      status: 'Óptimo',
    },
    {
      parCode: 'PAR-2014',
      subject: 'Matemática Discreta (K1011)',
      inscriptos: 112,
      xpAvg: 11450,
      passRate: 76.5,
      status: 'En Seguimiento',
    },
    {
      parCode: 'PAR-3051',
      subject: 'Arquitectura de Computadoras (K2033)',
      inscriptos: 95,
      xpAvg: 15800,
      passRate: 95.1,
      status: 'Óptimo',
    },
  ]);

  onSelectDept(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedDept.set(target.value);
  }

  onSelectCarrera(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCarrera.set(target.value);
  }

  onSelectCohorte(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCohorte.set(target.value);
  }

  applyFilters(): void {
    this.feedback.set(`Filtros aplicados para ${this.selectedDept()} • ${this.selectedCarrera()} • ${this.selectedCohorte()}.`);
    setTimeout(() => this.feedback.set(''), 3500);
  }

  exportCSV(): void {
    this.feedback.set('Exportando métricas agregadas por asignatura a CSV...');
    setTimeout(() => this.feedback.set(''), 3000);
  }

  generatePDF(): void {
    this.feedback.set('Generando reporte ejecutivo institucional en PDF...');
    setTimeout(() => {
      this.feedback.set('PDF institucional consolidado listo para descarga oficial.');
      setTimeout(() => this.feedback.set(''), 3500);
    }, 1000);
  }
}
