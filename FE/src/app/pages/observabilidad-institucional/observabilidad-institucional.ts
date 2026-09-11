import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

export interface OfficialKpi {
  readonly code: string;
  readonly category: string;
  readonly title: string;
  readonly value: string;
  readonly delta: string;
  readonly details: string;
  readonly badge: string;
  readonly tema: string;
  readonly stars?: string;
}

export interface DriftDimension {
  readonly name: string;
  readonly delta: string;
  readonly deltaType: 'positive' | 'negative';
  readonly scorePercent: number;
}

export interface SecurityIncident {
  readonly id: string;
  readonly title: string;
  readonly timeAgo: string;
  readonly endpointOrContext: string;
  readonly ipOrActor: string;
  readonly actionTaken: string;
  readonly severity: 'critical' | 'warning' | 'info';
}

@Component({
  selector: 'app-observabilidad-institucional',
  imports: [],
  templateUrl: './observabilidad-institucional.html',
  styleUrl: './observabilidad-institucional.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObservabilidadInstitucional {
  readonly isSyncing = signal<boolean>(false);
  readonly syncMessage = signal<string>('');
  readonly selectedPeriod = signal<string>('2026 - 1° Cuatrimestre');
  readonly modalMessage = signal<string>('');

  readonly officialKpis = signal<readonly OfficialKpi[]>([
    {
      code: 'KPI-01',
      category: 'INSTITUCIONAL',
      title: 'CSAT Plataforma Global',
      value: '86.4%',
      stars: '★ 4.6 / 5.0',
      delta: '+2.1%',
      details: 'N=4,812 encuestados • 100% Anónimo',
      badge: 'Target ≥ 80%',
      tema: 'Tema 04 (Teóricos & Encuestas)',
    },
    {
      code: 'KPI-02',
      category: 'CÁTEDRAS',
      title: 'CSAT Cursos & Prácticos',
      value: '82.1%',
      stars: '★ 4.4 / 5.0',
      delta: '+1.4%',
      details: 'PAR-18 OK • Umbral ≥ 5 respuestas por comisión',
      badge: 'Target ≥ 80%',
      tema: 'Tema 04 & Tema 02',
    },
    {
      code: 'KPI-03 / 04',
      category: 'COHORTE FRC',
      title: 'Aprobación vs. Deserción',
      value: '74.8% / 8.4%',
      delta: 'Abandono < 15%',
      details: '74.8% Aprobados • 16.8% Regular • 8.4% Abandono',
      badge: 'N=1,420 Alumnos',
      tema: 'Tema 02 (Matrícula)',
    },
    {
      code: 'KPI-05',
      category: 'EXCELENCIA',
      title: 'Tasa Promoción Directa',
      value: '8.9%',
      delta: 'P90 Benchmark',
      details: '126 Alumnos • Criterio: 0 vidas perdidas + 100% obligatorios',
      badge: 'Target ≥ 8%',
      tema: 'Tema 10 (Progreso & XP)',
    },
  ]);

  readonly driftDimensions = signal<readonly DriftDimension[]>([
    { name: 'Autonomía y Resolución', delta: '+1.8 pts', deltaType: 'positive', scorePercent: 68 },
    { name: 'Claridad de Explicación y Feedback', delta: '+2.9 pts', deltaType: 'positive', scorePercent: 79 },
    { name: 'Progresión Pedagógica Cátedra', delta: '+1.2 pts', deltaType: 'positive', scorePercent: 62 },
    { name: 'Robustez Anti-Jailbreak', delta: '+0.4 pts', deltaType: 'positive', scorePercent: 98 },
    { name: 'Eficiencia de Token / Concisión', delta: '-1.1 pts', deltaType: 'negative', scorePercent: 58 },
  ]);

  readonly securityIncidents = signal<readonly SecurityIncident[]>([
    {
      id: 'SEC-01',
      title: 'Evasión de IA: Prompt Injection detectado',
      timeAgo: 'Hace 18m',
      endpointOrContext: 'Endpoint /evaluar-desafio',
      ipOrActor: 'IP Hasheada 190.210.**.**',
      actionTaken: 'Bloqueo WAF + Flag Académico Preventivo',
      severity: 'warning',
    },
    {
      id: 'SEC-02',
      title: 'Moderación: Lenguaje no institucional',
      timeAgo: 'Hace 1h',
      endpointOrContext: 'Foro Comisión 3K1 - Sist. Distribuidos',
      ipOrActor: 'Mensaje en cuarentena docente',
      actionTaken: 'Aviso pedagógico emitido',
      severity: 'info',
    },
    {
      id: 'SEC-03',
      title: 'Reintentos excesivos en práctico',
      timeAgo: 'Hace 3h',
      endpointOrContext: 'Tema 05 / 07 (>15 envíos en 60s)',
      ipOrActor: 'PAR-08 Throttled',
      actionTaken: 'Limitado preventivamente a 1 req/min',
      severity: 'warning',
    },
  ]);

  triggerKafkaSync(): void {
    this.isSyncing.set(true);
    this.syncMessage.set('Sincronizando telemetría de eventos con clúster Kafka y microservicios...');
    setTimeout(() => {
      this.isSyncing.set(false);
      this.syncMessage.set('Telemetría consolidada al 100%. SLA de frescura < 15 min cumplido.');
      setTimeout(() => this.syncMessage.set(''), 4000);
    }, 1100);
  }

  openPar14Matrix(): void {
    this.modalMessage.set('Matriz de tolerancia PAR-14: Desvío actual +2.4 pts (Dentro del límite institucional de ±5.0 pts).');
    setTimeout(() => this.modalMessage.set(''), 4500);
  }

  viewAuditLogs(): void {
    this.modalMessage.set('Abriendo registro inmutable de 32 reglas perimetrales bajo norma ISO/IEC 27001.');
    setTimeout(() => this.modalMessage.set(''), 4000);
  }
}
